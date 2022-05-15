const con = require("../db/index");

module.exports = {
  get: (callback) => {
    con.query(`SELECT * FROM post`, (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  },
};
