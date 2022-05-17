import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header1 from '../components/Header1';

axios.defaults.withCredentials = true;

export default function Signin({ accessToken, signinHandler }) {
  const GITHUB_LOGIN_URL = 'https://github.com/login/oauth/authorize?client_id=5a0ba47d6cec26f64fda'
  const handleOauth = () => {
    window.location.assign(GITHUB_LOGIN_URL);
  }

  const [signinInfo, setSigninInfo] = useState({
    userId: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputValue = (key) => (e) => {
    setSigninInfo({ ...signinInfo, [key]: e.target.value });
  };

  const handleSignin = () => {

    const { userId, password } = signinInfo;

    if (userId === '' || password === '') {
      setErrorMessage('ID와 비밀번호를 입력하세요');
    } else {

      axios.post('http://localhost:4000/login',
        { userId, password },
        {
          headers: { "Content-Type": `application/json` }
        })
        .then(res => {
          console.log(res.data.data.accessToken)
          signinHandler(res.data.data.accessToken)
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='background'>
      <Header1 />
      <form className='signinContainer' onSubmit={(e) => e.preventDefault()}>
        <h1>로그인</h1>
        <div className='signin-top'>
          <div className='inputFields'>
            <div className='inputField'>
              <input
                type='text'
                onChange={handleInputValue('userId')}
                placeholder='ID'
              />
            </div>
            <div className='inputField'>
              <input
                type='password'
                onChange={handleInputValue('password')}
                placeholder='비밀번호'
              />
            </div>
          </div>
          <button className='btn btn-signin' type='submit' onClick={handleSignin}>
            로그인
          </button>
        </div>
        <div>
          <button className='btn btn-oauth' onClick={handleOauth}>
            GitHub ID로 가입/로그인
          </button>
          <button className='btn btn-signup'>
            <Link to='/signup'>회원가입</Link>
          </button>
        </div>
        <div className='alert-box'>{errorMessage}</div>
      </form>
    </div>
  );
}
