const models = require('../models/comments.js');
const jwt = require('jsonwebtoken');

module.exports = {
    //댓글추가
    //쿼리파라미터로 들어온 값을 갖고 그 게시글에 새로운 댓글추가
    post: (req, res) => {
        const recordsId = req.params.recordsId;
        const commentsId = req.params.commentsId;
        const { content } = req.body;

        if (!req.cookies["accessToken"]) {
            res.status(401).send({ 'data': null, 'message': '댓글 작성권한이 없습니다.' })
        } else {

            const token = req.cookies["accessToken"];
            const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

            models.post(recordsId, commentsId, content, tokenData, (error, result) => {
                if (error) {
                    console.log(error)
                    return res.status(500).send({ 'data': null, 'message': '서버에러' });
                } else {
                    res.status(201).send({ 'data': null, 'message': '댓글을 추가했습니다.' })
                }
            })
        }
    },

    //댓글수정
    patch: (req, res) => {
        const recordsId = req.params.recordsId;
        const commentsId = req.params.commentsId;
        const { content } = req.body;

        if (!req.cookies["accessToken"]) {
            res.status(401).send({ 'data': null, 'message': '수정 권한이 없습니다.' })

        } else {

            const token = req.cookies["accessToken"];
            const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);


            models.patch(recordsId, commentsId, content, tokenData, (error, result) => {
                if (error) {
                    return res.status(500).send({ message: '서버에러' });
                } else {
                    if (result.length === 0) {
                        res.status(401).send({ 'data': null, 'message': '수정 권한이 없습니다.' })
                    } else {
                        res.status(201).send({ message: '댓글을 수정했습니다.' })
                    }
                }
            })


        }
    },


    //댓글삭제
    delete: (req, res) => {
        const recordsId = req.params.recordsId;
        const commentsId = req.params.commentsId;
        const { content } = req.body;

        if (!req.cookies["accessToken"]) {
            res.status(401).send({ 'data': null, 'message': '삭제 권한이 없습니다.' })
        } else {

            const token = req.cookies["accessToken"];
            const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);


            models.delete(recordsId, commentsId, content, tokenData, (error, result) => {
                if (error) {
                    return res.status(500).send({ 'data': null, 'message': '서버에러' });
                } else {
                    if (result.length === 0) {
                        res.status(401).send({ 'data': null, 'message': '삭제 권한이 없습니다.' })
                    } else {
                        res.status(201).send({ 'data': null, 'message': '댓글을 삭제했습니다.' })
                    }
                }
            })


        }
    }
};