import logo from '../assets/logo.png'
import styled from 'styled-components'


const Title1 = styled.div`
display: flex ;
justify-content: center;
  width : 100%;
  height : 20%;
  font-size: 7vh ;
  position: fixed ;
  top : 0;
  left : 0;
  right : 0;
`

const Img = styled.img`
  width:  20%;
  height : 15%;
  /* float: left ; */
  margin: 0 ;
  padding: 0 ;
`




function Title () {
  return (
    <div>
    <Img alt = 'sharebox' src={logo}/>
    <Title1>
      S H A R E B O X 
    </Title1>
    </div>
  )
}


export default Title