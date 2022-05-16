import React, { useEffect, useState } from 'react';
import Header1 from '../components/Header1';
import Header2 from '../components/Header2';
import CurrentPost from '../components/CurrentPost';
import LoadingIndicator from '../components/LoadingIndicator';
import axios from 'axios';

export default function Item (props) {
  const [record, setRecord] = useState();
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    axios
    .get(`https://localhost:4000/records/:${props.recordsId}`)
    .then(res => res.json())
    .then(data => {
      setRecord(data);
      setIsLoading(false);
    })
    .catch(err => console.log(err));
  }, []);
  return (
    <div className='background'>
      <Header1 />
      <Header2 />
      { isLoading ? <LoadingIndicator /> : <CurrentPost
        record={record}
        recordsId={props.recordsId}
        userinfo={props.userinfo}
        refreshToken={props.refreshToken}
      /> }
    </div>
  );
}