const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });
const { sequelize } = require('./models');
const authMiddleware = require('./middlewares/auth.middleware');

if (!process.env.API_KEY) {
  console.log('Missing API KEY');
  process.exit(1)
}

const app = express();
app.use(express.json());
app.use(authMiddleware);

app.use("/api/user/", require("./routes/user.router"))
app.use("/api/course/", require("./routes/course.router"))


app.listen(3000, async () => {
  console.log('Server is running on port 3000');
  await sequelize.authenticate();
  console.log("Database connected!");
});