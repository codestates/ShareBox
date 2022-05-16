const db = require('../db')

module.exports = {
    get: (tokenData, callback) => {

        const queryString = `SELECT * FROM posts WHERE userId = ${tokenData.id}`
        // 조인테이블이용해야되나?

        db.query(queryString, (error, result) => {
            callback(error, result)
        })
        db.end();
    }
}