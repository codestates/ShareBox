import axios from 'axios'
import {useState} from 'react'

function Category (props) {
  const [category,setCategory] = useState('')
  const [post, setPost] = useState([])


  const getCategoryData = async (e) => {
    console.log(e.target.value)
    const value = e.target.value
    setCategory(value)
    console.log(category)

    if (category !== '' ) {
      const data = await axios.get(`/categorys?category=${value}`)
      console.log(data)
    }
  }

  return (
    <div>
      <div>
        카테고리 컴포넌트
        {props.name.map((menu) =>  <button key={menu} onClick={getCategoryData} value={menu} > {menu}</button> )}
      </div>
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

*/