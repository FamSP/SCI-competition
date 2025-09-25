import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import db from "../models/index.js";

const User = db.User;
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No Token Provide!" });
  }
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unautherized!" });
    }
    req.username = decoded.username;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.username);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }
    if (user.type === "admin") {
      next();
      return;
    }
    return res
      .status(401)
      .send({ message: "Unatherized you don't have permission" });
  } catch (error) {
    return res.status(500).send({ message: "server error during Admin auth" });
  }
};

const isTeacher = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.username);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }
    if (user.type === "teacher") {
      next();
      return;
    }
    return res
      .status(401)
      .send({ message: "Unatherized you don't have permission" });
  } catch (error) {
    return res.status(500).send({ message: "server error during Admin auth" });
  }
};

const isJudge = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.username);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }
    if (user.type === "judge") {
      next();
      return;
    }
    return res
      .status(401)
      .send({ message: "Unatherized you don't have permission" });
  } catch (error) {
    return res.status(500).send({ message: "server error during Admin auth" });
  }
};

const authjwt = { verifyToken, isAdmin, isTeacher, isJudge };
export default authjwt;

// const isModOrAdmin = (req, res, next) => {
//   console.log("sdfsd" + req.username);
//   console.log(User);
//   User.findByPk(req.username).then((user) => {
//     user.getRoles().then((roles) => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "admin" || roles[i].name === "moderator") {
//           next();
//           return;
//         }
//       }

//       return res
//         .status(401)
//         .send({ message: "Unatherized you don't have permission" });
//     });
//   });
// };
