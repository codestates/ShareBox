import React, { useState } from "react";
import { Route, Routes, useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Main from "./pages/Main";
import Item from "./pages/Item";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Mypage from "./pages/Mypage";
import Record from "./pages/Records";

import "./App.css";

export default function App() {
  const [signedIn, setSignedIn] = useState(false); //로그인여부????
  const [accessToken, setAccessToken] = useState(null); //엑세스토큰
  const [userinfo, setUserinfo] = useState(null); //유저정보
  const navigate = useNavigate();
  
  const signinHandler = (data) => {
    setSignedIn(true);
    issueAccessToken(data);
  };

  const issueAccessToken = (token) => {
    setAccessToken(token);
  };
  const handleLogout = () => {
    axios.post("http://localhost:4000/logout").then((res) => {
      console.log(res);
      setUserinfo(null);
      setSignedIn(false);
      navigate("/");
    });
  };

  const handleDropout = () => {
    axios.post("https://localhost:4000/dropout").then((res) => {
      setUserinfo(null);
      setSignedIn(false);
      navigate("/");
    });
  };
  console.log(accessToken);
  return (
    <Routes>
      <Route path="/" element={<Main handleLogout={handleLogout} />} />
      <Route path="/records/:id" element={<Item
      accessToken={accessToken}
      signedIn={signedIn}
      handleLogout={handleLogout}
      />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/record" element={<Record handleLogout={handleLogout} />} />
      {/* <Route path="/mypage" element={<Mypage
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
              handleLogout={handleLogout}
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
