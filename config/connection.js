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
    DB_NAME="qeq1ctj5rfka7y2h",
    DB_USER="wzf4pi8zumqnhb96",
    DB_PASSWORD="x4xvh2i1rk7dcpvf",
   
    // process.env.DB_NAME,
    // process.env.DB_USER,
    // process.env.DB_PASSWORD,
    {
      host: "jhdjjtqo9w5bzq2t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;