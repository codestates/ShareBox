import axios from 'axios';
import React, { useEffect, useState } from 'react';
import searchIcon from '../assets/SearchIcon.png'
import { useCookies } from "react-cookie";
import { useNavigate} from "react-router-dom";
import styled from 'styled-components';
import "../App.css";
axios.defaults.withCredentials = true;

const Wrapper = styled.div`
  display: inline-block ;
  justify-content: space-between;
  width: 100vw ;
  background-color: rgba(241 212 202);
  padding-bottom: 1vw;
`

export default function Header2 (props) {
  // const [data, setData] = useState();
  // const [accessToken, setAccessToken] = useCookies(['accessToken']);
  // const [keyword, setKeyword] = useState();
  const [cookies, removeCookie] = useCookies([]);
  const [hasToken, setHasToken] = useState(true);
  const navigate = useNavigate();


  const tokenChaser = () => {
    if (cookies.accessToken.length < 10) {
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
        removeCookie('accessToken','')
        navigate('/')
    });
  };

  useEffect(() => {
    tokenChaser()
  },[hasToken])

  // const handleInputValue = (e) => {
  //   setKeyword(e.target.value);
  // }
  // const handleKeyPress = (e) => {
  //   if (e.type === "keypress" && e.code === "Enter") {
  //     handleSearch();
  //   }
  // }
  // const handleSearch = () => {
  //   if (keyword) {
  //     axios
  //     .get(`http://localhost:4000/search?search_type=title&title=${keyword}&page=${1}&limit=${1}`)
  //     .then(res => {
  //       let data = res.data.data;
  //       console.log(data);
  //       setData(data);
  //     })
  //     .catch(err => console.log(err));
  //   }
  // } 

  return (
    <Wrapper>
      <center>
        <form onSubmit={(e) => e.preventDefault()}>
          <input className='ip-search' type='text' onChange={props.handleInputValue} onKeyPress={props.handleKeyPress} />
          <button className='btn btn-search' type='submit' onClick={props.handleSearch}>
            <img src={searchIcon} alt='search button' />
          </button>
        </form>
        <button className='logbtn' onClick={handleRoute} >{hasToken ? '로그아웃':'로그인'}</button>
        <button className='logbtn' onClick={handleRoute} >{hasToken ? '내 정보':'회원 가입' }</button>
      </center>
    </Wrapper>
  );
}