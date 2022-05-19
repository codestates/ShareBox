import Category from "../components/Category";
import Product from "../components/Product";
import LoadingIndicator from "../components/LoadingIndicator";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header2 from "../components/Header2";
import Header1 from "../components/Header1";

const Wrapper = styled.div`
  display: block;
`;

const Body = styled.div`
  padding-top: 25vh;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(241 212 202);
`;

function Main(props) {
  const [selectProduct, setSelectProduct] = useState();
  const [hasCategory, setHasCategory] = useState(true);

  useEffect(() => {
    props.getData();
  }, []);

  /*
  카테고리 컴포넌트에서 카테고리 값은 받아왔음
  그럼 카테고리의 값이 변경 되는 경우는 유저가 카테고리를 눌렀을때이다.
  카테고리를 누른 순간 axios를 통해 데이터를 받아오게 된다.
*/
  useEffect(() => {
    props.setData(props.data);
  }, [props.data]);

  const handleCategory = (e) => {
    const menu = e.target.value;
    axios
      .get(`http://localhost:4000/categorys?category=${menu}`)
      .then((res) => {
        setHasCategory(true);
        props.setData(res.data.data);
        props.setIsLoading(true);
      })
      .catch((err) => {
        setHasCategory(false);
      });
  };

  return (
    <div>
      <Wrapper>
        <Header1 getData={props.getData} />
        <Header2
          handleInputValue={props.handleInputValue}
          handleKeyPress={props.handleKeyPress}
          handleSearch={props.handleSearch}
          signedIn={props.signedIn}
          handleLogout={props.handleLogout}
          signoutHandler={props.signoutHandler} //App.js에서 받아서 다시 Header2로 내려줌
        />
        <Category
          name={["냉동", "신선", "양곡", "축산", "수산", "음료", "스낵", "가공식품", "조미료"]}
          handleCategory={handleCategory}
        />
        <Body>
          {props.isloading ? (
            <div>
              {hasCategory ? (
                props.data.map((item) => (
                  <Product
                    id={item.id}
                    key={item.id}
                    title={item.title}
                    image={item.image}
                    region={item.country}
                    createdAt={item.createdDate}
                    onClick={() => setSelectProduct(item.id)}
                  />
                ))
              ) : (
                <h1>게시글이 없습니다.</h1>
              )}
            </div>
          ) : (
            <LoadingIndicator />
          )}
        </Body>
      </Wrapper>
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
