const models = require('../models/userinfo.js')
const jwt = require('jsonwebtoken');


module.exports = {

  //회원정보불러오기
  get: (req, res) => {
    if (!req.headers.authorization) {
      res.status(404).send({ "data": null, "message": "로그인을 하세요." })
    } else {

      const authorization = req.headers['authorization'];
      const token = authorization.split(' ')[1];
      const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

      if (!tokenData) {
        res.status(400).send({ "data": null, "message": "회원 정보가 없습니다." })
      } else {
        // console.log(tokenData)
        res.status(200).send({
          data: {
            userInfo: {
              id: tokenData.id,
              userId: tokenData.userId,
              email: tokenData.email,
              country: tokenData.country,
              mobile: tokenData.mobile
            }
          }, message: '유저 정보를 불러왔습니다.'
        })
      }
    }
  },


  //회원정보수정
  //회원정보수정하면 먼저 토큰까서 
  //그 회원의 db에 접근해서
  //update하고
  //다시 토큰발급해준다.

  put: (req, res) => {
    const { password, mobile, email, country } = req.body; //지역빠져있음

    if (!password || !mobile || !email || !country) {
      return res.status(400).send({ message: '입력값이 잘못 되었습니다.' });
    }

    const authorization = req.headers['authorization'];
    const token = authorization.split(' ')[1];
    const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

    models.put(password, mobile, email, country, tokenData, (error, result) => {
      if (error) {
        return res.status(500).send({ message: '서버에러' });
      } else {
        console.log(result)
        const payload = {
          id: tokenData.id,
          userId: tokenData.userId,
          country: country,
          email: email,
          mobile: mobile
        }

        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1d' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '2d' });

        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 14 })
        res.status(201).send({ data: { 'accessToken': accessToken }, message: '회원 정보가 수정되었습니다.' })

      }
    })
  },


  //회원탈퇴
  //회원정보수정하면 먼저 토큰까서 
  //그 회원의 db에 접근해서
  //delete하고
  //응답으로는 메시지 회원 탈퇴 처리 되었습니다.
  delete: (req, res) => {
    const authorization = req.headers['authorization'];
    const token = authorization.split(' ')[1];
    const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

    models.delete(tokenData, (error, result) => {
      if (error) {
        res.status(500).send({ message: '서버에러' });
      } else {
        res.status(200).send({ message: "회원탈퇴 처리되었습니다." });
      }
    })
  }
};