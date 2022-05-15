const main = require("../models/main");

module.exports = {
  get: (req, res) => {
    main.get((error, result) => {
      if (error) {
        res.status(500).send("Internal Server Error");
      } else {
        res
          .status(200)
          .json({ data: result, total: result.length, message: "페이지 게시물들을 가져왔습니다." });
      }
    });
  },
};
