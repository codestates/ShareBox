import React from 'react';
import axios from 'axios';
import { Modal } from '../components/Modal';

axios.defaults.withCredentials = true;

export default function Mypage (props) {
  return (
    <div>
      {/* { props.userinfo && [ */}
        <button key={1} className='btn btn-signout' onClick={props.handleSignout}>로그아웃</button>,
        <Modal className='btn btn-dropout' handleDropout={props.handleDropout} />
      {/* ] } */}
    </div>
  );
}