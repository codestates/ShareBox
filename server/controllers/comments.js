const models = require('../models/comments.js');
const jwt = require('jsonwebtoken');

module.exports = {
    //댓글보여주기
    get: (req, res) => {
        const recordsId = req.params.recordsId;
        const commentId = req.params.commentId;

        models.get(recordsId, (error, result) => {
            if (error) {
                return res.status(500).send({ 'data': null, 'message': '서버에러' });
            } else {
                res.status(200).send({
                    'data': {
                        'comment': result,
                        'total': result.length
                    },
                    'message': '댓글을 가져왔습니다.'
                })
            }
        })

    },

    //댓글추가
    //쿼리파라미터로 들어온 값을 갖고 그 게시글에 새로운 댓글추가
    post: (req, res) => {
        const recordsId = req.params.recordsId;
        const commentId = req.params.commentId;
        const { comment } = req.body;

        // console.log(recordsId, commentId)
        if (!req.headers.authorization) {
            res.status(401).send({ 'data': null, 'message': '댓글 작성권한이 없습니다.' })
        } else {
            const authorization = req.headers['authorization'];
            const token = authorization.split(' ')[1];
            const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

            models.post(recordsId, commentId, comment, tokenData, (error, result) => {
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
        const commentId = req.params.commentId;
        const { comment } = req.body;

        if (!req.headers.authorization) {
            res.status(401).send({ 'data': null, 'message': '수정 권한이 없습니다.' })
        } else {
            models.patch(recordsId, commentId, comment, (error, result) => {
                if (error) {
                    return res.status(500).send({ 'data': null, 'message': '서버에러' });
                } else {
                    res.status(201).send({ 'data': null, 'message': '댓글을 수정했습니다.' })
                }
            })
        }
    },


    //댓글삭제
    delete: (req, res) => {
        const recordsId = req.params.recordsId;
        const commentId = req.params.commentId;
        const { comment } = req.body;

        if (!req.headers.authorization) {
            res.status(401).send({ 'data': null, 'message': '삭제 권한이 없습니다.' })
        } else {
            models.delete(recordsId, commentId, (error, result) => {
                if (error) {
                    return res.status(500).send({ 'data': null, 'message': '서버에러' });
                } else {
                    res.status(201).send({ 'data': null, 'message': '댓글을 삭제했습니다.' })
                }
            })
        }
    }

};
