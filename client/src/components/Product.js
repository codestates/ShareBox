import styled from "styled-components"
import { Link } from "react-router-dom"


const Wrapper = styled.div`
  display: flex;
  justify-content: space-around ;
  flex-direction: row;
  
`

const Img = styled.img`
  width: 250px;
  height: 200px;
  background-image: ${(props) => props.image};
  background-color: salmon ;
  z-index: 1;
`

const Body = styled.div`
  width: 250px;
  height: 50px;
  background-color: cornsilk ;
`

const TextRight = styled.div`
  text-align: right;
`

const Box = styled(Body)`
  height: 300px ;
  background-color: white ;
`



function Product (props) {


  return (
    <Link to = {`/records/${props.id}`} >
    <Wrapper>
      <Box>
        <Img src={props.image} alt='상품사진'/>
        <Body> 
          <span>[{props.region}]</span>
          {props.title.length < 13 ? props.title : `${props.title.slice(0,12)}...` }
          <TextRight>{props.createdAt.slice(0,10)}</TextRight>
        </Body>
      </Box>
    </Wrapper>
    </Link>

    
  )
}

// id = {item.id}
// key = {item.id}
// title = {item.title}
// image = {item.picture}
// createdAt = {item.createdAt} 


export default Product