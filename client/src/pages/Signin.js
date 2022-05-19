import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header1 from "../components/Header1";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import Subheading from '../components/Subheading';

axios.defaults.withCredentials = true;

const Input = styled.input`
  display: inline-block;
  height: 6vh;
  width: 16vw;
  text-align: center ;
  background-color: rgb(228 140 113);
  border-radius: 3vh;
  margin: 1vh;
  font-size: 2vh;
  color: white;
  box-shadow: 3px 4px 0px 0px #8a2a21;
  &::placeholder{
    color: white;
  }
`;

const LoginButton = styled.button`
  width: 8vw;
  height: 4vh;

  box-shadow:inset 0px 1px 0px 0px #f9eca0;
  background:linear-gradient(to bottom, #f9eca0 5%, #f2ab1e 100%);
  border-radius:1vw;
  cursor:pointer;
  color:#c92200;
  font-size: 1.5vh;
  font-weight:bold;
  text-decoration: none;
  
  &:active {
  position:relative;
  top:1px;
  }
`
const SignupButton = styled(LoginButton)`
  margin-right: 0vh;
`

const OauthButton = styled(LoginButton)`
  width: 17vw;
`

const Caution = styled.div`
  color: red;
  border-color: #f5c6cb;
  position: relative;
  padding: 0.75rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
`

export default function Signin({ accessToken, signinHandler }) {
  const GITHUB_LOGIN_URL =
    "https://github.com/login/oauth/authorize?client_id=5a0ba47d6cec26f64fda";
  const handleOauth = () => {
    window.location.assign(GITHUB_LOGIN_URL);
  };

  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const [signinInfo, setSigninInfo] = useState({
    userId: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputValue = (key) => (e) => {
    setSigninInfo({ ...signinInfo, [key]: e.target.value });
  };

  const handleSignin = () => {
    const { userId, password } = signinInfo;

    if (userId === "" || password === "") {
      setErrorMessage("ID와 비밀번호를 입력하세요");
    } else {

      axios.post('http://localhost:4000/login',
        { userId, password },
        {
          headers: { "Content-Type": `application/json` }
        })
        .then(res => {
          // console.log(res)
          // console.log(cookies)
        })
        .catch(error => {
          console.log(error)
        });
    }
  };

  return (
    <div className="background">
      <Header1 />
      <form className="signinContainer" onSubmit={(e) => e.preventDefault()}>
      <Subheading body="로그인" />
        <div className="signin-top">
          <div className="inputFields">
            <div className="inputField">
              <Input type="text" onChange={handleInputValue("userId")} placeholder="ID" />
            </div>
            <div className="inputField">
              <Input
                type="password"
                onChange={handleInputValue("password")}
                placeholder="비밀번호"
              />
            </div>
          </div>
        </div>
        <Caution className="alert-box">{errorMessage}</Caution>
        <div>
          <LoginButton className="btn btn-signin" type="submit" onClick={handleSignin}>
            로그인
          </LoginButton>
          <span> </span>
          <SignupButton className="btn btn-signup">
            <Link to="/signup">회원가입</Link>
          </SignupButton>
        </div>
        <div>
          <OauthButton className="btn btn-oauth" onClick={handleOauth}>
            GitHub ID로 가입/로그인
          </OauthButton>
        </div>
     
      </form>
    </div>
  );
}
