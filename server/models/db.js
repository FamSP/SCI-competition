import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.DIALECT,
  logging: false,
  // dialectOptions: {
  //   ssl: {
  //     required: true,
  //     rejectUnauthorized: false,
  //   },
  // },
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been etablished successfully");
  } catch (error) {
    console.log("Unable to connect");
  }
};

testConnection();
export default sequelize;
