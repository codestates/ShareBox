import React from 'react';
import ShareBox from './ShareBox.png';
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const Wrapper = styled.div`
display: flex ;
justify-content: flex-start;
  width : 100%;
  height : 10vh;
  font-size: 7vh ;
  position: static ;
  background-color: white ;
`


export default function Header1 (props) {
  
// fix 
  return (
    <Link to ='/'>
      <Wrapper onClick={props.getData}>
        <img src={ShareBox} alt='logo' />
    
    </Wrapper>
    </Link>
  );
}


  