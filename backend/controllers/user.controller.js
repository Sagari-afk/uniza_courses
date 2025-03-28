const { sequelize, User, Teacher, Student } = require("../models");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const getUsers = async (req, res) => {
  try {
    const records = await User.findAll();
    return res.status(200).json({ records });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const getUserBy = async (req, res) => {
  try {
    const records = await User.findByPk(req.params.id, {
      include: "UserType",
    });

    return res.status(200).json(records);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const getTeachers = async (req, res) => {
  try {
    const records = await Teacher.findAll({
      attributes: ["id", "institute", "office", "phone"],
      through: { attributes: [] },
      include: [
        {
          model: User,
          attributes: ["firstName", "secondName", "email", "profile_img_url"],
          as: "user",
          required: false,
        },
      ],
    });
    return res.status(200).json({ records });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const newUser = [
  body("firstName").not().isEmpty(),
  body("secondName").not().isEmpty(),
  body("personalNum")
    .optional({ checkFalsy: true })
    .isLength({ min: 6, max: 6 })
    .withMessage("Personal number must be 6 characters long, numbers only"),
  body("email").not().isEmpty().isEmail(),
  body("password")
    .not()
    .isEmpty()
    .isStrongPassword()
    .withMessage(
      "Password must be strong (at least 8 characters, one lowercase, one uppercase, one number, one symbol)"
    ),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errMessage = errors
        .array()
        .map((item) => `${item.path} - ${item.msg}`)
        .join(",");
      return res.status(400).json(errMessage);
    }

    const {
      firstName,
      secondName,
      email,
      userType,
      password,
      profile_img_url,
    } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res
        .status(500)
        .json("The user with this email already exists", 400);
    }

    try {
      const user = await User.create({
        firstName,
        secondName,
        email,
        password,
        role: userType ? "student" : "teacher",
        salt: "",
        profile_img_url,
      });

      if (!userType) {
        await Teacher.create({
          userId: user.id,
          institute: req.body.institute,
          office: req.body.office,
          phone: req.body.phone,
        });
      } else if (userType) {
        await Student.create({
          userId: user.id,
          personalNum: req.body.personalNum,
        });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          userFirstName: user.firstName,
          userSecondName: user.secondName,
          email: user.email,
          userRole: user.role,
          userImg: user.profile_img_url,
        },
        process.env.API_KEY
      );
      return res.send({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
];

const loginUser = [
  body("email").not().isEmpty().isEmail(),
  body("password").not().isEmpty(),

  async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ where: { email: email } });
      if (!existingUser) {
        return res.status(500).json("Invalid email", 400);
      }
      if (!User.checkPassword(existingUser, password)) {
        return res.status(500).json("Invalid password", 400);
      }

      const token = jwt.sign(
        {
          userId: existingUser.id,
          userFirstName: existingUser.firstName,
          userSecondName: existingUser.secondName,
          email: existingUser.email,
          userRole: existingUser.role,
          userImg: existingUser.profile_img_url,
        },
        process.env.API_KEY
      );
      res.send({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  },
];

const updateUser = async (req, res) => {
  try {
    let data = req.body;
    const existingUser = await User.findByPk(req.params.id);
    if (!existingUser)
      return res.status(400).json("User s takym id neexistuje!");
    for (const [key, value] of Object.entries(data)) {
      await User.update(
        { [key]: value },
        {
          where: {
            id: req.params.id,
          },
        }
      );
    }
    return res.status(200).json("Success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const existingUser = await User.findByPk(req.params.id);
    if (!existingUser)
      return res.status(400).json("User s takym id neexistuje!");
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json("Success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const getUserData = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }
  try {
    jwt.verify(token, process.env.API_KEY, (err, userData) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      console.log("User Data: ", userData);
      return res.status(299).json({ user: userData });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getUsers,
  getUserBy,
  newUser,
  updateUser,
  deleteUser,
  loginUser,
  getTeachers,
  getUserData,
};
