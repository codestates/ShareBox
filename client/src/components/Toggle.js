import { useState } from 'react';
import styled from 'styled-components';

const ToggleShape = styled.div`
    position: relative;
    /* margin-top: 8rem; */
    /* left: 47%; */
    cursor: pointer;

    > .toggle-space {
        width: 50px;
        height: 24px;
        border-radius: 30px;
        background-color: #8b8b8b;
        transition: all .2s ease;

        &.toggle--checked {
            background-color: #721c24;
        }
    }

    > .toggle-circle {
        position: absolute;
        top: 1px;
        left: 1px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: #fafafa;
        transition: all .25s ease;

        &.toggle--checked {
            left: 27px;
        }
    }
`;

const Desc = styled.div`
  text-align: center;
  /* margin-top: 1rem; */
`;

export const Toggle = () => {
  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    setisOn(!isOn);
  };

  return (
    <>
      <div className='toggle-container'>
        <ToggleShape className='toggle' onClick={toggleHandler}>
          <div className={`toggle-space ${isOn ? 'toggle--checked' : ''}`} />
          <div className={`toggle-circle ${isOn ? 'toggle--checked' : ''}`} />
        </ToggleShape>
        {isOn ? <Desc className='toggle-desc'>완료</Desc> : <Desc className='toggle-desc'>진행 중</Desc>}
      </div>
    </>
  );
};