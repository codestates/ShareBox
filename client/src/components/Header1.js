import React from 'react';
import ShareBox from '../assets/ShareBox.png';
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const Wrapper = styled.div`
display: flex ;
justify-content: center;
  width : 100vw;
  height : 10vh;
  
  position: static ;
  background: linear-gradient(to top,rgba(241 212 202),white);
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


  
// const Wrapper = styled.div`
// display: flex ;
// justify-content: center;
//   width : 100%;
//   height : 20%;
//   font-size: 7vh ;
//   position: static ;
// `

// const Title1 = styled.span`
//   width : 100vw;
//   height : 10vh;
//   font-size: 7vh ;
//   background-color:  white ;
//   text-align: center ;
// `

// const Img = styled.img`
//   width:  15vw;
//   height : 10vh;
//   margin: 0 ;
//   padding: 0 ;
// `
