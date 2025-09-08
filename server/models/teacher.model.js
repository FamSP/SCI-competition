import { DataTypes } from "sequelize";
import User from "./user.model";

const Teacher = User.init(
  {
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    scopes: {
      defaultScope: {
        where: {
          type: "teacher",
        },
      },
    },
    hooks: {
      beforeCreate: (teacher) => {
        teacher.type = "teacher"; // กำหนด type เป็น "teacher" ก่อนบันทึก
      },
    },
  }
);

export default Teacher;
