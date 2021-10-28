import { Sequelize } from "sequelize/types";
import { genSaltSync, hashSync } from "bcrypt";

module.exports = (sequelize: Sequelize, Sequelize: any) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
    },
    {
      tableName: "user",
      hooks: {
        beforeCreate: async (user: any) => {
          if (user.password) {
            const salt = await genSaltSync(10, "a");
            user.password = hashSync(user.password, salt);
          }
        },
        beforeUpdate: async (user: any) => {
          if (user.password) {
            const salt = await genSaltSync(10, "a");
            user.password = hashSync(user.password, salt);
          }
        }
      },
    }
  );

  return User;
};
