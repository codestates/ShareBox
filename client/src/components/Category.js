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



*/