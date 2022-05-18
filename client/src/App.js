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
axios.defaults.withCredentials = true;

export default function App() {
  const [data, setData] = useState("");
  const [isloading, setIsLoaidng] = useState(false);
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

  const getData = () => {
    axios
      .get("http://localhost:4000/main")
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
        setIsLoaidng(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Main
            handleLogout={handleLogout}
            getData={getData}
            setIsLoaidng={setIsLoaidng}
            setData={setData}
            isloading={isloading}
            data={data}
          />
        }
      />
      <Route
        path="/records/:id"
        element={
          <Item
            accessToken={accessToken}
            signedIn={signedIn}
            data={data}
            handleLogout={handleLogout}
            getData={getData}
          />
        }
      />
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
