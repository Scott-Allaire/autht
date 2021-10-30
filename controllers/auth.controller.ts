import express from "express";
import { compare, compareSync, genSaltSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

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
const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  const db = (<any>req).db;
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    return res.status(403).json({
      error: "Not Authorized",
    });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret);
    (<any>req).loggedInUserId = decoded.sub;
    // TODO verify token exists in database
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
  verifyToken,
};
