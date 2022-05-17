const db = require("../db");

module.exports = {
  post: (recordsId, commentId, comment, tokenData, callback) => {
    // INSERT INTO table_name(field1, field2, ...fieldN)
    // VALUES
    // (value1, value2, ...valueN);

    const queryString = `INSERT INTO comments (postsId, content) VALUES (${recordsId}, "${comment}")`;

    db.query(queryString, (error, result) => {
      callback(error, result);
    });
  },

  patch: (recordsId, commentId, comment, tokenData, callback) => {
    // UPDATE 테이블이름
    // SET 필드이름1 = 데이터값1, 필드이름2 = 데이터값2, ...
    // WHERE 필드이름=데이터값
    const queryString = `UPDATE comments SET content = "${comment}" WHERE id = ${commentId}`;

    db.query(queryString, (error, result) => {
      callback(error, result);
    });
  },

  delete: (recordsId, commentId, comment, tokenData, callback) => {
    // DELETE FROM 테이블이름
    // WHERE 필드이름=데이터값

    db.query(`set foreign_key_checks = 0`);

    const queryString = `DELETE FROM comments WHERE id =${commentId}`;

    db.query(queryString, (error, result) => {
      if (error) {
        console.log(error.message);
      }
      callback(error, result);
    });

    db.query(`set foreign_key_checks = 1`);
  },
};
