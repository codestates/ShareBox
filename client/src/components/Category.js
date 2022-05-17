import {useState} from 'react'
import styled from 'styled-components';

const TabMenu = styled.ul`
  background-color: #dcdcdc;
  color: rgba(73, 73, 73, 0.5);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  margin-bottom: 7rem;
  position : static;

  .submenu { 
    width: 100%;
    padding: 15px 10px;
    cursor: pointer;
  
  }

  .selected {
    background-color: #4000c7;
    color: rgba(255, 255, 255, 1);
    transition: 0.3s;
  }

  & div.desc {
    text-align: center;
  } 
`;


function Category (props) {
  const [category,setCategory] = useState('')
  const [currentTab, setCurrentTab] = useState('');

  

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  
  const handleCategory = (e) => {
    const value = e.target.value
    setCategory(value)
    setCurrentTab(value)
    
    props.handleCategory({category})
    // category 정보를 메인 페이지로 전달 
  }




  return (

    <div>
      <TabMenu>
        {props.name.map((menu,index) =>  <button 
          key={index}
          className={'submenu selected'}
          onClick={handleCategory}
          value={menu} > {menu}</button> )}
      </TabMenu>
    </div>
    
  )
}

export default Category


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

