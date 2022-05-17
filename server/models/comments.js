const db = require('../db')

module.exports = {
    post: (recordsId, commentsId, content, tokenData, callback) => {

        // INSERT INTO table_name(field1, field2, ...fieldN)
        // VALUES
        // (value1, value2, ...valueN);

        const queryString = `INSERT INTO comments (postsId, content) VALUES (${recordsId}, "${content}")`

        db.query(queryString, (error, result) => {
            console.log(result.insertId)
            const queryString2 = `INSERT INTO users_comments (usersId, commentsId) VALUES (${tokenData.id}, ${(result.insertId)})`
            db.query(queryString2, (error, result) => {
                callback(error, result)
            })
        })
    },

    patch: (recordsId, commentsId, content, tokenData, callback) => {

        const check = `SELECT * FROM users_comments WHERE usersId = ${tokenData.id} AND commentsId = ${commentsId}`

        db.query(check, (error, result) => {

            if (result.length === 0) {
                callback(error, result)
            } else {
                const queryString = `UPDATE comments SET content = "${content}" WHERE id = ${commentsId}`

                db.query(queryString, (error, result) => {
                    callback(error, result)
                })
            }
        })

        // UPDATE 테이블이름
        // SET 필드이름1 = 데이터값1, 필드이름2 = 데이터값2, ...
        // WHERE 필드이름=데이터값

    },

    delete: (recordsId, commentsId, content, tokenData, callback) => {

        const check = `SELECT * FROM users_comments WHERE usersId = ${tokenData.id} AND commentsId = ${commentsId}`

        db.query(check, (error, result) => {
            if (result.length === 0) {
                callback(error, result)
            } else {

                db.query(`set foreign_key_checks = 0`)

                const queryString = `DELETE FROM comments WHERE id =${commentsId}`

                db.query(queryString, (error, result) => {
                    if (error) {
                        console.log(error.message)
                    }
                    const queryString2 = `DELETE FROM users_comments WHERE commentsId =${commentsId}`

                    db.query(queryString2, (error, result) => {
                        if (error) {
                            console.log(error.message)
                        }
                        callback(error, result)
                    })
                })


                db.query(`set foreign_key_checks = 1`)
            }

        })

        // DELETE FROM 테이블이름
        // WHERE 필드이름=데이터값


    }
}

