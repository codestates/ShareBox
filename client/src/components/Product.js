import styled from "styled-components"

const Wrapper = styled.div`
  margin :0;
  padding : 0;
`

const Img = styled.img`
  width: 250px;
  height: 250px;
  background-image: ${(props) => props.image};
  background-color: salmon ;
  z-index: 1;
`

const Body = styled.div`
  width: 250px;
  height: 50px;
  background-color: green ;
  z-index: 9;
`


function Product (props) {

  return (
    <Wrapper>
      <Img image='null' alt='상품사진'/>
      <Body> 
        {props.region} , {props.title} , {props.createdAt}
      </Body>
    </Wrapper>


    
  )
}


export default Product