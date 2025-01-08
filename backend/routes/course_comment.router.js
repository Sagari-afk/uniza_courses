const express = require("express");
const { newComment } = require("../controllers/courseComments.controller");

const router = express.Router();

router.post("/new", newComment);

module.exports = router;
