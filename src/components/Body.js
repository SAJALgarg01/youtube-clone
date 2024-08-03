import React from 'react';
import Sidebar from './Sidebar';
import Feed from './Feed';
import {useSelector} from "react-redux";
import {selectTheme } from '../utils/themeSlice';
import {Outlet} from 'react-router-dom';
 

const Body = () => {
  const currentTheme = useSelector(selectTheme);
  
  return (
    <div className={`${currentTheme === "dark"?'bg-black':'bg-white'} flex mt-16`}>
        <Sidebar />
        <Outlet/>
      </div>
  )
}

export default Body