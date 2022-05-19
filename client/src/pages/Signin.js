import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header1 from "../components/Header1";
import { useCookies } from "react-cookie";

axios.defaults.withCredentials = true;

export default function Signin({ signinHandler }) {
  const GITHUB_LOGIN_URL =
    "https://github.com/login/oauth/authorize?client_id=5a0ba47d6cec26f64fda";
  const handleOauth = () => {
    window.location.assign(GITHUB_LOGIN_URL);
  };

  //쿠키에 저장된 엑세스 토큰
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  //로그인하기 위해 적어놓을 아이디 비번
  const [signinInfo, setSigninInfo] = useState({
    userId: "",
    password: "",
  });
  //에러메시지
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputValue = (key) => (e) => {
    setSigninInfo({ ...signinInfo, [key]: e.target.value });
  };

  const handleSignin = () => {
    const { userId, password } = signinInfo;

    axios.post('http://localhost:4000/login',
      { userId, password },
      {
        headers: { "Content-Type": `application/json` }
      })
      .then(res => {
        signinHandler() //로그인여부 setSignedIn을 true로 바꿔줌
      })
      .catch(error => {
        setErrorMessage("ID와 비밀번호를 입력하세요");
        console.log(error)
      });

  };

  return (
    <div className="background">
      <Header1 />
      <form className="signinContainer" onSubmit={(e) => e.preventDefault()}>
        <h1>로그인</h1>
        <div className="signin-top">
          <div className="inputFields">
            <div className="inputField">
              <input type="text" onChange={handleInputValue("userId")} placeholder="ID" />
            </div>
            <div className="inputField">
              <input
                type="password"
                onChange={handleInputValue("password")}
                placeholder="비밀번호"
              />
            </div>
          </div>
          <button className="btn btn-signin" type="submit" onClick={handleSignin}>
            로그인
          </button>
        </div>
        <div>
          <button className="btn btn-oauth" onClick={handleOauth}>
            GitHub ID로 가입/로그인
          </button>
          <Link to="/signup">
            <button className="btn btn-signup">
              회원가입
            </button>
          </Link>
        </div>
        <div className="alert-box">{errorMessage}</div>
      </form>
    </div>
  );
}
