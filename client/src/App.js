import React, { useState } from "react";
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

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const [signedIn, setSignedIn] = useState(false); //로그인여부
  const navigate = useNavigate();

  const signinHandler = (data) => {
    setSignedIn(true);
  };


  const handleLogout = () => {
    axios.post("http://localhost:4000/logout").then((res) => {
      setSignedIn(false);
      navigate("/");
    });
  };

  const handleDropout = () => {
    axios.post("https://localhost:4000/dropout").then((res) => {
      setSignedIn(false);
      navigate("/");
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Main handleLogout={handleLogout} />} />
      <Route path="/records/:id" element={<Item
        signedIn={signedIn}
        handleLogout={handleLogout}
      />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/record" element={<Record handleLogout={handleLogout} />} />
      {/* <Route path="/mypage" element={<Mypage
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
            <Mypage />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />
    </Routes>
  );
}
