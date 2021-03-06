import axios from 'axios'
import { useEffect, useState } from "react";
import styled from "styled-components";
import Subheading from "../components/Subheading";
import Header1 from '../components/Header1';

const Wrapper = styled.div`
  margin : 0px;
  height: 96vh;
  width: 100vw;
  
  justify-content: space-evenly;
  background: linear-gradient(to bottom,rgba(241 212 202) 80%,white);
  text-align: center;

  `

const Input = styled.input`
  height: 6vh;
  width: 16vw;
  text-align: center ;
  background-color: rgb(228 140 113);
  border-radius: 3vh;
  margin: 1vh;
  font-size: 1vw;
  color: white;
  box-shadow: 3px 4px 0px 0px #8a2a21;

	
  &::placeholder{
    color: white;
  }
`;

const ImageInput = styled.input`
`

const Button = styled.button`
  width: 10vw;
  height: 7vh;
  margin-top : 7vh;
  box-shadow:inset 0px 1px 0px 0px #f9eca0;
  background:linear-gradient(to bottom, #f9eca0 5%, #f2ab1e 100%);
  border-radius:1vw;
  cursor:pointer;
  color:#c92200;
  font-size: 1.5vh;
  font-weight:bold;
  
  &:active {
  position:relative;
  top:1px;
  }
`
const Textarea = styled(Input)`
  width: 22vw;
  height: 10vh ;
`

const Selector = styled(Input)`
  width: 10vw;
  border-radius: 0vh ;
`;

const Img = styled.img`
  background-image: ${(props) => props.img};
  width: 14.5vw;
  height: 26vh;
  border-radius: 3vh ;
`;




function Record(props) {
  const [post, setPost] = useState({
    title: "",
    image: "",
    category: "",
    content: "",
    country: "",
  });
  const [imageFile, setImageFile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState("");

  const onUploadImage = (e) => {
    const file = e.target.files;
    setImageFile(file);
    console.log(imageFile);
    //  이미지 상태에 파일값 저장

    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function (e) {
      setPreview(e.target.result);
      // 파일 리드를 통해 프리뷰에 미리보기 구현
    };
  };

  const onRecords = () => {
    // const {title, content, category, country} = post
    //  if (!title || !content || !category || !image || !country) {
    // setErrorMessage('제목, 사진, 카테고리, 본문은 모두 입력해주셔야 합니다.')

    // } else {

    const data = {
      title: post.title,
      image: post.image,
      content: post.content,
      category: post.category,
      country: post.country,
    };

    const formData = new FormData();
    formData.append("image", imageFile[0]);
    formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

    // formData.append("data", new Blob([JSON.stringify(variables)], {type: "application/json"}))
    for (let key of formData.keys()) {
      console.log(`formData Key 값 : ${key}`);
    }

    /* value 확인하기 */
    for (let value of formData.values()) {
      console.log(value);
    }


    axios
      .post("http://localhost:4000/records", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios.post ('http://localhost:4000/records',formData,{headers: { "Content-Type": "multipart/form-data" }})
    // .then((res) => { console.log('response : ', JSON.stringify(res, null, 2)) })
    // .catch( error => { console.log('failed', error) })
  };

  const handleInputValue = (key) => (e) => {
    setPost({ ...post, [key]: e.target.value });
    console.log(post);
  };

  useEffect(() => {
    console.log(imageFile);
  }, [imageFile]);

  const category = [
    "선택",
    "냉동",
    "신선",
    "양곡",
    "축산",
    "수산",
    "음료",
    "스낵",
    "가공식품",
    "조미료",
  ];
  const countrys = [
    "지역 선택",
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ];

  return (
    
    
      <Wrapper>
      <Header1 /> 
      <div>
        <Subheading body="상품 등록" />
        <div>
          <Input
            accept="image/*"
            onChange={handleInputValue("title")}
            placeholder="상품 명을 등록해주세요"
          />
        </div>
        {preview ? <Img alt="상품 사진" src={preview} /> : ""}

        <div>
          <ImageInput type="file" accept="image/*" onChange={onUploadImage} />
        </div>

        <div>
          <Selector as="select" onChange={handleInputValue("category")}>
            {category.map((menu) => (
              <option key={menu} value={menu}>
                {menu}
              </option>
            ))}
          </Selector>

          <Selector as="select" onChange={handleInputValue("country")}>
            {countrys.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Selector>
        </div>

        <div>
          <Textarea as="textarea"
            type="text"
            onChange={handleInputValue("content")}
            placeholder="상품에 대한 설명을 알려주세요"
          />
        </div>
        <div>{errorMessage}</div>

        <Button onClick={onRecords}> 등록 </Button>
      </div>
    </Wrapper>
 
  );
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
export default Record;
