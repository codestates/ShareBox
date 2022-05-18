/* 
검색 기능 구현
*/
import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import searchIcon from './SearchIcon.png';
import Category from './Category';
import { Link } from 'react-router-dom';
/* import styled from 'styled-components';

export const Hdr2 = styled.div`
`; */

axios.defaults.withCredentials = true;

export default function Header2 (props) {
  /* const [data, setData] = useState();
  const [accessToken, setAccessToken] = useCookies(['accessToken']);
  const [keyword, setKeyword] = useState();
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
      .get(`http://localhost:4000/search?search_type=title&title=${keyword}&page=${1}&limit=${1}`)
      .then(res => {
        let data = res.data.data;
        console.log(data);
        setData(data);
      })
      .catch(err => console.log(err));
    }
  } */
  return (
    <>
      <center>
        <form onSubmit={(e) => e.preventDefault()}>
          <input className='ip-search' type='text' onChange={props.handleInputValue} onKeyPress={props.handleKeyPress} />
          <button className='btn btn-search' type='submit' onClick={props.handleSearch}>
            <img src={searchIcon} alt='search button' />
          </button>
        </form>
        { props.signedIn ? [
        <span key={1}>
          <button onClick={props.handleLogout}>로그아웃</button>
        </span>,
        <button key={2}>
          <Link to='/mypage'>내 정보 보기</Link>
        </button>]
        : [<button key={1}>
          <Link to='/signin'>로그인</Link>
        </button>,
        <button key={2}>
          <Link to='/signup'>회원가입</Link>
        </button>] }
      </center>
    </>
  );
}