import Title from "../components/Title";
import Category from "../components/Category";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import LoadingIndicator from "../components/LoadingIndicator";

import SSS from "../assets/sss";
import Kingfoot from "../assets/kingfoot";
import styled from "styled-components";

const Wrapper = styled.div`
  /* position: fixed; */
  `

function Main() {
  const [isloading, setIsLoaidng] = useState(false);
  const [data, setData] = useState('');
  const [category, setCatgory] = useState('')

  //카테고리요청
  const handleCategory = (element) => {

  }

  const getData = async () => {
    const a = await axios.get(`http://localhost:4000/main`)
    console.log(a)

    // const data = [
    //   {
    //     id: 1,
    //     title: '왕발 나눔 하실 분',
    //     picture: Kingfoot,
    //     createdAt: '2022-1-11',
    //     updatedAt: '2022-1-11',
    //     country: '종로구'
    //   },
    //   {
    //     id: 2,
    //     title: '삼겹살 나눔합니다',
    //     picture: SSS,
    //     createdAt: '2022-2-22',
    //     updatedAt: '2022-2-22',
    //     country: '강남구'
    //   },
    //   {
    //     id: 3,
    //     title: '글자수제한이어디까지 되는지 테스트 좀 해보려고 길게 써보는 중 ',
    //     picture: '',
    //     createdAt: '2022-3-3',
    //     updatedAt: '2022-3-3',
    //     country: '서초구'
    //   }
    // ]

    // setData(data);
    // console.log(data)
    // console.log(data.length)
    // setIsLoaidng(true)
  };

  useEffect(() => {
    getData()
  }, []);


  /*
    카테고리 컴포넌트에서 카테고리 값은 받아왔음
    그럼 카테고리의 값이 변경 되는 경우는 유저가 카테고리를 눌렀을때이다.
    카테고리를 누른 순간 axios를 통해 데이터를 받아오게 된다.
  */




  return (
    <div>
      <Wrapper>
        <Title getData={getData} />
        {/* <SearchBar /> */}
        <Category
          name={["냉동", "신선", "양곡", "축산", "수산", "음료", "스낵", "가공식품", "조미료"]}
          handleCategory={handleCategory}
        />
      </Wrapper>
      <div>
        {isloading ? <div> {data.map((item) =>
          <Product
            id={item.id}
            key={item.id}
            title={item.title}
            image={item.picture}
            region={item.country}
            createdAt={item.createdAt} />)} </div>

          : <LoadingIndicator />}
      </div>


      <button onClick={getData}> 테스트 버튼 </button>

      <div>
        <Link to='/signup'>
          <button> 회원가입 </button>
        </Link>
        <Link to='/record'>
          <button> 상품등록 </button>
        </Link>
        <Link to='/mypage'>
          <button> 내 정보 </button>
        </Link>

        <Link to='/'>
          <button> 메인 </button>
        </Link>
      </div>
    </div>

  );
}

export default Main;

/*
메인 페이지의 구상에 대해서

메인페이지 접속시 발생되는 사건은?
axios.get 으로 서버의 데이터 받아오기 
로딩이 되지 못 한 상태라면 로딩중이라는 메시지 출력 해주기 
서버의 데이터를 받아오면 <Product> 컴포넌트에 받아온 데이터를 넣어준다.
Product 컴포넌트는 image , region, title, createdAt 을 prop로 갖게 된다.

axios.get을 통해 받아온 data를 props로 전달을 위해서 상태를 마련해줘야하나 ? 


*/
