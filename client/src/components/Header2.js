import axios from 'axios';
import React, { useState } from 'react';
import { Sign } from '../components/Sign';
import Button from './Button';
import searchIcon from './SearchIcon.png';
/* import styled from 'styled-components';

export const Hdr2 = styled.div`
`; */

axios.defaults.withCredentials = true;

export default function Header2 () {
  const [keyword, setKeyword] = useState();
  const handleInputValue = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = () => {
    if (keyword) {
      axios
      .post(
        'https://localhost:4000/search',
        keyword
      )
      .then()
      .catch(err => console.log(err));
    }
  }
  return (
    <>
      <center>
        <form onSubmit={(e) => e.preventDefault()}>
          <input className='ip-search' type='text' onChange={handleInputValue} />
          <button className='btn btn-search' type='submit' onClick={handleSearch}>
            <img src={searchIcon} alt='search button' />
          </button>
        </form>
        <span>
          <Sign />
        </span>
        <span>
          <Button />
        </span>
        <div>
          category
        </div>
        
      </center>
    </>
  );
}