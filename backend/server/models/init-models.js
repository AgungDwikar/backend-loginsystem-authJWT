import Sequelize from 'sequelize'
import config  from "../../config/config";

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    dialect : "postgres",
    pool : {
      max : 5,
      min : 0,
      acquire : 30000,
      idle : 10000
    }
  }
)


const DataTypes = require("sequelize").DataTypes;
const _SequelizeMeta = require("./SequelizeMeta");
const _Users = require("./Users");

function initModels(sequelize) {
  const SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  const Users = _Users(sequelize, DataTypes);


  return {
    SequelizeMeta,
    Users,
  };
}
const models = initModels(sequelize);

export default models;
export {sequelize};
// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
