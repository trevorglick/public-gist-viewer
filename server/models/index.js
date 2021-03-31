const Sequelize = require('sequelize');

import db_settings from "../constants";
import favorited from "./favorited"

const sequelize = new Sequelize(
  db_settings.DB_DATABASE,
  db_settings.DB_USER,
  db_settings.DB_PASSWORD,
  {
    dialect: "postgres",
    host: "localhost"
  }
);

favorited(sequelize, Sequelize.DataTypes);
const models = sequelize.models;

export { sequelize };

export default models;