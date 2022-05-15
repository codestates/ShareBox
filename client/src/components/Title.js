import logo from '../assets/logo.png'
import styled from 'styled-components'


const Title1 = styled.div`
display: flex ;
justify-content: center;
  width : 100vw;
  height : 20vh;
  font-size: 10vh ;
  position: fixed ;
  top : 0;
  left : 0;
  right : 0;
`

function Title () {
  return (
    <Title1>
      S H A R E B O X 
    </Title1>

  )
}


export default Title