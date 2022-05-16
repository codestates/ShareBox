import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Btn = styled.button`
`;

export default function Button (props) {
  return (
    <>
      <Btn
        className='btn btn'
        onClick={ props.handleSignup ? props.handleSignup :
        props.signedIn ? <Link to='/mypage' /> : 'else' }
      >
        { props.handleSignup ? '회원가입' :
        props.signedIn ? '내 정보 관리' : 'else' }
      </Btn>
    </>
  );
}