import User from "./user.model";

const Judge = User.init({
  scopes: {
    defaultScope: {
      where: {
        type: "judge",
      },
    },
  },
  hooks: {
    beforeCreate: (judge) => {
      judge.type = "judge"; // กำหนด type เป็น "teacher" ก่อนบันทึก
    },
  },
});

export default Judge;
