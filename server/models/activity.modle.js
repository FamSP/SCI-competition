import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Activity = sequelize.define("activiti", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  team_size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reg_open: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reg_close: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  contact_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Activity.sync({ force: false })
  .then(() => {
    console.log("Table created or already existe");
  })
  .catch((error) => {
    console.log("Error creating table", error);
  });
export default Activity;
