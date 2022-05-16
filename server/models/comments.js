const db = require('../db')

module.exports = {
    get: (recordsId, callback) => {
        const queryString = `SELECT * FROM comments WHERE postId = ${recordsId}`

        db.query(queryString, (error, result) => {
            callback(error, result)
        })
    },

    post: (recordsId, commentId, content, tokenData, callback) => {

        // INSERT INTO table_name(field1, field2, ...fieldN)
        // VALUES
        // (value1, value2, ...valueN);

        // const queryString = `INSERT INTO posts (userId, title, image, content, category, country, complete, createdDate, updatedDate) VALUES (1, "title", "img", "안녕", "축산","강남구", true, now(), now());`
        const queryString = `INSERT INTO comments (postId, userId, content) VALUES (${recordsId}, ${tokenData.id}, "${content}")`

        db.query(queryString, (error, result) => {
            callback(error, result)
        })
    },

    patch: (recordsId, commentId, comment, callback) => {

        // UPDATE 테이블이름
        // SET 필드이름1 = 데이터값1, 필드이름2 = 데이터값2, ...
        // WHERE 필드이름=데이터값
        const queryString = `UPDATE comments SET content = "${comment}" WHERE id = ${commentId}`

        db.query(queryString, (error, result) => {
            callback(error, result)
        })
    },

    delete: (recordsId, commentId, callback) => {

        // DELETE FROM 테이블이름
        // WHERE 필드이름=데이터값
        const queryString = `DELETE FROM comments WHERE id =${commentId}`

        db.query(queryString, (error, result) => {
            callback(error, result)
        })
    }
}