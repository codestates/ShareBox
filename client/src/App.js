import React, { useEffect, useState } from "react";
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
  const [keyword, setKeyword] = useState();
  const [data, setData] = useState();
  const [isloading, setIsLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false); //로그인여부????
  const [accessToken, setAccessToken] = useState(null); //엑세스토큰
  const [userinfo, setUserinfo] = useState(null); //유저정보
  const navigate = useNavigate();
  const handleInputValue = (e) => {
    setKeyword(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.type === "keypress" && e.code === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    if (keyword) {
      let search = axios
        .get(`${process.env.EC2}/search?search_type=title&title=${keyword}&page=${1}&limit=${100}`)
        .then(res => {
          let data = res.data.data;
          setTimeout(() => {
            setData(data);
          }, '100');
        })
        .catch(err => {
          console.log('search error', err);
          if (err.response.data.message === '검색 결과 게시물이 존재하지 않습니다.')
            setTimeout(() => {
              setData([]);
              console.log('검색 결과 게시물이 존재하지 않습니다.');
            }, '100');
        });
      if (window.location.pathname !== '/') navigate('/', { state: { keyword: keyword } });
      return search;
    }
  };
  const signinHandler = () => {
    setSignedIn(true);
  };

  const signoutHandler = () => {
    setSignedIn(false);
  };

  const handleDropout = () => {
    axios.post("https://localhost:4000/dropout").then((res) => {
      setSignedIn(false);
      navigate("/");
    });
  };

  const getData = () => {
    console.log('starting main retrieval');
    axios
      .get("http://localhost:4000/main")
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setIsLoading(true);
      })
      .catch((err) => console.log('main not retrieved', err));
  };
  
  useEffect(() => {
    console.log('App data:')
    console.log(data);
  }, [data]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              handleInputValue={handleInputValue}
              handleKeyPress={handleKeyPress}
              handleSearch={handleSearch}
              data={data}
              getData={getData}
              setData={setData}
              isloading={isloading}
              setIsLoading={setIsLoading}
              signedIn={signedIn}
              // handleLogout={handleLogout}
              signoutHandler={signoutHandler} //메인에 내려주고 다시 Header2로 내려주는 함수
            />
          }
        />
        <Route
          path="/records/:id"
          element={
            <Item
              getData={getData}
              accessToken={accessToken}
              handleInputValue={handleInputValue}
              handleKeyPress={handleKeyPress}
              handleSearch={handleSearch}
              data={data}
              signedIn={signedIn}
              // handleLogout={handleLogout}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/record"
          element={
            <Record
              handleInputValue={handleInputValue}
              handleKeyPress={handleKeyPress}
              handleSearch={handleSearch}
              data={data}
              // handleLogout={handleLogout}
            />
          }
        />
        <Route
          path="/mypage"
          element={
            <Mypage
              handleInputValue={handleInputValue}
              handleKeyPress={handleKeyPress}
              handleSearch={handleSearch}
              data={data}
              userinfo={userinfo}
              accessToken={accessToken}
              handleDropout={handleDropout}
            />
          }
        />
        <Route
          path="/signin"
          element={
            signedIn ? <Navigate replace to="/" /> : <Signin signinHandler={signinHandler} />
          }
        />
      </Routes>
    </>
  );
}
