const search = require("../models/search");

module.exports = {
  get: (req, res) => {
    search.get((error, result) => {
      if (error) {
        res.status(500).send("Internal Server Error");
      } else {
        const { title } = req.query;
        const reg = new RegExp(`${title}`);
        const post = result.filter((post) => reg.test(post.title));
        if (post.length !== 0) {
          res
            .status(200)
            .json({ data: post, total: post.length, message: "페이지 게시물들을 가져왔습니다." });
        } else {
          res.status(400).json({ messgae: "검색 결과 게시물이 존재하지 않습니다." });
        }
      }
    });
  },
};
