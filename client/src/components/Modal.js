import { useState } from 'react';
import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.4);
  display: grid;
  place-items: center;
`;

export const ModalContainer = styled.div`
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
    border-radius: 10px;
    background-color: #ffffff;
    width: 300px;
    height: 100px;

    > span.close-btn {
      margin-top: 5px;
      cursor: pointer;
    }

    > div.desc {
      margin-top: 25px;
      color: #4000c7;
    }
`;

export const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>
          { props.handleDropout ? '회원탈퇴' :
          /* condition2 ? 'satisfied2' : */ 'else' }
        </ModalBtn>
        {isOpen === true ? <ModalBackdrop onClick={openModalHandler}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <span onClick={openModalHandler} className='close-btn'>&times;</span>
            <div className='desc'>{ props.handleDropout ? '정말로 탈퇴하시겠습니까?' :
              /* condition2 ? 'satisfied2' : */ 'else' }</div>
          </ModalView>
        </ModalBackdrop> : null}
      </ModalContainer>
    </>
  );
};