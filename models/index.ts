import { Sequelize } from "sequelize";
import config from '../config';

const databaseUrl = 'mysql://' + 
  config.databaseUsername + ':' + config.databasePassword + 
  '@' + config.databaseHost + ':' + config.databasePort +
  '/' + config.databaseSchema;
const sequelize = new Sequelize(databaseUrl);

const User = require("./user")(sequelize, Sequelize);
const Role = require("./role")(sequelize, Sequelize);
const Token = require("./token")(sequelize, Sequelize);

Role.hasMany(User);
User.belongsTo(Role);
User.hasMany(Token);
Token.belongsTo(User);

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  User: User,
  Role: Role,
  Token: Token
};
