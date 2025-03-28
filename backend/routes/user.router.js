const express = require("express");
const {
  getUsers,
  newUser,
  getUserBy,
  updateUser,
  deleteUser,
  loginUser,
  getTeachers,
  getUserData,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/getAllUsers", getUsers);
router.get("/getTeachers", getTeachers);
router.get("/getUser/:id", getUserBy);
router.get("/getUserData", getUserData);

router.post("/signUp", newUser);
router.put("/editUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.post("/logIn", loginUser);

module.exports = router;
