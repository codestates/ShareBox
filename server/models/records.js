const con = require("../db/index");
const users = require("./users");

module.exports = {
  get: (callback) => {
    con.query(`SELECT * FROM posts`, (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  },
  post: (body, callback) => {
    const { title, image, content, category, country, complete } = body;
    con.query(
      `INSERT INTO posts (title, image, content, category, country, complete) VALUES ("${title}","${image}","${content}","${category}","${country}","${complete}")`,
      (err, result) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  put: (params, body, callback) => {
    const { recordsId } = params;
    const { title, image, content, category, country, complete } = body;
    con.query(`SET foreign_key_checks = 0`);
    con.query(
      `UPDATE posts SET title = "${title}", image = "${image}", content = "${content}", category = "${category}", country = "${country}", complete = ${complete} WHERE posts.id = ${recordsId}`,
      (err, result) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, result);
        }
      }
    );
    con.query(`SET foreign_key_checks = 1`);
  },
  delete: (params, callback) => {
    const { recordsId } = params;
    con.query(`SET foreign_key_checks = 0`);
    con.query(`DELETE FROM posts WHERE posts.id = ${recordsId}`, (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
    con.query(`DELETE FROM comments WHERE comments.postsId = ${recordsId}`);
    con.query(`SET foreign_key_checks = 1`);
  },
  comments: con,
  records: con,
};
