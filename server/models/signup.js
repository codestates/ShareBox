const con = require("../db/index");

module.exports = {
  post: (callback) => {
    con.query(`SELECT * FROM users`, (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  },
  create: con,
};
