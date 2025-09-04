import sequelize from "./db.js";
import Sequelize from "sequelize";

import User from "./user.model.js";
import Role from "./role.model.js";
import Activity from "./activity.modle.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Role = Role;

//Association
db.User.belongsToMany(db.Role, {
  through: "user_roles",
});
//สองอันนี้ทำให้เกิด setroles กับ getroles
db.Role.belongsToMany(db.User, {
  through: "user_roles",
});
export default db;
//มันจะทำ relation entity ให้โดยที่ไม่ด้องคิดเอง
