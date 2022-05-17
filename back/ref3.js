import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function Signup () {
  const [userinfo, setuserinfo] = useState({
    email: '',
    password: '',
    username: '',
    mobile: ''
  });

  //  userinfo의 초기값은 모두 비어있구만유 , 
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const handleInputValue = (key) => (e) => {
    setuserinfo({ ...userinfo, [key]: e.target.value });
    /* console.log(key)
      key => 필드의 제목? object의 key값 
      console.log(e)
      e 는 내가 누르는 이벤트  ,  e.target.value = 회원가입창에 입력하는 문자들
     */
  };


  const handleSignup = () => {
    /*
    TODO : 서버에 회원가입을 요청 후 로그인 페이지로 이동하세요.
      회원가입 성공 후 로그인 페이지 이동은 다음 코드를 이용하세요.\
        history.push("/");
    TODO : 모든 항목을 입력하지 않았을 경우 에러를 표시해야 합니다.
    */
const {email,password,username,mobile} = userinfo


if (!userinfo.email ||
    !userinfo.password ||
    !userinfo.username ||
    !userinfo.mobile) {
  setErrorMessage('모든 항목은 필수입니다')

} else {

    axios
      .post('https://localhost:4000/signup',{email,password,username,mobile})
    .then((res)=>{
      // console.log(res)
    })
    .then(history.push("/"))
    .catch((err) => console.log(err))
  }
};
  return (
    <div>
      <center>
        <h1>Sign Up</h1>
        <div>모든 항목은 필수입니다</div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <span>이메일</span>
            <input type='email' onChange={handleInputValue('email')} />
          </div>
          <div>
            <span>비밀번호</span>
            <input
              type='password'
              onChange={handleInputValue('password')}
            />
          </div>
          <div>
            <span>이름</span>
            <input type='text' onChange={handleInputValue('username')} />
          </div>
          <div>
            {' '}
            <span>전화번호</span>{' '}
            <input type='tel' onChange={handleInputValue('mobile')} />
          </div>
          <div>
            <Link to='/login'>이미 아이디가 있으신가요?</Link>
          </div>
          <button
            className='btn btn-signup'
            type='submit'
            onClick={handleSignup}
          >
            회원가입
          </button>
          <div className='alert-box'>{errorMessage}</div>
        </form>
      </center>
    </div>
  );
}
