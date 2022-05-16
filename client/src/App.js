import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
import Signup from './pages/Signup'
import Title from './components/Title';
import Main from './pages/Main';
import Record from "./pages/Records";
import MyPage from "./pages/Mypage";


function App() {

  return ( 
    <BrowserRouter>
      <Routes>
        <Route path = '/signup' element = {<Signup />} />
        <Route path = '/' element = {<Main />} />
        <Route path = '/mypage' element = {<MyPage />} />
        <Route path = '/record' element = {<Record />} />
      </Routes>

    <Link to = '/signup'> 
      <button> 회원가입 </button>
    </Link>    
    <Link to = '/record'>
      <button> 상품등록 </button>
    </Link>

    <Link to = '/mypage'>
      <button> 내 정보 </button>
    </Link>
    
    <Link to = '/'>
      <button> 메인 </button>
    </Link>
  
    </BrowserRouter>
  )
}

export default App;
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Main from './pages/Main';
import Item from './pages/Item';
import Signin from './pages/Signin';
import Mypage from './pages/Mypage';
import './App.css';

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [userinfo, setUserinfo] = useState(null);
  const navigate = useNavigate();
  const signinHandler = (data) => {
    setSignedIn(true);
    issueAccessToken(data.data.accessToken);
  }

  const issueAccessToken = (token) => {
    setAccessToken(token);
  }
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
        setSignedIn(true);
        navigate('/');
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
      setSignedIn(false);
      navigate('/');
    });
  }
  const handleDropout = () => {
    axios
    .post('https://localhost:4000/dropout')
    .then(res => {
      setUserinfo(null);
      setSignedIn(false);
      navigate('/');
    });
  }
  useEffect(() => {
    isAuthenticated()
  }, []);
  return (
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/item' element={<Item userinfo={userinfo} />} />
        <Route path='/signin' element={ signedIn ?
          <Navigate replace to='/' /> :
          <Signin
            signinHandler={signinHandler}
            handleResponseSuccess={handleResponseSuccess}
          />} />
        <Route path='/mypage' element={ signedIn ?
          <Mypage
            accessToken={accessToken}
            issueAccessToken={issueAccessToken}
            userinfo={userinfo}
            handleSignout={handleSignout}
            handleDropout={handleDropout}
          /> : <Navigate replace to='/' /> } />
      </Routes>
  );
}
