import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header1 from '../components/Header1';
import Subheading from '../components/Subheading';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display : flex ;
  height: 96vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom,rgba(241 212 202) 80%,white);
  display: inline-block;
  text-align: center;
  
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
const Caution = styled.div`
  color: red;
`

/* !회원가입 > 응답의 status가 409인 경우 중복 된 아이디임이 팝업
! 회원가입을 위한 input의 갯수는 총 5개 + 지역은 select 태그로 구현
1.아이디 2.비밀번호 3. 비밀번호 확인 4.지역 5.이메일 6.휴대폰 번호
입력의 형태는 모두 input을 가지고 있을 것 
유효성 검사가 필요하다면, 유효한 경우에만 회원가입 버튼을 활성화 시킬 수 있을것 (상태값을 주는점)
*/

const countrys = ['지역 선택','강남구','강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구']

// 지역변수 입력에 필요한 구 정보를 배열로 만들어두고, map 함수를 통해서 select 태그의 내부에 넣어주기

function Signup() {
  const navigate = useNavigate();
    
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [mobile, setMobile] = useState('')
  
  
  const [userIdMessage, setUserIdMessage] = useState('')
  const [passwordMessage, setPassWordMessage] = useState('')
  const [passwordMessage2, setPassWordMessage2] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [mobileMessage, setMobileMessage] = useState('')
  const [countryMessage, setcountryMessage] = useState('')
  
  
  const [isUserId, setIsUserId] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isPassword2, setIsPassword2] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isCountry, setIsCountry] = useState(false)
  
  
  
  const handleSignup = () => {
  
    axios.post ('http://localhost:4000/signup',{userId,password, email, mobile, country})
      .then((res) => console.log(res))
      .then(navigate("/"))
      .catch((e) => console.log(e))
  }
  
  const onUserIdChange = (e) => {
    const value = e.target.value
    setUserId(value)
    if (value.length < 4) {
      setUserIdMessage('Id는 4글자 이상이여야 합니다.')
      setIsUserId(false)
    } else  if (value.length > 10){
      setUserIdMessage('ID는 10글자를 초과 할 수 없습니다.')
      setIsUserId(false)
    } else {
      setUserIdMessage('')
      setIsUserId(true)
    }
  }
  
  const onPasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
  
    if (value.length < 4) {
      setPassWordMessage('비밀번호는 4글자 이상이여야 합니다.')
      setIsPassword(false)
    } else {
      setPassWordMessage('')
      setIsPassword(true)
    }
  }
  
  const onPassword2Change = (e) => {
    const value = e.target.value
      setPassword2(value)
    }
  
  const onEmailChange = (e) => {
    const value = e.target.value
    const emailRegex = 	/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    setEmail(value)
      if (!emailRegex.test(value)) {
        setEmailMessage('올바르지 못 한 이메일 형식입니다.')
        setIsEmail(false)
    } else {
        setEmailMessage('')
        setIsEmail(true)
    }
  }
  
  const onMobileChange = (e) => {
    const value = e.target.value
    setMobile(value)

    if (value.includes('-')){
      setIsMobile(false)
      setMobileMessage('하이픈(-)은  제외하고 입력해주세요')
    } else if (value.length > 12 || value.length < 9){
      setIsMobile(false)
      setMobileMessage('올바르지 못 한 번호입니다.')
    } else {
      setMobileMessage("");
      setIsMobile(true);
    }
  };
  
  const oncountrySelect = (e) => {
    const value = e.target.value
      setCountry(value);
        
      if (value === '지역 선택') {
        setcountryMessage('지역을 선택해주세요')
        setIsCountry(false)
        setCountry('')
    } else {
        setcountryMessage('')
        setIsCountry(true)
    }
  };
  


  
    return ( 
      <Wrapper>
        <Header1 />
        {/* <Title /> */}
       
      <form onSubmit={(e) => 
        {e.preventDefault()
          if(password !== password2) {
            setPassWordMessage2('비밀번호가 일치하지 않습니다.')
          }}}>
           <Subheading body='회 원 가 입' />
        <div>
          <Input 
            type="text"
            placeholder='아이디를 입력해주세요'
            onChange={onUserIdChange} 
            maxLength = {11}
            required />
            {isUserId ? null : <Caution>{userIdMessage}</Caution>}
          </div>
        
        <div>
          <Input
            type='password'
            placeholder='비밀번호를 입력해주세요'
            onChange={onPasswordChange}
            value={password}
            maxLength = {15}
            required />
            {isPassword ? null : <Caution>{passwordMessage}</Caution>}
        </div>
          
        <div>
          <Input
            type='password'
            placeholder='비밀번호를 다시 입력해주세요'
            onChange={onPassword2Change}
            value={password2}
            maxLength = {15}
            required />
            {isPassword2 ? null : <Caution>{passwordMessage2}</Caution>}
        </div>
          
                  
        <div>
          <Input
            type='email'
            placeholder='이메일을 입력 해주세요'
            onChange={onEmailChange}
            maxLength = {25}
            value={email}
            required />
            {isEmail ? null : <Caution>{emailMessage}</Caution>}
        </div>
        
        
                  
        <div>
          <Input
            type='text'
            placeholder='휴대폰 번호를 입력해주세요'
            onChange={onMobileChange}
            value={mobile}
            required />
            {isMobile ? null : <Caution>{mobileMessage}</Caution>}
        </div>
          
        
        <Input as="select" onChange={oncountrySelect}>
          {countrys.map((country) => <option 
            key={country}
            value={country}
          >{country}</option>)}
          </Input>
          {isCountry ? null : <Caution>{countryMessage}</Caution>}
          
          
          
        <div>
          <Button
            onClick={handleSignup} 
            disabled={isUserId && isEmail && isMobile && isPassword && isCountry ? false : true }
            > 회원가입 
          </Button>
        </div>
          
      </form>
      </Wrapper>
      )
  }
  
export default Signup