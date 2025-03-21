const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { sequelize } = require("./models");
const authMiddleware = require("./middlewares/auth.middleware");
const cors = require("cors");
const multer = require("multer");
multer({ dest: "uploads/" });
const fs = require("fs");

if (!process.env.API_KEY) {
  console.log("Missing API KEY");
  process.exit(1);
}
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};
ensureDir(path.join(__dirname, "uploads"));
ensureDir(path.join(__dirname, "saved"));

const app = express();
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use("/api/user/", require("./routes/user.router"));
app.use("/api/userProgress/", require("./routes/userProgress.router"));
app.use("/api/course/", require("./routes/course.router"));
app.use("/api/courseStructure/", require("./routes/courseStructure.router"));
app.use("/api/comment/", require("./routes/course_comment.router"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await sequelize.authenticate();
  console.log("Database connected!");
});
