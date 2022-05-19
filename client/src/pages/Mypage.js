import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Subheading from "../components/Subheading";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header2 from "../components/Header2";

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

function MyPage(props) {

  axios.defaults.withCredentials = true;
const navigate = useNavigate()
const [cookies] = useCookies([]);

// console.log(cookies.accessToken)

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
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordMessage, setPassWordMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [mobileMessage, setMobileMessage] = useState("");
  const [countryMessage, setCountryMessage] = useState("");

  const [isPassword, setIsPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCountry, setIsCountry] = useState(false);

const getUserInfo = () => {
    axios.get('http://localhost:4000/userinfo')
      .then((res) => {
        const userInfo = res.data.data.userInfo;
        console.log(userInfo);
        setUserId(userInfo.userId);
        setEmail(userInfo.email);
        setMobile(userInfo.mobile);
        setCountry(userInfo.country);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleUserInfo = () => {
      axios({
        method : 'put',
        url : 'http://localhost:4000/userinfo',
        data : {password, email, country, mobile},
      }).then((res) => navigate('/'))
      .catch((err) =>{ console.log(err) })
  }

  const onPasswordChange = (e) => {
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
  };

  const onEmailChange = (e) => {
    const value = e.target.value;
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    setEmail(value);

    console.log(`Email:${value}`);
    if (!emailRegex.test(value)) {
      setEmailMessage("올바르지 못 한 이메일 형식입니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  };

  const onMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    setMobileMessage("");
    setIsMobile(true);
  };

  const onCountrySelect = (e) => {
    const value = e.target.value;
    setCountry(value);
    setCountryMessage("지역을 선택해주세요");
    console.log(value)

    if (value === "지역 선택") {
      setCountryMessage("지역을 선택해주세요");
      setIsCountry(false);
    } else {
      setCountryMessage("");
      setIsCountry(true);
    }
  };

  return (
    <Wrapper>
      {/* <Title /> */}
      <div className='header2'>
        <Header2
          handleInputValue={props.handleInputValue}
          handleKeyPress={props.handleKeyPress}
          handleSearch={props.handleSearch}
          data={props.data}
          signedIn={props.signedIn}
          handleLogout={props.handleLogout}
        />
      </div>
      <Subheading body=" 내 정보 보기 / 변경" />
      {isLoading ? (
        <div>
          <div>
            아이디 : <Input defaultValue={userId} disabled={true} />
          </div>

        <div>
        비밀번호 : 
        <Input
          type='password'
          placeholder='비밀번호를 입력해주세요'
          onChange={onPasswordChange}
          maxLength = {15}
          required />
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
            지역 :
            <Input as="select" key={country} defaultValue={country} onChange={onCountrySelect}>
              {regions.map((regions) => (
                <option key={regions}>{regions}</option>
              ))}
            </Input>
            <div> {countryMessage} </div>
          </div>
          <button
            onClick={handleUserInfo}
            disabled={isEmail && isMobile && isPassword && isCountry ? false : true}
          >
            {" "}
            회원정보 수정{" "}
          </button>
          <div> {errorMessage}</div>
        </div>
      ) : (
        "Loading..."
      )}
    </Wrapper>
  );
}
//  
export default MyPage;

/*


*/
