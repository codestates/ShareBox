//login
const models = require('../models/login.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();

module.exports = {

  post: (req, res) => {
    if (!req.body.userId || !req.body.password) {
      return res.status(400).send('아이디 혹은 비밀번호가 일치하지 않습니다.');
    }
    const { userId, password } = req.body

    models.post(userId, password, (error, result) => {
      if (error) {
        return res.status(500).send({ 'data': null, 'message': '서버에러' });
      } else {
        // db돌고나온값
        // result[0]
        // console.log(result)

        if (!result) {
          res.status(401).send({ 'data': null, 'message': '회원가입이 되지 않았습니다.' });
        } else {
          const payload = {
            id: result[0].id,
            userId: result[0].userId,
            email: result[0].email,
            country: result[0].country,
            mobile: result[0].mobile
          }

          const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1d' });
          const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '2d' });

          res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 14 })
          res.status(201).send({ 'data': { 'accessToken': accessToken }, 'message': '로그인 성공했습니다' })
        }
      }
    })
  },

  //refreshToken
  get: (req, res) => {

    const isRefreshToken = req.cookies.refreshToken
    console.log('------------------------', isRefreshToken)
    // 토큰 값이 있는지 확인
    if (!isRefreshToken) {
      res.status(400).send({ 'data': null, 'message': 'refresh token이 없습니다.' });
      // 토큰이 유효한지 확인
    } else {
      const tokenData = jwt.verify(isRefreshToken, process.env.REFRESH_SECRET);
      if (!tokenData) {
        res.status(400).send({ 'data': null, 'message': 'refresh token이 비어있습니다.' })
        // accessToken을 새로 생성해서 보내줘야 한다
      } else {
        const payload = {
          id: tokenData.id,
          userId: tokenData.userId,
          email: tokenData.email,
          createdAt: tokenData.createdAt,
          updatedAt: tokenData.updatedAt
        }
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1d' });


        res.status(200).send({ 'data': { 'accessToken': accessToken, }, 'message': '엑세스토큰이 재발급되었습니다.' })
      }
    }
  }
};
