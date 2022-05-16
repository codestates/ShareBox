const fs = require("fs");
const db = require("../db/index");

const schema = fs.readFileSync("../db/ShareBox.sql").toString();

db.query(
  `DROP DATABASE IF EXISTS ShareBox`
); //실제 서비스에서는 삭제

db.query(
  `CREATE DATABASE ShareBox`
); //실제 서비스에서는 삭제

db.query(`USE ShareBox`);

db.query(schema, (error, result) => {
  if (error) {
    return console.log(error);
  } else {
    return console.log("ok");
  }
});

db.end();