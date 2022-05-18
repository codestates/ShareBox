import styled from "styled-components"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Item from "../pages/Item"

const Wrapper = styled.div`

  display : flex;
  justify-content : space-evenly;
  float: left;
  margin : 2vw;
`

const Img = styled.img`
  width: 14.5vw;
  height: 26vh;
  background-image: ${(props) => props.image};
  background-color: salmon ;
  display: grid;
`

const Body = styled.ul`
  width: 14.5vw;
  height: 6vh;
  background-color: cornsilk ;
  font-size: 1vw;
`

const TextRight = styled.div`
  text-align: right;
`

const Box = styled(Body)`
  width: 14.5vw;
  height: 26vh;
`



function Product (props) {

  return (
    <Wrapper>
      <Link to = {`/records/${props.id}`} >
      <Box>
        <Img src={props.image} alt='상품사진' title={props.title} />
        <Body> 
          <span>[{props.region}]
          {props.title.length < 14 ? props.title : `${props.title.slice(0,11)}...` }</span>
          <TextRight>{props.createdAt.slice(0,10)}</TextRight>
        </Body>
      </Box>
      </Link>
    </Wrapper>


    
  )
}

// id = {item.id}
// key = {item.id}
// title = {item.title}
// image = {item.picture}
// createdAt = {item.createdAt} 


export default Product