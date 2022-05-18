import Title from "../components/Title";
import Category from "../components/Category";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";

import styled from "styled-components";

import { useCookies } from "react-cookie";

const Wrapper = styled.div`
  /* position: fixed; */
`;

function Main() {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const [isloading, setIsLoaidng] = useState(false);
  const [data, setData] = useState("");

  const handleCategory = (e) => {
    const menu = e.target.value;
    axios
      .get(`http://localhost:4000/categorys?category=${menu}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        setIsLoaidng(true);
      })
      .catch((err) => alert(err));
  };

  const getData = () => {
    axios
      .get("http://localhost:4000/main")
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
        setIsLoaidng(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
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
        {isloading ? (
          <div>
            {" "}
            {data === undefined ? (
              <h1>게시글이 없습니다.</h1>
            ) : (
              data.map((item) => (
                <Product
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  image={item.picture}
                  region={item.country}
                  createdAt={item.createdDate}
                />
              ))
            )}{" "}
          </div>
        ) : (
          <LoadingIndicator />
        )}
      </div>

      <button onClick={getData}> 테스트 버튼 </button>

      <div>
        <Link to="/signup">
          <button> 회원가입 </button>
        </Link>
        <Link to="/record">
          <button> 상품등록 </button>
        </Link>
        <Link to="/mypage">
          <button> 내 정보 </button>
        </Link>

        <Link to="/">
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
