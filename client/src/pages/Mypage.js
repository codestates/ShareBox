import Title from "../components/Title";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Subheading from "../components/Subheading";
import { useCookies } from "react-cookie";

const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: rgb(241 212 202);
`;

const Input = styled.input`
  height: 6vh;
  width: 20vw;
  background-color: rgb(228 140 113);
  border-radius: 3vh;
  margin: 1vh;
  font-size: 2vh;
  color: white;
  align-content: center;
`;

function MyPage() {
  const regions = [
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

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  // const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordMessage, setPassWordMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [mobileMessage, setMobileMessage] = useState("");
  const [regionMessage, setRegionMessage] = useState("");

  const [isPassword, setIsPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isRegion, setIsRegion] = useState(false);

  async function getUserInfo() {
    const data = await axios.get(`https://localhost:4000/userinfo`);
    setUserId(data.userid);
    setPassword(data.password);
    setEmail(data.email);
    setMobile(data.mobile);
    setRegion(data.region);
    setIsLoading(true);
  }

  useEffect(() => {
    getUserInfo();
    test();
  });

  function test() {
    const data = {
      userId: "Kimdeokbea",
      password: "1234",
      region: "강남구",
      email: "kimdeokbea@naver.com",
      mobile: "010-0000-0000",
    };

    setUserId(data.userId);
    setPassword(data.password);
    setEmail(data.email);
    setMobile(data.mobile);
    setRegion(data.region);

    console.log(`i:${userId} p:${password} E:${email}, M:${mobile}, R:${region}`);
  }

  function test2() {
    setIsLoading(true);
  }

  function handleUserInfo() {
    if (!password || !email || !mobile || !region) {
      setErrorMessage("사용자 정보가 올바르지 않습니다.");
    } else {
      axios
        .put("http://localhost:4000/userinfo", { password, email, region, mobile })
        .then((res) => {})
        .catch((err) => console.log(err));
    }
  }

  function onPasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
    console.log(`비밀번호1:${value}`);

    if (value.length < 4) {
      setPassWordMessage("비밀번호는 4글자 이상이여야 합니다.");
      setIsPassword(false);
    } else {
      setPassWordMessage("");
      setIsPassword(true);
    }
  }

  function onEmailChange(e) {
    const value = e.target.value;
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    setEmail(value);
    if (!emailRegex.test(value)) {
      setEmailMessage("올바르지 못 한 이메일 형식입니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  }

  function onMobileChange(e) {
    const value = e.target.value;
    const mobileRegex = /[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}/;
    setMobile(value);

    if (!mobileRegex.test(value)) {
      setMobileMessage("올바르지 못 한 전화번호 형식입니다.");
      setIsMobile(false);
    } else {
      setMobileMessage("");
      setIsMobile(true);
    }
  }

  function onRegionSelect(e) {
    const value = e.target.value;
    setRegion(value);

    if (value === "지역 선택") {
      setRegionMessage("지역을 선택해주세요");
      setIsRegion(false);
      setRegion("");
    } else {
      setRegionMessage("");
      setIsRegion(true);
    }
  }

  return (
    <Wrapper>
      <Title />
      <Subheading body=" 내 정보 보기 / 변경" />
      {isLoading ? (
        <div>
          <div>
            아이디 : <Input defaultValue={userId} disabled={true} />
          </div>

          <div>
            비밀번호 :
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={onPasswordChange}
              defaultValue={password}
              maxLength={15}
              required
            />
            {isPassword ? null : <div>{passwordMessage}</div>}
          </div>

          <div>
            이메일 :
            <Input
              type="email"
              placeholder="이메일을 입력 해주세요"
              onChange={onEmailChange}
              maxLength={25}
              defaultValue={email}
              required
            />
            {isEmail ? null : <div>{emailMessage}</div>}
          </div>

          <div>
            휴대폰 번호 :
            <Input
              type="text"
              placeholder="휴대폰 번호를 입력해주세요"
              onChange={onMobileChange}
              defaultValue={mobile}
              required
            />
            {isMobile ? null : <div>{mobileMessage}</div>}
          </div>

          <div>
            지역 :{" "}
            <Input as="select" defaultValue={region} onChange={onRegionSelect}>
              {" "}
              {region}
              {regions.map((regions) => (
                <option key={regions} defaultValue={regions}>
                  {regions}
                </option>
              ))}
            </Input>
            <div> {regionMessage} </div>
          </div>

          <button
            onClick={handleUserInfo}
            disabled={isEmail && isMobile && isPassword && isRegion ? false : true}
          >
            {" "}
            회원정보 수정{" "}
          </button>
          <div> {errorMessage}</div>
        </div>
      ) : (
        "Loading..."
      )}
      <button onClick={test2}>테스트 </button>
    </Wrapper>
  );
}

export default MyPage;

/* mypage 버튼을 클릭하면 
  axios.get을 통해서 /userinfo api로 요청을 진행
  성공 (200) 
   {
       userId,
      email,
      mobile
      region 을 가지고 옴 
    }
      가지고 온 정보들을 MYPAGE에 렌더링 해줌
      MYPAGE에 렌더링 된 정보들은 
      이름은 div , 나머지는 input , 지역은 select 태그로 제공
      지역은 select 옵션 속성 중 selected를 통해서 기존의 고객 정보가 선택 되어 있는 상태로 노출

      최하단의 수정 버튼은 클릭시 

      /userinfo 로 put을 통해 수정 된 개인정보를 전달 
      수정 된 개인정보는 비밀번호, 이메일, 모바일, 사는 지역이 전달 / Id는 변경없음. 

*/
