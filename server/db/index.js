// const mysql = require("mysql");

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "0909",
//   database: "ShareBox",
//   multipleStatements: true, // 다중쿼리
// });

// con.connect((err) => {
//   if (err) throw err;
// });

// module.exports = con;
// -------------------------------------


// 그건 sql파일은 배치모드로 넣어주는걸까?
const mysql = require("mysql");
const dotenv = require("dotenv");
const config = require("../config/config");
dotenv.config();

// console.log(process.env.NODE_ENV)
console.log(config[process.env.NODE_ENV || "development"])
// console.log(config["development"])

const con = mysql.createConnection(
  config[process.env.NODE_ENV || "development"]
);

con.connect((err) => {
  if (err) throw err;
});

module.exports = con;