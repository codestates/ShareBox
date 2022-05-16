import React from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function Main () {
  return (
    <div className='background'>
      Hello, World!
    </div>
  );
}