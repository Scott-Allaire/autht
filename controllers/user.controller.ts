import express from "express";
import _ from "lodash";

const model = {
  id: null,
  username: null,
  updatedAt: null,
  createdAt: null,
};

const list = async (req: express.Request, res: express.Response) => {
  const db = (<any>req).db;
  const users = await db.User.findAll();
  res.json(_.map(users, (user) => _.pick(user, _.keys(model))));
};

const create = async (req: express.Request, res: express.Response) => {
  const db = (<any>req).db;
  const user = await db.User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.json(_.pick(user, _.keys(model)));
};

const update = async (req: express.Request, res: express.Response) => {
  const db = (<any>req).db;
  const result: Array<number> = await db.User.update(
    {
      username: req.body.username,
      password: req.body.password,
    },
    {
      where: { id: (<any>req).user.id },
    }
  );
  res.json({ updated: result[0] });
};

const remove = async (req: express.Request, res: express.Response) => {
  const db = (<any>req).db;
  const result: number = await db.User.destroy(
    {
      where: { id: (<any>req).user.id },
    }
  );
  res.json({ deleted: result });
};

const read = (req: express.Request, res: express.Response) => {
  res.send((<any>req).user);
};

const getUserById = async (req: express.Request, res: express.Response, next: any, id: number) => {
  const db = (<any>req).db;
  const user = await db.User.findByPk(id);

  if (user) {
    (<any>req).user = _.pick(user, _.keys(model));
  } else {
    return res.status(404).json({
      error: "User not found",
    });
  }

  next();
};

export default {
  create,
  list,
  read,
  update,
  remove,
  getUserById,
};
