const records = require("../models/records");

module.exports = {
  get: (req, res) => {
    records.get((err, result) => {
      if (error) {
        res.status(500).send("Internal Server Error");
      } else {
      }
    });
  },
  post: (req, res) => {
    records.psot((err, result) => {
      if (error) {
        res.status(500).send("Internal Server Error");
      } else {
      }
    });
  },
  put: (req, res) => {
    records.put((err, result) => {
      if (error) {
        res.status(500).send("Internal Server Error");
      } else {
      }
    });
  },
  delete: (req, res) => {
    records.delete((err, result) => {
      if (error) {
        res.status(500).send("Internal Server Error");
      } else {
      }
    });
  },
};
