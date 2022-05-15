import axios from "axios"
import { useState } from "react"
import Item from "./Item"


function Category (props) {
  const [category,setCategory] = useState('')
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(true)
  

    // const menu = ['냉동', '신선', '양곡', '축산', '수산', '음료', '스낵', '가공식품', '조미료'] // Props로 가능 
   async function onCategoryClick (e) { 
      const value = e.target.value
      setCategory(value)
      console.log(category)
    
      const res = await axios.get(`FILL_ME_IN/categorys?category=${category}`)
      setPost(res.data)
      setLoading(false)
      
    }
    // 카테고리를 클릭하면 벌어지는 일들은 어떤 일이 있습니까?
    // 상태를 변경해줘야겠는데, 이거 상태는 일일이 다 만들어야되는건가? 
    // !카테고리별 필터링은 서버단에서 가능하다 
    // ! 클라이언트에서 할 일은 /categorys?category={category} 로 get 요청을 전달한다.
    // get 요청을 통해 받아온 정보를 post 상태에 저장해준다.
    // 로딩 값을 false로 전환한다. 

    


    return (
  <div>
  
      <div>
        카테고리 컴포넌트
        {props.name.map((menu) =>  <button key={menu} onClick={onCategoryClick} value={menu} > {menu}</button> )}
        {loading ? 'Loading...' : <div>
          {post.map((item) => (
            <Item 
              id = {item.id}
              key = {item.id} 
              img = {item.picture}
              title = {item.title}
              region = {item.country}
              createdAt = {item.createdAt} />
          ))}
          {/* id는 포스트의 id, img는 사진, title은 제목 region은 지역 */}
          </div>}
      </div>

  </div>
    )
}

/*
카테고리 컴포넌트의 구성

카테고리 버튼 부분
ㄴ카테고리의 버튼을 일일이 만드는것 보다는 카테고리 명을 가진 배열을 통해서 map을 통해 버튼을 생성함이 바람직하다.
ㄴ 버튼 클릭 이벤트가 발생하게 되면 서버의 //! /categorys?category={category}   api로 get 요청을 보낸다. 

*/


export default Category