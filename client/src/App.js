import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Main from "./pages/Main";
import Item from "./pages/Item";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Mypage from "./pages/Mypage";
import Record from "./pages/Records";
import { useCookies } from "react-cookie";

import "./App.css";
//HEADER 2 메인으로 이사감 

export default function App() {
  const [signedIn, setSignedIn] = useState(false); //로그인여부????
  const [accessToken, setAccessToken] = useState(null); //엑세스토큰
  const [userinfo, setUserinfo] = useState(null); //유저정보
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  
  const isLogin = () => {
    console.log(cookies.accessToken)
    if (!cookies.accessToken){
      setSignedIn(false)
    } else { 
      setSignedIn(true)
    }
  }


  const signinHandler = (data) => {
    setSignedIn(true);
    issueAccessToken(data);
  };

  const issueAccessToken = (token) => {
    setAccessToken(token);
  };

// handleLogout 헤더2로 이사 감 

  const handleDropout = () => {
    axios.post("https://localhost:4000/dropout").then((res) => {
      setUserinfo(null);
      setSignedIn(false);
      navigate("/");
    });
  };

  useEffect(() => {
    isLogin()
  },[])

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/records/:id" element={<Item
      accessToken={accessToken}
      signedIn={signedIn}
      // handleLogout={handleLogout}
      />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/record" element={<Record />} />
      
      {/*  마이페이지 작동 안함, header2로 이사갔음 

      <Route path="/mypage" element={<Mypage
        userinfo={userinfo}
        accessToken={accessToken}
        issueAccessToken={issueAccessToken}
        handleDropout={handleDropout}
      />} /> */} 
      <Route
        path="/signin"
        element={signedIn ? <Navigate replace to="/" /> : <Signin signinHandler={signinHandler} />}
      />
      <Route
        path="/mypage"
        element={
          signedIn ? (
            <Mypage
              accessToken={accessToken}
              issueAccessToken={issueAccessToken}
              userinfo={userinfo}
              handleDropout={handleDropout}
            />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />
    </Routes>
  );
}
