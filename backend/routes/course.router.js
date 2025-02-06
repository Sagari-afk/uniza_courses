const express = require("express");
const {
  getCourses,
  newCourse,
  getCourseBy,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");
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
const upload = multer({ storage: storage });

router.get("/getAllCourses", getCourses);
router.get("/getCourse/:id", getCourseBy);

router.post("/newCourse", upload.single("image"), newCourse);
router.put("/editCourse/:id", updateCourse);
router.delete("/deleteCourse/:id", deleteCourse);

module.exports = router;
