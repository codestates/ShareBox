import logo from '../assets/logo.png'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const Wrapper = styled.div`
display: flex ;
justify-content: center;
  width : 100%;
  height : 20%;
  font-size: 7vh ;
  position: static ;
`

const Title1 = styled.span`
  width : 100vw;
  height : 10vh;
  font-size: 7vh ;
  background-color:  white ;
  text-align: center ;
`

const Img = styled.img`
  width:  15vw;
  height : 10vh;
  margin: 0 ;
  padding: 0 ;
`




function Title (props) {
  
  const resetData = () => {
    props.getData()
}
  
  return (
    <Link to ='/'>
      <Wrapper onClick={resetData}>
        <Img alt = 'sharebox' src={logo}/>
        <Title1>
          S H A R E B O X 
        </Title1>
      </Wrapper>
    </Link>
  )
}


export default Title