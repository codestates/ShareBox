const main = require("../models/main");

module.exports = {
  get: (req, res) => {
    main.get((error, result) => {
      if (error) {
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).json(result);
      }
    });
  },
};
