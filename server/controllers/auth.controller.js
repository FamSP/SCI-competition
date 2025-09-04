import db from "../models/index.js";
const User = db.User;
const Role = db.Role;
import bcrypt from "bcryptjs"; //เข้ารหัส password
import config from "../config/auth.config.js";
import jwt from "jsonwebtoken";
//สำหรับใช้ or
import { Op } from "sequelize";

const authController = {};

authController.signUp = async (req, res) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) {
    res.status(400).send({ message: "Pleas provide all required fields" });
    return;
  }
  await User.findOne({ where: { username } })
    // .select(-password)
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "Username are already existed" });
        return;
      }
      const newUser = {
        username,
        name,
        email,
        password: bcrypt.hashSync(password, 8),
      };
      User.create(newUser)
        .then((user) => {
          if (req.body.roles) {
            //SELECT * FROM Role WHERE name=role 1OR name=role2
            Role.findAll({
              where: {
                name: {
                  [Op.or]: req.body.roles,
                },
              },
            }).then((roles) => {
              if (roles?.length === 0) {
                user.setRoles([1]).then(() => {
                  res.send({ message: "User registered succesfully3" });
                });
              }
              user.setRoles(roles).then(() => {
                res.send({ message: "User registered succesfully1" });
              });
            });
          } else {
            user.setRoles([1]).then(() => {
              res.send({ message: "User registered succesfully2" });
            });
          }
        })
        .catch((error) => {
          res.status(500).send({ message: error.message || "Something error" });
        });
    });
};

authController.signIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ message: "Username or Password are missing" });
    return;
  }
  await User.findOne({ where: { username: username } }).then((user) => {
    if (!user) {
      res.status(404).send({ message: "Username not found." });
      return;
    }
    const passworisValid = bcrypt.compareSync(password, user.password);
    if (!passworisValid) {
      res.status(401).send({ message: "invalid Password" });
    }
    //Valid USer
    const token = jwt.sign({ username: user.username }, config.secret, {
      expiresIn: 86400, //60 sec * 60min * 24hr
    });
    const authorities = [];
    user
      .getRoles()
      .then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLES_" + roles[i].name.toUpperCase());
        }
        res.send({
          token: token,
          authorities: authorities,
          userInfo: {
            name: user.name,
            email: user.email,
            username: user.username,
          },
        });
      })

      .catch((error) => {
        res.status(500).send({ message: error.message || "Something error" });
      });
  });
};

export default authController;
