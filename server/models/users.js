const db = require('../db')

module.exports = {
    get: (tokenData, callback) => {

        //조인테이블로 다시짜기
        // users users_posts posts
        const queryString = `SELECT posts.id, posts.title, posts.image, posts.content, posts.category, posts.complete, posts.country, posts.createdDate, posts. updatedDate FROM posts 
        JOIN users_posts ON posts.id = users_posts.postsId 
        JOIN users ON users.id = users_posts.usersId 
        WHERE users.id = ${tokenData.id}`

        db.query(queryString, (error, result) => {
            callback(error, result)
        })
    }
}

