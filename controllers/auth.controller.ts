import express from "express";
import { compare, compareSync, genSaltSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import config from '../config';

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

  res.json({
    userId: user.id,
    token: token,
  });
};

export default {
  login
};
