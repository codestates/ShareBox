import { useState } from "react";
import styled from "styled-components";

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export const ModalContainer = styled.div`
  /* height: 15rem; */
  text-align: center;
  /* margin: 120px auto; */
`;

export const ModalBtn = styled.button`
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

export const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
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
    /* color: #4000c7; */
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
        <ModalBtn onClick={openModalHandler} />
        {isOpen === true ? (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <div className="desc" />                
              <div>
                <button>
                  네
                </button>,
                <button>
                  아니오
                </button>
              </div>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};
