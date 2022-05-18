const records = require("../models/records");
const jwt = require("jsonwebtoken");

module.exports = {
  get: (req, res) => {
    records.get((error, result) => {
      if (error) {
        res.status(500).send("Internal Server Error");
      } else {
        const { recordsId } = req.params;
        const record = result.filter((record) => record.id === Number(recordsId));
        const users_commentsTB = `users_comments ON comments.id = users_comments.commentsId`;
        const usersTB = `users ON users_comments.usersId = users.id`;
        const comments = `SELECT commentsId, userId, postsId, content, comments.createdDate, comments.updatedDate FROM comments LEFT JOIN ${users_commentsTB} LEFT JOIN ${usersTB} WHERE comments.postsId = "${recordsId}"`;
        records.comments.query(comments, (error, comments) => {
          if (error) {
            res.status(500).send("Internal Server Error");
          } else {
            if (record.length !== 0) {
              res.status(200).json({
                data: { record: record[0], comments: comments, total: comments.length },
                message: "게시물을 가져왔습니다.",
              });
            } else {
              res.status(404).json({ message: "게시물이 존재하지 않습니다." });
            }
          }
        });
      }
    });
  },
  post: (req, res, next) => {
    const token = req.cookies["accessToken"];
    console.log("asdf");
    const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);
    if (!tokenData) {
      res.status(401).send({ message: "로그인이 되지 않았습니다." });
    } else {
      records.post(req.body, tokenData, (error, result) => {
        if (error) {
          res.status(500).send("Internal Server Error");
        } else {
          res.status(200).json({ message: "게시물 생성되었습니다." });
        }
      });
    }
  },
  put: (req, res) => {
    const token = req.cookies["accessToken"];
    if (!token) {
      res.status(401).send({ message: "로그인이 되지 않았습니다." });
    } else {
      const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);
      // authorization에 값이 있다면 로그인이 되었다는 의미이고, 없다면 로그인이 되지않았다는 의미?
      if (!tokenData) {
        res.status(401).send({ message: "로그인이 되지 않았습니다." });
      } else {
        records.put(req.params, req.body, tokenData, (error, result) => {
          if (error) {
            res.status(500).send("Internal Server Error");
          } else {
            if (result.length === 0) {
              res.status(401).json({ message: "유저가 일치하지 않습니다." });
            } else {
              res.status(200).json({ message: "게시물이 수정 되었습니다." });
            }
          }
        });
      }
    }
  },
  delete: (req, res) => {
    const token = req.cookies["accessToken"];
    if (!token) {
      res.status(401).send({ message: "로그인이 되지 않았습니다." });
    } else {
      const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);
      if (!tokenData) {
        res.status(401).send({ message: "유저가 일치하지 않습니다." });
      } else {
        records.delete(req.params, tokenData, (error, result) => {
          if (error) {
            res.status(500).send("Internal Server Error");
          } else {
            if (result.length === 0) {
              res.status(401).json({ message: "유저가 일치하지 않습니다." });
            } else {
              res.status(200).json({ message: "게시물이 삭제 되었습니다." });
            }
          }
        });
      }
    }
  },
};
