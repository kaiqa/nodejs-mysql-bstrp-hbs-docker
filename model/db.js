const mysql = require('mysql');

exports.start = mysql.createConnection({
  host: process.env.HOST,
  port: '6603',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});