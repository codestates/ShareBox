import axios from 'axios';
import React, { useEffect, useState } from 'react';
import searchIcon from './SearchIcon.png';
import { useCookies } from "react-cookie";
import { useNavigate} from "react-router-dom";
/* import styled from 'styled-components';
export const Hdr2 = styled.div`
`; */

axios.defaults.withCredentials = true;

export default function Header2 () {
  const [keyword, setKeyword] = useState();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [hasToken, setHasToken] = useState(true);
  const navigate = useNavigate();


  const tokenChaser = () => {
    if (!cookies.accessToken) {
      setHasToken(false)
    }
  }

  const handleRoute = (e) => {
    const value = e.target.innerText
    console.log(value)
    if (value === '회원 가입'){
      navigate('/signup')
    } else if (value === '내 정보'){
      navigate('/mypage')
    } else if (value === '로그아웃'){
      handleLogout() 
    } else if (value ==='로그인'){
      navigate('/signin')
      console.log(hasToken)
    }
  }

  const handleLogout = () => {
    axios.get("http://localhost:4000/logout")
      .then((res) => {
        setHasToken(false)
        console.log(hasToken)
        removeCookie('accessToken',[])
        navigate('/')
    });
  };

  useEffect(() => {
    tokenChaser()
  },[hasToken])

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
      .post(
        `https://localhost:4000/search?search_type=${keyword}&title=${{keyword}}&page=${1}&limit=${50}`,
        keyword
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }
  }
  return (
    
      <center>
        <form onSubmit={(e) => e.preventDefault()}>
          <input className='ip-search' type='text' onChange={handleInputValue} onKeyPress={handleKeyPress} />
          <button className='btn btn-search' type='submit' onClick={() => handleSearch}>
            <img src={searchIcon} alt='search button' />
          </button>
        </form>
        <button onClick={handleRoute} >{hasToken ? '로그아웃':'로그인'}</button>
        <button onClick={handleRoute} >{hasToken ? '내 정보':'회원 가입' }</button>

        {/* <button onClick={handleRoute} value={'로그인'}>{hasToken ? '로그아웃':'로그인'}</button>
        <button onClick={handleRoute} value={'회원가입'}>{hasToken ? '내 정보':'회원 가입' }</button> */}
      </center>
    
  );
}