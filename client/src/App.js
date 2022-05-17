import React, { useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Main from "./pages/Main";
import Item from "./pages/Item";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Mypage from "./pages/Mypage";
import Record from "./pages/Records";

import "./App.css";

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [userinfo, setUserinfo] = useState(null);
  const navigate = useNavigate();
  const signinHandler = (data) => {
    setSignedIn(true);
    issueAccessToken(data.data.accessToken);
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
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/item" element={<Item userinfo={userinfo} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/record" element={<Record />} />
      <Route path="/mypage" element={<Mypage />} />
      {/* <Route
        path="/signin"
        element={signedIn ? <Navigate replace to="/" /> : <Signin signinHandler={signinHandler} />}
      />
      <Route
        path="/m123123ypage"
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
      /> */}
    </Routes>
  );
}
