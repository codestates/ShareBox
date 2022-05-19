const models = require('../models/users.js');
const jwt = require('jsonwebtoken');

// 페이지네이션 advanced
module.exports = {
    get: (req, res) => {
        const token = req.cookies["accessToken"];
        const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

        models.get(tokenData, (error, result) => {
            if (error) {
                return res.status(500).send({ 'data': null, 'message': '서버에러' });
            } else {
                //db돌고나온값들
                if (result.length === 0) {
                    res.status(404).send({
                        'data': null,
                        'message': '게시글이 존재하지 않습니다.'
                    })
                } else {
                    console.log(result)
                    res.status(200).send({
                        'data': {
                            'record': result,
                            'total': result.length
                        },
                        'message': '내가 쓴 게시물을 불러왔습니다.'
                    })
                }
            }
        })
    }
};
