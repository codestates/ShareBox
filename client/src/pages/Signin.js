import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
/* import { validId, strongPassword } from '../components/Validator'; */

axios.defaults.withCredentials = true;

export default function Signin ({ handleResponseSuccess }) {
  const [signinInfo, setSigninInfo] = useState({
    id: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const GITHUB_LOGIN_URL = 'https://github.com/login/oauth/authorize?client_id=5a0ba47d6cec26f64fda'
  const handleInputValue = (key) => (e) => {
    setSigninInfo({ ...signinInfo, [key]: e.target.value });
  };
  const handleSignin = () => {
    const { id, password } = signinInfo;
    if (id === '' || password === '') setErrorMessage('ID와 비밀번호를 입력하세요.');
    /* else if (!validId(id) || !strongPassword(password)) setErrorMessage('ID 또는 비밀번호가 올바르지 않습니다.'); */
    else axios
    .post(
      'https://localhost:4000/signin',
      { id, password },
    )
    .then(handleResponseSuccess)
    .catch(err => console.log(err));
  };
  const handleOauth = () => {
    window.location.assign(GITHUB_LOGIN_URL);
  }
  return (
    <div>
      <center>
        <h1>로그인</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <span>ID</span>
            <input type='text' onChange={handleInputValue('id')} />
          </div>
          <div>
            <span>비밀번호</span>
            <input
              type='password'
              onChange={handleInputValue('password')}
            />
          </div>
          <button className='btn btn-signin' type='submit' onClick={handleSignin}>
            로그인
          </button>
          <div>
            <button className='btn btn-oauth' onClick={handleOauth}>
              GitHub ID로 가입/로그인
            </button>
          </div>
          <div>
            <Link to='/signup'>회원가입</Link>
          </div>
          <div className='alert-box'>{errorMessage}</div>
        </form>
      </center>
    </div>
  );
}
