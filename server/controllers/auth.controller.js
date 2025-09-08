import db from "../models/index.js";
import config from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
//สำหรับใช้ or
import { Op } from "sequelize";
const User = db.User;

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
                user.setRoles([3]).then(() => {
                  res.send({ message: "User registered succesfully3" });
                });
              }
              user.setRoles(roles).then(() => {
                res.send({ message: "User registered succesfully1" });
              });
            });
          } else {
            user.setRoles([3]).then(() => {
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

const signUp = async (req, res) => {
  const { email, password, type, name, school, phone } = req.body;
  try {
    //Check validation
    if (!email || !password || !type || !name) {
      res
        .status(400)
        .send({ message: "email, password, type and name are required !" });
      return;
    }
    //Validdate user Type
    const allowedType = ['admin,"teacher', "judge"];
    if (!allowedType.includes(type)) {
      res.status(400).send({
        message: "invalid user type. Must be admin, teacher or judge",
      });
    }
    //Additionnal varidation
    if ((type === "teacher" && school) || !phone) {
      res
        .status(400)
        .send({ message: "school and phone are required for teacher" });
    }

    // check if user existe
    const existingUser = await User.finOne({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      res.status(400).send({ message: "Email already exist!" });
    }
    const newData = {
      email: email,
      password: password,
      type: type,
      name: name,
    };
    if (type === "teacher") {
      userData.school = school;
      userData.phone = phone;
    }
    const user = await User.create(newData);

    // if user is a teacher , create and send verification email
    if (type === "teacher") {
      try {
        const token = crypto.randomBytes(34).toString("hex");
        const verification = await db.VerificationToken.create({
          token,
          userId: user.id,
          expiresAt: new Data(Date.now() + 24 * 60 * 60 * 1000), // 24hour
        });
        
      } catch (error) {}
    }
    res.status(201).send({
      message:
        user.type === "teacher"
          ? "Registeration successfully! Please check your email to verify your account"
          : "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        ...(user.type === "teacher" && { isVerified: user.isVerified }),
      },
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while creating user!",
    });
  }
};

export default authController;
