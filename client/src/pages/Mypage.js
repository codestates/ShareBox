import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Subheading from "../components/Subheading";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header1 from "../components/Header1";



const Wrapper = styled.div`
  display: inline-block;
  height: 96vh;
  width: 100vw;
  text-align: center ;
  background: linear-gradient(to bottom,rgba(241 212 202) 80%,white);
`;

const Caution = styled.div`
  color: red;
`
const Input = styled.input`
  display: inline-block;
  height: 6vh;
  width: 16vw;
  text-align: center ;
  background-color: rgb(228 140 113);
  border-radius: 3vh;
  margin: 1vh;
  font-size: 2vh;
  color: white;
  box-shadow: 3px 4px 0px 0px #8a2a21;
  &::placeholder{
    color: white;
  }
`;

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


function MyPage(props) {

axios.defaults.withCredentials = true;
const navigate = useNavigate()

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
  const [isEmail, setIsEmail] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const [isCountry, setIsCountry] = useState(true);

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

    if (value.length < 4) {
      setPassWordMessage("비밀번호는 4글자 이상이여야 합니다.");
      setIsPassword(false);
    } else {
      setPassWordMessage("");
      setIsPassword(true);
    }
  };

  const onEmailChange = (e) => {
    const value = e.target.value
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      
      if (!emailRegex.test(value)) {

        setEmailMessage("올바르지 못 한 이메일 형식입니다.");
        setIsEmail(false);

      } else if (!value) {
        setEmailMessage("이메일을 입력해주세요");
        setIsEmail(false);

      } else if (value.length === 0) {
        setEmailMessage("이메일을 입력해주세요");
        setIsEmail(false)
      
      } else {
        setEmail(value)
        setEmailMessage("");
        setIsEmail(true);
      }
  };

  const onMobileChange = (e) => {
    const value = e.target.value;
    
   if (value.includes('-')){
      setIsMobile(false)
      setMobileMessage('하이픈(-)은  제외하고 입력해주세요')
    } else if (value.length > 12 || value.length < 9){
      setIsMobile(false)
      setMobileMessage('올바르지 못 한 번호입니다.')
    } else {
    setMobile(value)
    setMobileMessage("");
    setIsMobile(true);
    }
  };

  const onCountrySelect = (e) => {
    const value = e.target.value;
    
    setCountry(value);
    setCountryMessage("지역을 선택해주세요");


    if (value === "지역 선택") {
      setCountryMessage("지역을 선택해주세요");
      setIsCountry(false);
    } else {
      setCountryMessage("");
      setIsCountry(true);
    }
  };

  const look = () => {
    console.log(`password : ${password}, Email : ${email}, Mobile : ${mobile}, Country : ${country}`)
    console.log(`isPassword : ${isPassword}, isEmail : ${isEmail}, isMobile : ${isMobile}, isCountry : ${isCountry}`)
  }
  return (
    <Wrapper>
      <Header1 />
      <Subheading body=" MY PAGE" />
      {isLoading ? ( 
        <div>
          <div>
            <Input 
                type='text'
                placeholder="ID"
                defaultValue={userId} 
                disabled={true} />
          </div>

        <div>
          <Input
            type='password'
            placeholder='비밀번호를 입력해주세요'
            onChange={onPasswordChange}

            maxLength = {15}
            required />
            {isPassword ? null : <Caution>{passwordMessage}</Caution>}
        </div>
        <div>
            <Input
              type="email"
              placeholder="이메일을 입력 해주세요"
              onChange={onEmailChange}
              maxLength={25}
              defaultValue={email}
              required
            />
            {isEmail ? null : <Caution>{emailMessage}</Caution>}
        </div>
        <div>
            <Input
              type="text"
              placeholder="휴대폰 번호를 입력해주세요"
              onChange={onMobileChange}
              defaultValue={mobile}
              required
            />
            {isMobile ? null : <Caution>{mobileMessage}</Caution>}
          </div>
          <div>
            <Input as="select" key={country} defaultValue={country} onChange={onCountrySelect}>
              {regions.map((regions) => (
                <option key={regions}>{regions}</option>
              ))}
            </Input>
            <div> {countryMessage} </div>
          </div>
          <Button
            onClick={handleUserInfo}
            disabled={isEmail && isMobile && isPassword && isCountry && email && mobile ? false : true}
          >
            회원정보 수정
          </Button>
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
