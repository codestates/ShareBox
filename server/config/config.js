const dotenv = require("dotenv");
dotenv.config();

const config = {

    development: {
        host: "localhost",
        user: "root",
        password: process.env.DATABASE_PASSWORD,
        database: "ShareBox",
        multipleStatements: true, // 다중쿼리
    },
};

module.exports = config;