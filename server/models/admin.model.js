import User from "./user.model";

const Admin = User.init({
  scopes: {
    defaultScope: {
      where: {
        type: "admin",
      },
    },
  },
  hooks: {
    beforeCreate: (admin) => {
      admin.type = "admin"; // กำหนด type เป็น "teacher" ก่อนบันทึก
    },
  },
});

export default Admin;
