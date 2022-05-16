const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    host: "localhost",
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "ShareBox",
    multipleStatements: true,
  },
};

module.exports = config;