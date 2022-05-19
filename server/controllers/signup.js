const signup = require("../models/signup");

module.exports = {
  post: (req, res) => {
    signup.post((error, result) => {
      if (error) {
        res.status(500).send("Internal Server Error");
      } else {
        const { userId, email, password, country, mobile } = req.body;
        const created = result.filter((user) => user.userId === userId);
        if (created.length === 0) {
          const createUser = `INSERT INTO users (userId, email, password, country, mobile) VALUES ("${userId}", "${email}", "${password}", "${country}", "${mobile}")`;
          signup.create.query(createUser);
          res.cookie("set-cookie", "jwt");
          res.status(201).send({ message: "ok" });
        } else {
          res.status(409).send({ message: "중복된 아이디가 존재합니다." });
        }
      }
    });
  },
};
