import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
/* import { validId, strongPassword } from '../components/Validator'; */

axios.defaults.withCredentials = true;

export default function Signin (props) {
  const [signinInfo, setSigninInfo] = useState({
    userId: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const GITHUB_LOGIN_URL = 'https://github.com/login/oauth/authorize?client_id=5a0ba47d6cec26f64fda'
  const handleInputValue = (key) => (e) => {
    setSigninInfo({ ...signinInfo, [key]: e.target.value });
  };
  const inputHandler = (e) => {
    setSigninInfo({ [e.target.name]: e.target.value });
  }
  const signinRequestHandler = () => {
    const { userId, password } = this.state;
    axios
      .post(
        "https://localhost:4000/signin",
        signinInfo,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      )
      .then((res) => {
        props.signinHandler(res.data);
      })
      .catch((err) => console.log(err));
  }
  const handleSignin = () => {
    const { userId, password } = signinInfo;
    if (userId === '' || password === '') setErrorMessage('ID와 비밀번호를 입력하세요.');
    /* else if (!validId(userId) || !strongPassword(password)) setErrorMessage('ID 또는 비밀번호가 올바르지 않습니다.'); */
    else axios
    .post(
      'https://localhost:4000/signin',
      { userId, password },
    )
    .then(props.handleResponseSuccess)
    .catch(err => console.log(err));
  };
  const handleOauth = () => {
    window.location.assign(GITHUB_LOGIN_URL);
  }
  return (
    <div className='background'>
      <center>
        <h1>로그인</h1>
        <form className='signinContainer' onSubmit={(e) => e.preventDefault()}>
          <div className='inputField'>
            <span>ID</span>
            <input
              name='userId'
              type='text'
              onChange={handleInputValue('userId')}
              value={signinInfo.userId}
            />
          </div>
          <div className='inputField'>
            <span>비밀번호</span>
            <input
              name='password'
              type='password'
              onChange={handleInputValue('password')}
              value={signinInfo.password}
            />
          </div>
          <button className='btn btn-signin' type='submit' onClick={signinRequestHandler}>
            로그인
          </button>
          <div>
            <button className='btn btn-oauth' onClick={handleOauth}>
              GitHub ID로 가입/로그인
            </button>
          </div>
          <div>
            <button className='btn btn-signup'>
              <Link to='/signup'>회원가입</Link>
            </button>
          </div>
          <div className='alert-box'>{errorMessage}</div>
        </form>
      </center>
    </div>
  );
}
