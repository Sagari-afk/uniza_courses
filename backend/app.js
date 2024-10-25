const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });

const { sequelize } = require('./models')

const app = express();


async function main() {
  await sequelize.sync({ force: true });
}

main()


app.listen(3000, async () => {
  console.log('Server is running on port 3000');
  await sequelize.authenticate();
  console.log("Database connected!");
});