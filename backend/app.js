const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { sequelize } = require("./models");
const authMiddleware = require("./middlewares/auth.middleware");
const cors = require("cors");

if (!process.env.API_KEY) {
  console.log("Missing API KEY");
  process.exit(1);
}

// Или настраиваем CORS для конкретного домена

const app = express();
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use("/api/user/", require("./routes/user.router"));
app.use("/api/course/", require("./routes/course.router"));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, PUT, UPDATE, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
// });

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await sequelize.authenticate();
  console.log("Database connected!");
});
