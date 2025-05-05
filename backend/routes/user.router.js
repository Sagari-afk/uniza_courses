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
  uploadProfileImage,
} = require("../controllers/user.controller");
const multer = require("multer");

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/getAllUsers", getUsers);
router.get("/getTeachers", getTeachers);
router.get("/getUser/:id", getUserBy);
router.get("/getUserData", getUserData);

router.post("/signUp", newUser);
router.put("/editUser/:id", updateUser);
router.post("/uploadProfileImage", upload.single("image"), uploadProfileImage);
router.delete("/deleteUser/:id", deleteUser);
router.post("/logIn", loginUser);

module.exports = router;
