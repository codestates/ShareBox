import React from "react";
import SchIcon from './SearchIcon.png';

export default function SearchIcon () {
  return (
    <button classname='btn btn-search'>
      <img src={SchIcon} alt='search icon' />
    </button>
  );
}