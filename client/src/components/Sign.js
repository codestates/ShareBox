import styled from 'styled-components';

export const SignBtn = styled.button`
  /* background-color: white;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
  font-size: 1.3rem;
  padding: 0.5rem;
  margin: 0.4rem 0; */
`;

export const Sign = (props) => {
  return (
    <>
      <SignBtn
        className='btn btn-signout'
        onClick={ props.handleSignin ? props.handleSignin :
        props.handleSignout ? props.handleSignout : 'else' }
      >
        { props.handleSignin ? '로그인' :
        props.handleSignout ? '로그아웃' : 'else' }
      </SignBtn>
    </>
  );
}