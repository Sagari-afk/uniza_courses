const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });

const sequelize = require('./config/session')

const app = express();
console.log(process.env.DB_USER);



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});