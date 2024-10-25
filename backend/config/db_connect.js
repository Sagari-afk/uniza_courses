// const mysql = require("mysql2")
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });
// const { Sequelize } = require('sequelize');

// const sqlDbData = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// }

// const connection = mysql.createConnection(sqlDbData);

// connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE}\`;`, function (err, results) {
//   if (err) throw err;
//   console.log(`Database ${process.env.DATABASE} ensured!`);
// });

// // Connect to database
// const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// // const test_connect = async () => {
// //   try {
// //     await sequelize.authenticate();
// //     console.log('Connection has been established successfully.');
// //   } catch (error) {
// //     console.error('Unable to connect to the database:', error);
// //   }
// // }

// // test_connect();

// module.exports = sequelize
