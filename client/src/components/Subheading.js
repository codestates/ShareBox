import styled from "styled-components"


const Div = styled.div`
  width: 20vw;
  height : 5vh;
  background-color: salmon;
  color : white;
  font-size: 3vh;
  border-radius: 2vh;
  display: flex ;
  justify-content: center ;

`


function Subheading (props) {

  return (
    <Div>
        {props.body}
    </Div>
  )

}


export default Subheading