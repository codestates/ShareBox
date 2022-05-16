import Title from "../components/Title";
import Category from "../components/Category";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import axios from "axios";

function Main() {
  const [isloading, setIsLoaidng] = useState(false);
  // const [image, setImage] = useState('')
  // const [title, setTitle] = useState('')
  // const [region, setRegion] = useState('')
  // const [createdAt, setCreatedAt] = useState('')
  const [post, setPost] = useState([]);

  const getData = async () => {
    // const data =  await axios.get('FILL_ME_IN')
    // setImage(data.picture)
    // setTitle(data.title)
    // setRegion(data.region)
    // setCreatedAt(data.createdAt)
    const data = [
      {
        id: "id",
        title: "title",
        picture: "picture",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
      },
    ];
    //  get 요청을 했다고 가정하고 임의의 데이터를 만들어두기
    //  이

    setPost([post, ...data]);
    setIsLoaidng(true);
  };

  useEffect(() => {
    // getData()
  });

  return (
    <div>
      {/* <Title /> */}
      <Category
        name={["냉동", "신선", "양곡", "축산", "수산", "음료", "스낵", "가공식품", "조미료"]}
      />

      {/* {isloading ?  'code' : 'Loading...' } */}
      <Product
        image={post.image}
        region={post.region}
        title={post.title}
        createdAt={post.createdAt}
      />
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
