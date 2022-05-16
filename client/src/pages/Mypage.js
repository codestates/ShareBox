import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from '../components/Modal';
import { Sign } from '../components/Sign';

axios.defaults.withCredentials = true;

export default function Mypage (props) {
  /* const [userId, setUserId] = useState();
  const [email, setEmail] = useState();
  const [mobile], setMobile] = useState();
  const accessTokenRequest = () => {
    axios
      .get("https://localhost:4000/accesstokenrequest", {
        headers: {
          Authorization: `Bearer ${props.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message !== "ok") {
          const message =
            "access token이 만료되어 불러올 수 없습니다. refresh token을 사용해주시기 바랍니다.";
          setEmail(message);
          setMobile(message);
          return;
        }
        const userinfo = res.data.data.userInfo;
        setUserId(userinfo.userId);
        setEmail(userinfo.email);
        setMobile(userinfo.mobile);
      });
  }
  const refreshTokenRequest = () => {
    axios
      .get("https://localhost:4000/refreshtokenrequest", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message !== "ok") {
          const message =
            "refresh token이 만료되어 불러올 수 없습니다. 다시 로그인 해주시기 바랍니다.";
            setEmail(message);
            setMobile(message);
            return;
        }
        const userinfo = res.data.data.userInfo;
        setUserId(userinfo.userId);
        setEmail(userinfo.email);
        setMobile(userinfo.mobile);
        props.issueAccessToken(res.data.data.accessToken);
      });
  } */
  return (
    <div className='background'>
      { props.userinfo && [
        <Sign
          // key={1}
          handleSignin={props.handleSignin}
          handleSignout={props.handleSignout}
        />,
        <Modal className='btn btn-dropout' handleDropout={props.handleDropout} />,
        {/* <div className='btnContainer'>
          <button className='tokenBtn red' onClick={accessTokenRequest}>
            access token request
          </button>
          <button className='tokenBtn navy' onClick={refreshTokenRequest}>
            refresh token request
          </button>
        </div> */}
      ] }
    </div>
  );
}