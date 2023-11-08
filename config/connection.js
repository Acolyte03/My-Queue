const Sequelize = require('sequelize');
require('dotenv').config();
// require('dotenv').config({ path:'../.env'})
// console.log(require("dotenv").config());
// const path = require('path');
// require('dotenv').config({
//   path: path.resolve('config.env'),
// });
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
   
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;