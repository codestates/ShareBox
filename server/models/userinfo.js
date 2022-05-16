const db = require('../db')

module.exports = {
    get: (callback) => {
        //db할 필요없음
    },

    put: (password, country, email, tokenData, callback) => {
        // console.log(tokenData.id)
        //토큰데이터
        //   {
        //     id: userInfo.id,
        //     userId: userInfo.userId,
        //     email: userInfo.email,
        //     country: userInfo.country,
        //     createdDate: userInfo.createdDate,
        //     modifiedDate: userInfo.modifiedDate
        //   }
        const queryString = `UPDATE users SET password = "${password}", country = "${country}", email = "${email}" WHERE userId = "${tokenData.userId}"`

        db.query(queryString, (error, result) => {

            const queryString2 = `SELECT * from users WHERE userId = "${tokenData.userId}"`

            if (error) {
                // console.log(error.message)
            } else {
                return db.query(queryString2, (error, result) => {
                    callback(error, result)
                })
            }
        })
    },

    delete: (tokenData, callback) => {
        const queryString = `DELETE FROM users WHERE id = ${tokenData.id}`

        db.query(queryString, (error, result) => {
            callback(error, result)
        })
        db.end();
    }
}