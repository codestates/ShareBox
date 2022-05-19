const db = require('../db')

module.exports = {
    get: (callback) => {
        //db할 필요없음
    },

    put: (password, mobile, email, country, tokenData, callback) => {
        const queryString = `UPDATE users SET password = "${password}", mobile = "${mobile}", email = "${email}", country = "${country}" WHERE id = ${tokenData.id}`

        db.query(queryString, (error, result) => {
            callback(error, result)
        })
    },

    delete: (tokenData, callback) => {
        db.query(`SET foreign_key_checks = 0`);

        const queryString = `DELETE FROM users WHERE id = ${tokenData.id}`;
        db.query(queryString, (error, result) => {
            callback(error, result)
            db.query(`SET foreign_key_checks = 1`);
        });

    }
}

