/* 
헤더2 props 추가
*/
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
import Header2 from "./components/Header2";

export default function App() {
  const [keyword, setKeyword] = useState();
  const [data, setData] = useState();
  const [signedIn, setSignedIn] = useState(false); //로그인여부????
  const [accessToken, setAccessToken] = useState(null); //엑세스토큰
  const [userinfo, setUserinfo] = useState(null); //유저정보
  const navigate = useNavigate();
  const handleInputValue = (e) => {
    setKeyword(e.target.value);
  }
  const handleKeyPress = (e) => {
    if (e.type === "keypress" && e.code === "Enter") {
      handleSearch();
    }
  }
  const handleSearch = () => {
    if (keyword) {
      axios
      .get(`http://localhost:4000/search?search_type=title&title=${keyword}&page=${1}&limit=${1}`)
      .then(res => {
        let data = res.data.data;
        navigate('/');
        setData(data);
      })
      .catch(err => console.log(err));
    }
  }
  const signinHandler = (data) => {
    setSignedIn(true);
    issueAccessToken(data);
  };

  const issueAccessToken = (token) => {
    setAccessToken(token);
  };
  const handleLogout = () => {
    axios.get("http://localhost:4000/logout").then((res) => {
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
    <>
    <Routes>
      <Route path="/" element={<Main
      handleInputValue={handleInputValue}
      handleKeyPress={handleKeyPress}
      handleSearch={handleSearch}
      data={data}
      signedIn={signedIn}
      handleLogout={handleLogout}
      />} />
      <Route path="/records/:id" element={<Item
      handleInputValue={handleInputValue}
      handleKeyPress={handleKeyPress}
      handleSearch={handleSearch}
      data={data}
      signedIn={signedIn}
      handleLogout={handleLogout}
      />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/record" element={<Record
        handleInputValue={handleInputValue}
        handleKeyPress={handleKeyPress}
        handleSearch={handleSearch}
        data={data}
        handleLogout={handleLogout}
      />} />
      <Route path="/mypage" element={<Mypage
        handleInputValue={handleInputValue}
        handleKeyPress={handleKeyPress}
        handleSearch={handleSearch}
        data={data}
        userinfo={userinfo}
        accessToken={accessToken}
        issueAccessToken={issueAccessToken}
        handleDropout={handleDropout}
      />} />
      <Route
        path="/signin"
        element={signedIn ? <Navigate replace to="/" /> : <Signin signinHandler={signinHandler} />}
      />
      {/* <Route
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
      /> */}
    </Routes>
    </>
  );
}
