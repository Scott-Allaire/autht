import { Sequelize } from "sequelize";
import config from '../config';

const databaseUrl = 'mysql://' + 
  config.databaseUsername + ':' + config.databasePassword + 
  '@' + config.databaseHost + ':' + config.databasePort +
  '/' + config.databaseSchema;
const sequelize = new Sequelize(databaseUrl);
const User = require("./user")(sequelize, Sequelize);

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  User: User,
};
