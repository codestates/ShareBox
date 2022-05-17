import axios from "axios"
import { useState } from "react"

function SearchBar () {
  const [isLogin , setIsLogin] = useState(false)
  const [searchTarget , setSearchTarget] = useState('')

  /* 
    로그인여부 판별을 위한 함수를 만들기
    로그인 여부는 어떻게 확인을 할 수 있을까? 
  */

  

  function onSearch(e) {
    const value = e.target.value

    if (value === '') {

    } else {

      
      axios.get('FILL_ME_IN','post 정보')
      .then((res) => { 
        // res에 담겨있는 post.title에 value가 포함되어 있는지 확인
        // post.title.includes(value) 가 트루인 경우
        // setSearchTarget(value) 
        // 서치 타겟이 생성 된 상태를 만들어주면 됩니까? 

      }).catch((err) => {console.log(err)})
      
    }
    /*
      서치 함수가 하는 일은 무엇인가
      유저가 입력하는 검색어를 받아와야 함.  > value
      만약 검색어가 없다면, 아무것도 발생되지 않는다. 
      검색어가 존재한다면? 
      무엇을 받아와야 하는가? 
      post를 받아와야 한다. 
      
    */
  }

  return (
    <div>
      이것은 서치바 와 메뉴바 컴포넌트 

      <div> 
        이곳은 서치바
        <input type="text" />
        <button onClick={onSearch}> 검색 </button>
      </div>

      <div> 이곳은 메뉴바 
        <button /*onClick={} */>{isLogin ? '로그아웃' : '로그인'}</button>
        <button /* onClick={}*/>{isLogin ? '내 정보' : '회원가입'}</button>
      </div>
    </div>
  )
}


export default SearchBar

/*
서치바 부분 
ㄴ 검색은 어떻게 작동이 되는가
ㄴ 검색어를 넣고 검색 버튼에 클릭 또는 제출 이벤트를 생성하여, 서버로 요청을 보낼것 (submit 이벤트와 click 이벤트 정확히 구분해야겠다.)
ㄴ 서버로 요청을 보내어 post_title 값을 비교하여, post_title에 요청 값이 존재하면 해당 post를 Main 페이지에 띄워주기
ㄴ 만약 서버의 post_title에 요청한 값을 포함하는 값이 없는 경우 비어있는 페이지를 노출하며, 검색결과가 없음을 알려줘야 함
ㄴ 결과가 있는 상태 / 그렇지 못 한 상태  두 가지로 상태를 나뉘어서 렌더링을 진행 

마이페이지 부분
ㄴ 마이페이지는 로그인 상태에 따라 렌더링을 다르게 해주면 될 듯 하다.
ㄴ 로그인이 된 상태라면 button은 각각 로그아웃 , 내 정보보기를 노출한다.
ㄴ isLogin(false) 의 경우 button은 로그인 , 회원가입을 노출하고
ㄴ 각 버튼에 대해서 react-router-dom 을 통해서 로그인, 회원가입 페이지로 연결시킨다.

*/