import express from "express";
import { compare, compareSync, genSaltSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import userCtrl from './user.controller';
import _ from "lodash";

// log a user in with username and password
const login = async (req: express.Request, res: express.Response) => {
  const db = (<any>req).db;

  const user = await db.User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (!user || !compareSync(req.body.password, user.password)) {
    return res.status(401).json({
      error: "Username/password not found",
    });
  }

  const token = jwt.sign(
    {
      username: user.username,
    },
    config.jwtSecret,
    {
      subject: `${user.id}`,
      expiresIn: config.jwtExpSecs,
    }
  );

  const expires = new Date(
    new Date().getTime() + <number>config.jwtExpSecs * 1000
  );

  await db.Token.create({
    token: token,
    expires: expires,
    userId: user.id,
  });

  res.json({
    userId: user.id,
    token: token,
  });
};

// check to see if a token is valid
const validateToken = async(token: string, db: any): Promise<any> => {
  const decoded = jwt.verify(token, config.jwtSecret);
  // TODO verify token exists in database
  const foundToken = await db.Token.findOne({
    where: {
      token: token
    },
    include: db.User
  });

  if (!foundToken) {
    throw new Error('Token not found: ' + token);
  }

  return foundToken.user; 
}

// restrict a route to users with admin role
const hasAdminRole = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  const db = (<any>req).db;
  const user = (<any>req).loggedInUser;
  const role = await db.Role.findByPk(user.roleId);
 
  if (!user || role.name !== 'ADMIN') {
    return res.status(403).json({
      error: "Not Authorized",
    });
  }

  next();
}

// check to see a valid Bearer token is present
const authorize = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  const db = (<any>req).db;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      error: "Not Authorized",
    });
  }

  try {
    const user = await validateToken(authHeader.split(' ')[1], db);
    (<any>req).loggedInUser = user;
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      error: "Not Authorized",
    });
  }

  next();
};

export default {
  login,
  authorize,
  validateToken,
  hasAdminRole
};
