import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  float: left;
  margin: 2vw;
  border-radius: 5vh ;

  &:hover {
    color: black;
    transform: scale(1.1);
    transition: all 1s linear;
  }
`;

const Img = styled.img`
  width: 14.5vw;
  height: 26vh;
  border-radius: 5vh ;
  background-image: ${(props) => props.image};
  background-color: salmon;
  display: grid;
`;

const Body = styled.ul`
  width: 14.5vw;
  height: 6vh;
  background-color: cornsilk;
  font-size: 1vw;
`;

const TextRight = styled.div`
  text-align: right;
`;

const Box = styled(Body)`
  width: 14.5vw;
  height: 26vh;
  border-radius: 5vh ;
`;

function Product(props) {

  return (  
    <Wrapper>      
      <Link to={`/records/${props.id}`}>
        <Box>
          <Img src={props.image} alt="상품사진" title={props.title} />
          <Body>
            <span>
              [{props.region}]
              {props.title.length < 14 ? props.title : `${props.title.slice(0, 11)}...`}
            </span>
            <TextRight>{props.createdAt.slice(0, 10)}</TextRight>
          </Body>
        </Box>
      </Link>
    </Wrapper>
  );
}

export default Product;
