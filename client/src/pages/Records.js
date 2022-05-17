import axios from 'axios'
// import Title from '../components/Title'
import { useState } from 'react'
import styled from 'styled-components'
import Subheading from '../components/Subheading'

const Wrapper = styled.div`
  display : flex ;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: rgb(241 212 202 );
  `

const Input = styled.input`
  height: 6vh;
  width: 20vw;
  background-color: rgb(228 140 113);
  border-radius: 3vh;
  margin : 1vh;
  font-size: 2vh ;
  color : white;
  align-content: center ;
  `

const Button = styled.button`
  height: 7vh;
  width : 20vw;
  background-color: white;
  font-size: 2vw;
  align-content: center;
  color: black;
  border : 0; 

`

const Img = styled.img`
  background-image: ${(props) => props.img};
  width: 40vh;
  height: 40vh;
`

function Record () {
  const [post , setPost] = useState({
    title : '',
    image : '',
    category : '',
    content : '',
    country : '' }
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [preview , setPreview] = useState('')


const onRecords = ()  => {    
    const {title, image ,content, category, country} = post
    
    if (!title || !content || !category || !image) {
      setErrorMessage('제목, 사진, 카테고리, 본문은 모두 입력해주셔야 합니다.')

  } else {
    setErrorMessage('')

  axios.post ('http://localhost:4000/records',{title,content,image,category,country})
  
  // ! 
  .then((res) => { console.log(res)})
  .catch((err) => console.log(err))
  }
}

  const handleInputValue = (key) => (e) => {
    setPost({ ...post, [key]: e.target.value });
    
    if (key === 'image'){
      const file = e.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = function (e){
        console.log(e.target.result)
        setPreview(e.target.result)
        setPost({ ...post, [key]: e.target.result })
      // ! 버퍼 데이터를 post의 image로 전송     이거 되는거 맞나? 
      }
 
    }
    console.log(post)
    console.log(preview)
  }


/*
! 사진을 post 데이터에 담아서 전송하는 경우,
  단순히 사진의 이름만 넣고 보낸다고 될 일은 아닌것 같고
  사진의 정보를 보내줘야 할텐데, buffer값을 보내주면 되나? 
  단순히 포스트 상태값에 사진 정보 보내는걸로 안될것 같기도 하고 
*/ 
  // const onSubmitImage = (e) => {
  //   //! 이미지를 서버로 제출하기 위한 함수 ?
  //   const formdata = new FormData()
  //   formdata.append('uploadImage', post.image[0] )
    
    // const config = {
      // Headers : {
        // 'content-type' : 'multipart/form-data',
      // },
  //   }
  //   axios.post('사진 url', formdata, config)
  // }

  const category = ['선택','냉동', '신선', '양곡', '축산', '수산', '음료', '스낵', '가공식품', '조미료'] 
  const countrys = ['지역 선택','강남구','강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구']

  return ( 
  <Wrapper>
    {/* <Title /> */}
      <div>
        <Subheading content='상품 등록' />
        <div>
          <Input type="text"  accept='image/*' onChange={handleInputValue('title')} placeholder="상품 명을 등록해주세요" />
        </div>
          {preview ? <Img alt = '상품 사진' src = {preview} /> : ''}


        <div>
          <input type="file" accept='image/*' onChange={handleInputValue('image')}/>
        
        </div>

        <div>
          <select onChange={handleInputValue('category')}>
            {category.map((menu) => <option 
            key={menu}
            value={menu}
            >{menu}</option>)}
         </select>      
        </div>

        <div>
          <select onChange={handleInputValue('country')}>
            {countrys.map((country) => <option 
            key={country}
            value={country}
            >{country}</option>)}
         </select>      

        </div>

        <div>
          <Input as="textarea" type="text" onChange={handleInputValue('content')} placeholder="상품에 대한 설명과 거래시간을 알려주세요" />
        </div>
        <div>
          {errorMessage}
          </div>
          
          <Button onClick={onRecords}> 등록 </Button>
      </div>
    </Wrapper>
  )
}


/* 생각을 정리를 좀 해봅시다
  파일은 input을 통해서 업로드가 된다. 
  input 태그를 통해서 올라가는 이미지는 배열로써 이미지 정보를 가지고 있다. 
  e.target.files[0] 을 통해서 우리가 원하는 이미지를 이용 할 수 있다.

  미리보기로 빠져야 하니, FileReader를 겪어야 한다.
  이미지 등록 버튼의 클릭이 할 일 
  
  새로운 FileReader 함수를 만들어주고
  FileReader에 onload 이벤트를 발생시킨다. 
  
  상태 preview 에는 base64 버퍼를 담아준다 ( 이를 img 태그의 src로 사용한다.)
  상태 post의 image에는 file을 담아준다.  

  */
export default Record
