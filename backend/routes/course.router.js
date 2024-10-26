const express = require("express");
const {
  getCourses,
  newCourse,
  getCourseBy,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");

const router = express.Router();

router.get("/getAllCourses", getCourses);
router.get("/getCourse/:id", getCourseBy);

router.post("/newCourse", newCourse);
router.put("/editCourse/:id", updateCourse);
router.delete("/deleteCourse/:id", deleteCourse);

module.exports = router;
