module.exports = {
  get: (req, res) => {
    // TODO: 로그아웃 로직을 작성합니다.
    res.clearCookie('accessToken');
    res.status(200).json({ message: "로그아웃 되었습니다." });
  },
};
