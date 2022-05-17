import { useState } from 'react'
import axios from 'axios'
import history from  'react'
// import Input from '../components/input'
import styled from 'styled-components'
import Title from '../components/Title'
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



// !회원가입 > 응답의 status가 409인 경우 중복 된 아이디임이 팝업

/*
! 회원가입을 위한 input의 갯수는 총 5개 + 지역은 select 태그로 구현
1.아이디 2.비밀번호 3. 비밀번호 확인 4.지역 5.이메일 6.휴대폰 번호
입력의 형태는 모두 input을 가지고 있을 것 
유효성 검사가 필요하다면, 유효한 경우에만 회원가입 버튼을 활성화 시킬 수 있을것 (상태값을 주는점)
*/

const regions = ['지역 선택','강남구','강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구']

// 지역변수 입력에 필요한 구 정보를 배열로 만들어두고, map 함수를 통해서 select 태그의 내부에 넣어주기


function Signup() {
  
const [userId, setUserId] = useState('')
const [password, setPassword] = useState('')
const [password2, setPassword2] = useState('')
const [email, setEmail] = useState('')
const [region, setRegion] = useState('')
const [mobile, setMobile] = useState('')


const [userIdMessage, setUserIdMessage] = useState('')
const [passwordMessage, setPassWordMessage] = useState('')
const [passwordMessage2, setPassWordMessage2] = useState('')
const [emailMessage, setEmailMessage] = useState('')
const [mobileMessage, setMobileMessage] = useState('')
const [regionMessage, setRegionMessage] = useState('')


const [isUserId, setIsUserId] = useState(false)
const [isPassword, setIsPassword] = useState(false)
const [isPassword2, setIsPassword2] = useState(false)
const [isEmail, setIsEmail] = useState(false)
const [isMobile, setIsMobile] = useState(false)
const [isRegion, setIsRegion] = useState(false)


// ! isUser 등 각 항목의 유효성 검사하는 패턴들이 모두 통과 된다면 
// ! isAvailable의 값을 true로 설정해줘서 post를 하면 좋을듯 

const handleSignup = () => {
// 회원가입 버튼을 onClick 이벤트로 진행시 작동하는 함수 

  if( !userId || !password|| !password2 || !region ||!email ||!mobile) {
    console.log('돌아가')

  } else {

console.log(userId)
console.log(password)
console.log(password2)
console.log(region)
console.log(email)
console.log(mobile)

  
    

// 유효한 상태의 값을 가진 경우 ? 
// 서버로 name을 포함한 개인 정보를 전달해주고 
// history를 통해 메인 페이지로 이동한다. 
    axios.post ('https://localhost:4000/signup', {userId,password,email,region,mobile})
    .then((res) =>{
      console.log(res)
    })
    .then(history.push("/"))
    .catch((e) => console.log(e))
  }
// try & catch 구문 찾아보자. 
}

function onUserIdChange(e) {
  const value = e.target.value
  const idRegex = /[A-Za-z][A-Za-z0-9]/
  setUserId(value)

  if (!idRegex.test(value)){
    setUserIdMessage('Id는 영문과 숫자만 가능합니다.')
    setIsUserId(false)
  } else if (value.length < 4) {
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

function onPasswordChange(e) {
  const value = e.target.value
  setPassword(value)
  console.log(`비밀번호1:${value}`)

  if (value.length < 4) {
    setPassWordMessage('비밀번호는 4글자 이상이여야 합니다.')
    setIsPassword(false)
  } else {
    setPassWordMessage('')
    setIsPassword(true)
  }
}

function onPassword2Change(e) {
  const value = e.target.value
    setPassword2(value)
    console.log(`비밀번호2:${value}`)
    // if (password !== password2) {
    //   setPassWordMessage2('비밀번호가 일치하지 않습니다.')
    //   setIsPassword2(false)
      
    // } else {
    //   setPassWordMessage2('')
    //   setIsPassword2(true)
    // }
  }

function onEmailChange(e) {
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

function onMobileChange(e) {
  const value = e.target.value
  const mobileRegex = /[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}/
  setMobile(value)
  
    if(!mobileRegex.test(value)) {
      setMobileMessage('올바르지 못 한 전화번호 형식입니다.')
      setIsMobile(false)
    } else {
      setMobileMessage('')
      setIsMobile(true)
    }
  }

function onRegionSelect(e) {
  const value = e.target.value
    setRegion(value);
      
    if (value === '지역 선택') {
      setRegionMessage('지역을 선택해주세요')
      setIsRegion(false)
      setRegion('')
  } else {
      setRegionMessage('')
      setIsRegion(true)
  }
};


  return ( 
    <Wrapper>
      <Title />
      <Subheading body='회원가입' />
    <form onSubmit={(e) => 
      {e.preventDefault()
        if(password !== password2) {
          setPassWordMessage2('비밀번호가 일치하지 않습니다.')
        }}}>

      <div>
        <Input 
          type="text"
          placeholder='아이디를 입력해주세요'
          onChange={onUserIdChange} 
          maxLength = {11}
          required />
          {isUserId ? null : <div>{userIdMessage}</div>}
        </div>
      
      <div>
        <Input
          type='password'
          placeholder='비밀번호를 입력해주세요'
          onChange={onPasswordChange}
          value={password}
          maxLength = {15}
          required />
          {isPassword ? null : <div>{passwordMessage}</div>}
      </div>
        
      <div>
        <Input
          type='password'
          placeholder='비밀번호를 다시 입력해주세요'
          onChange={onPassword2Change}
          value={password2}
          maxLength = {15}
          required />
          {isPassword2 ? null : <div>{passwordMessage2}</div>}
      </div>
        
                
      <div>
        <Input
          type='email'
          placeholder='이메일을 입력 해주세요'
          onChange={onEmailChange}
          value={email}
          required />
          {isEmail ? null : <div>{emailMessage}</div>}
      </div>


                
      <div>
        <Input
          type='text'
          placeholder='휴대폰 번호를 입력해주세요'
          onChange={onMobileChange}
          value={mobile}
          required />
          {isMobile ? null : <div>{mobileMessage}</div>}
      </div>
        

      <Input as="select" onChange={onRegionSelect}>
        {regions.map((region) => <option 
          key={region}
          value={region}
         >{region}</option>)}
        </Input>
        {isRegion ? null : <div>{regionMessage}</div>}
        


      <div>
        <Input as="button" 
          onClick={handleSignup} 
          disabled={!userId || !password|| !password2 || !region ||!email ||!mobile ? true : false}
          //  disabled={isUserId && isEmail && isMobile && isPassword && isPassword2 && isRegion ? false : true}
          > 회원가입 
        </Input>
      </div>

    </form>
    </Wrapper>
    )
  
}

export default Signup