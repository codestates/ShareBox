const con = require("../db/index");

module.exports = {
  get: (callback) => {
    const users_postsTB = `users_posts ON posts.id = users_posts.postsId`;
    const users = `users ON users_posts.usersId = users.id`;
    con.query(
      `SELECT posts.id, userId, title, image, content, category, posts.country, complete, posts.createdDate, posts.updatedDate FROM posts LEFT JOIN ${users_postsTB} LEFT JOIN ${users}`,
      (err, result) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  post: (body, tokenData, callback) => {
    const { title, image, content, category, country, complete } = body;
    con.query(
      `INSERT INTO posts (title, image, content, category, country, complete) VALUES ("${title}","${image}","${content}","${category}","${country}",0)`,
      (err, result) => {
        if (err) {
          return callback(err);
        } else {
          const postsId = result.insertId;
          con.query(
            `INSERT INTO users_posts (usersId, postsId) VALUES (${tokenData.id}, ${postsId})`
          );
          return callback(null, result);
        }
      }
    );
  },
  put: (params, body, file, tokenData, callback) => {
    const { recordsId } = params;
    const { title, content, category, country, complete } = body;
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = file;
    const newPath = path.split("/").slice(1).join("/");
    const a = con.query(
      `SELECT * FROM users_posts WHERE users_posts.usersId = ${tokenData.id} AND users_posts.usersId = ${recordsId}`,
      (err, result) => {
        if (err) {
          return callback(err);
        } else {
          if (result.length === 0) {
            return callback(null, result);
          } else {
            con.query(`SET foreign_key_checks = 0`);
            con.query(
              `UPDATE posts SET title = "${title}", image = "http://ec2-3-34-122-9.ap-northeast-2.compute.amazonaws.com/${newPath}", content = "${content}", category = "${category}", country = "${country}", complete = ${complete} WHERE posts.id = ${recordsId}`,
              (err, result) => {
                if (err) {
                  return callback(err);
                } else {
                  return callback(null, result);
                }
              }
            );
            con.query(`SET foreign_key_checks = 1`);
          }
        }
      }
    );
  },
  delete: (params, tokenData, callback) => {
    const { recordsId } = params;
    const a = con.query(
      `SELECT * FROM users_posts WHERE users_posts.usersId = ${tokenData.id} AND users_posts.usersId = ${recordsId}`,
      (err, result) => {
        if (err) {
          return callback(err);
        } else {
          if (result.length === 0) {
            return callback(null, result);
          } else {
            con.query(`SET foreign_key_checks = 0`);
            con.query(`DELETE FROM posts WHERE posts.id = ${recordsId}`, (err, result) => {
              if (err) {
                return callback(err);
              } else {
                return callback(null, result);
              }
            });
            con.query(
              `DELETE FROM users_posts WHERE usersId = ${tokenData.id} AND postsId = ${recordsId}`
            );
            con.query(`SELECT * FROM comments WHERE postsId = ${recordsId}`, (err, comments) => {
              comments.forEach((comment) => {
                con.query(`SET foreign_key_checks = 0`);
                con.query(`DELETE FROM users_comments WHERE id = ${comment.id}`);
                con.query(`SET foreign_key_checks = 1`);
              });
            });
            con.query(`DELETE FROM comments WHERE postsId = ${recordsId}`);

            con.query(`SET foreign_key_checks = 1`);
          }
        }
      }
    );
  },
  comments: con,
  records: con,
};
