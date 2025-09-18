import sequelize from "./db.js";
import Sequelize from "sequelize";

import User from "./user.model.js";
import Activity from "./activity.modle.js";
import VerificationToken from "./verificationToken.model.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;

db.Activity = Activity;

db.VerificationToken = VerificationToken;

//Association
db.VerificationToken.belongsTo(db.User, {
  foreignKey: "userId",
});
//สองอันนี้ทำให้เกิด setroles กับ getroles
db.User.belongsTo(db.VerificationToken, {
  foreignKey: "userId",
});
export default db;
//มันจะทำ relation entity ให้โดยที่ไม่ด้องคิดเอง
