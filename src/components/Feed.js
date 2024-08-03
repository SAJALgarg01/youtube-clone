import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
import {useSelector } from "react-redux"
import {selectTheme} from '../utils/themeSlice'


const Feed = () => {
  const currentTheme = useSelector(selectTheme);
  return (
    <div className={`ml-5 mr-5 w-[88%] ${currentTheme === "dark"?'bg-black bg-opacity-90':'bg-white'}`}> 
      <ButtonList/>
      <VideoContainer/>
    </div>
  )
}

export default Feed