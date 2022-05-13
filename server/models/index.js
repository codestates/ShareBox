const fs = require("fs");
const db = require("../db/index");

const schema = fs.readFileSync("./db/ShareBox.sql").toString();

db.query(
  `DROP DATABASE IF EXISTS ${process.env.DATABASE_NAME}`
); /*<=실제 서비스에서는 삭제*/
db.query(
  `CREATE DATABASE ${process.env.DATABASE_NAME}`
); /*<=실제 서비스에서는 삭제*/
db.query(`USE ${process.env.DATABASE_NAME}`);
db.query(schema, (error, result) => {
  if (error) {
    return console.log(error);
  } else {
    return console.log(null, result);
  }
});
