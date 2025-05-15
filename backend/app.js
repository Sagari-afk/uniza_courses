const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { sequelize } = require("./models");
const authMiddleware = require("./middlewares/auth.middleware");
const cors = require("cors");
const fs = require("fs");

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};
ensureDir(path.join(__dirname, "uploads"));
ensureDir(path.join(__dirname, "saved"));

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "500mb",
  })
);
app.use(
  express.urlencoded({
    limit: "500mb",
    extended: true,
  })
);

app.use(authMiddleware);

// my routes
app.use("/api/user/", require("./routes/user.router"));
app.use("/api/userProgress/", require("./routes/userProgress.router"));
app.use("/api/course/", require("./routes/course.router"));
app.use("/api/courseStructure/", require("./routes/courseStructure.router"));
app.use("/api/question/", require("./routes/question.router"));
app.use("/api/comment/", require("./routes/courseComment.router"));

// static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await sequelize.authenticate();
  console.log("Database connected!");
});
