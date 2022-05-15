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
  post: (callback) => {
    con.query(`INSERT INTO post () VALUES ()`, (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  },
  put: (callback) => {
    con.query(
      `UPDATE post SET [COL_NAME1] = [VALUE1], ...... WHERE [CONDITION];`,
      (err, result) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  delete: (callback) => {
    con.query(`DELETE FROM post WHERE [CONDITION];`, (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  },
};
