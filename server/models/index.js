import sequelize from "./db.js";
import Sequelize from "sequelize";

import User from "./user.model.js";
import Role from "./role.model.js";
import Activity from "./activity.modle.js";
import Judge from "./judge.model.js";
import Admin from "./admin.model.js";
import VerificationToken from "./verificationToken.model.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Role = Role;
db.Activity = Activity;
db.Judge = Judge;
db.Admin = Admin;
db.VerificationToken = VerificationToken;

//Association
db.VerificationToken.belongsTo(db.User, {
  foreigKey: "userId",
});
//สองอันนี้ทำให้เกิด setroles กับ getroles
db.User.belongsTo(db.VerificationToken, {
  foreigKey: "userId",
});
export default db;
//มันจะทำ relation entity ให้โดยที่ไม่ด้องคิดเอง
