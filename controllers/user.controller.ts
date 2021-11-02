import express from "express";
import _ from "lodash";

const model = {
  id: null,
  username: null,
  updatedAt: null,
  createdAt: null,
};

// get paginated list of users
const list = async (req: express.Request, res: express.Response) => {
  const db = (<any>req).db;

  const pageNumber = +(req.query.page || 0);
  const pageSize = +(req.query.pageSize || 20);

  const page = await db.User.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageNumber,
    order: ['username']
  });
  const users = _.map(page.rows, (user) => _.pick(user, _.keys(model)));
  res.json({
    total: page.count,
    pageSize: +pageSize,
    pageNumber: +pageNumber,
    values: users,
  });
};

// create a new user
const create = async (req: express.Request, res: express.Response) => {
  const db = (<any>req).db;
  const user = await db.User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.json(_.pick(user, _.keys(model)));
};

// update a user
const update = async (req: express.Request, res: express.Response) => {
  const db = (<any>req).db;
  const userId = (<any>req).user.id;
  const result: Array<number> = await db.User.update(
    {
      username: req.body.username,
      password: req.body.password,
    },
    {
      where: { id: userId },
    }
  );
  res.json({ updated: result[0] });
};

// delete a user
const remove = async (req: express.Request, res: express.Response) => {
  const db = (<any>req).db;
  const result: number = await db.User.destroy({
    where: { id: (<any>req).user.id },
  });
  res.json({ deleted: result });
};

// get a single user 
const read = (req: express.Request, res: express.Response) => {
  console.log()
  res.send((<any>req).user);
};

// get a user from the DB by Id
const getUserById = async (
  req: express.Request,
  res: express.Response,
  next: any,
  id: number
) => {
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
  model,
  create,
  list,
  read,
  update,
  remove,
  getUserById,
};
