import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";


const TabMenu = styled.ul`
  display: flex;
  flex-direction: row;
  
  .menu {
    background-color: white ;
    border: 0;
    outline : 0;
    font-size: 2vh ;
    width: 100vw;
    height: 5vh;
    padding: 5px 10px;
  &:hover{
    background-color : #E48C71;
    color: white;
    transition: 0.5s;
  }
}
`;

function Category(props) {

  const [cookies] = useCookies([]);
  const navigate = useNavigate();

  const onRecord = () => {
    if (!cookies.accessToken){
      navigate('/signin')
    } else { 
      navigate('/record')
    }
  } 
  //  로그인 여부에 따라 보내주는 페이지가 다름 

  return (
    <div>
      <TabMenu>
        {props.name.map((menu, index) => (
          <button
            key={index}
            className={'menu'}
            onClick={props.handleCategory}
            value={menu}
          >
            {" "}
            {menu}
          </button>
        ))}
            <button onClick={onRecord} className={'menu'}> 상품 등록 </button>
      </TabMenu>
    </div>
  );
}

export default Category;

/*

  카테고리는 카테고리만 하자 , 아래 상품은 Product 컴포넌트로 렌더링 하자 
  
  카테고리는 어떻게 작동하는가? 
  카테고리는 각 카테고리의 버튼들이 나열이 되어 있는 상태이다 
  해당 버튼은 각각의 get 요청을 보내게 된다. 


  컴포넌트 끌어올리기를 통해서 
  Main 에서 Category 로 data를 변경 할 수 있는 함수를 내려주기
  Category 의  함수는 내려 받은 Props 함수를 실행시키는 함수를 만들기 

  props.내려받은함수() 의 파라미터에 카테고리을 전달해주기? 
  State 끌어올리기 좀 복습해야겠다. 

 데이터 흐름
 카테고리 컴포넌트에서 카테고리가 선택이 된다면, 

*/
