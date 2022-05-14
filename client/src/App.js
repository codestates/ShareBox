import React, { useEffect, useState } from 'react';
import { Route, Link, Routes, useNavigate, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Signin from './pages/Signin';
import Mypage from './pages/Mypage';
import axios from 'axios';
import './App.css';

export default function App() {
  const [isSignin, setIsSignin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const history = useNavigate();
  const isAuthenticated = () => {
    axios
    .get(
      'https://localhost:4000/auth',
      { withCredentials: true }
    )
    .then(res => {
      if (res.data.data.userInfo !== null) {
        const { email, mobile, username } = res.data.data.userInfo;
        setUserinfo({ email, mobile, username });
        setIsSignin(true);
        history.push('/');
      } else {
        setUserinfo(null);
      }
    });
  };
  const handleResponseSuccess = () => {
    isAuthenticated();
  };
  const handleSignout = () => {
    axios
    .post('https://localhost:4000/signout')
    .then(res => {
      setUserinfo(null);
      setIsSignin(false);
      history.push('/');
    });
  }
  const handleDropout = () => {
    axios
    .post('https://localhost:4000/dropout')
    .then(res => {
      setUserinfo(null);
      setIsSignin(false);
      history.push('/');
    });
  }
  useEffect(() => {
    isAuthenticated()
  }, []);
  return (
      <Routes>
        <Route path='/signin' element={<Signin
          isSignin={isSignin}
          handleResponseSuccess={handleResponseSuccess}
        />}/>
        <Route path='/mypage' element={<Mypage
          userinfo={userinfo}
          handleSignout={handleSignout}
          handleDropout={handleDropout}
        />} />
        <Route path='/' element={<Main />} />
      </Routes>
  );
}