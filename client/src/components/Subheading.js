import styled from "styled-components"


const Div = styled.div`
  width: 25vw;
  height : 5vh;
	font-size: 3vh;
  box-shadow: 2px 2px 0px 0px #000000;
	
	background-color:brown;
	border-radius:14px;
  border-radius:12px;
  color : White;
  
  border-radius: 2vh;
  font-weight:bold;
  display: inline-block ;
  margin-bottom: 3vw ;
`

function Subheading (props) {

  return (
    <Div>
        {props.body}
    </Div>
  )

}


export default Subheading