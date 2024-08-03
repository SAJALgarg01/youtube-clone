import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { useEffect, useState } from 'react';
import API_KEY from '../constant/youtube';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectTheme } from '../utils/themeSlice';

// import { Link } from "react-router-dom";

const SearchResultVideoCart = ({ item }) => {

  const [views, setViews] = useState("");
  const [likes, setLikes] = useState("");
  const [ytIcon, setYtIcon] = useState("");
  const currentTheme = useSelector(selectTheme);

  const getYoutubeStatistics = async () => {
    try {
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${item.id.videoId}&key=${API_KEY}`)
      // console.log(res);
      setViews(res.data.items[0].statistics.viewCount);
      setLikes(res.data.items[0].statistics.likeCount);
      // console.log(views);
      // console.log(likes);
    } catch (error) {
      console.log(error);
    }
  };

  const getYoutubeIcon = async () => {
    try {
      const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${item.snippet.channelId}&key=${API_KEY}`)
      console.log(res);
      setYtIcon(res.data.items[0].snippet.thumbnails.high.url);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getYoutubeStatistics();
    getYoutubeIcon();
  }, []);

  return (

    <div className={`flex flex-col md:flex-row mb-8 md:mb-3 rounded-xl md:p-4 ${currentTheme === "dark" ? 'lg:hover:bg-white/[0.1]' : 'lg:hover:bg-black/[0.1]'}`}>
      <div className="relative flex-shrink-0 h-60 md:h-60 lg:h-60 xl:h-60 w-full md:w-96 lg:w-128 xl:w-160 rounded-xl overflow-hidden">
        <img
          src={item.snippet.thumbnails.medium.url}
          alt="thumbnails"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
        <span className={`text-lg md:text-2xl font-semibold line-clamp-2 ${currentTheme === "dark" ? 'text-white' : 'text-black'}`}>
          {item.snippet.title}
        </span>

        <span className={`empty:hidden text-sm line-clamp-1 md:line-clamp-2 md:pr-24 md:my-4 ${currentTheme === "dark" ? 'text-white' : 'text-black'}`}>
          {item.snippet.channelTitle}
        </span>

        <div className={`flex text-xs font-semibold truncate overflow-hidden ${currentTheme === "dark" ? 'text-white' : 'text-black'}`}>
          <span>{`${abbreviateNumber(views, 2)}`} views</span>
          <span className="flex text-[24px] font-bold leading-none relative top-[-10px] mx-1">
            .
          </span>
          <span className="truncate">{`${abbreviateNumber(likes, 2)}`} likes</span>
        </div>

        <div className="hidden md:flex items-center">
          <div className="flex items-start mr-3">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img
                src={ytIcon}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>





  );
};

export default SearchResultVideoCart;