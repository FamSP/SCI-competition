const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getLocalAccessToken = () => {
  const user = getUser();
  //เอามาแค่ token จากที่getมา
  return user?.token;
  // "?" ถ้าใช้ตัวนี้คือถ้าเป็น undifind ก็จะไม่แสดงออกมาก
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const TokenService = {
  getLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};
export default TokenService;
