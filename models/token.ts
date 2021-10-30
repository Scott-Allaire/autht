import { Sequelize } from "sequelize/types";
import { genSaltSync, hashSync } from "bcrypt";

module.exports = (sequelize: Sequelize, Sequelize: any) => {
  const Token = sequelize.define(
    "token",
    {
      token: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      expires: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'token',
      indexes: [
        {
          fields: ["token"],
        },
      ],
    }
  );

  return Token;
};
