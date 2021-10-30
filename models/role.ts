import { Sequelize } from "sequelize/types";
import { genSaltSync, hashSync } from "bcrypt";

module.exports = (sequelize: Sequelize, Sequelize: any) => {
  const Role = sequelize.define(
    "role",
    {
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      }
    },
    {
      tableName: "role"
    }
  );

  return Role;
};
