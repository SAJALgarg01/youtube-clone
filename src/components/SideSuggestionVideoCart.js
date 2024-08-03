/* eslint-disable react/prop-types */
import { abbreviateNumber } from "js-abbreviation-number";
import { useEffect, useState } from 'react';
import API_KEY from '../constant/youtube';
import axios from 'axios';
import {useSelector} from "react-redux";
import {selectTheme } from '../utils/themeSlice';

// import VideoLength from "../shared/VideoLength";

const SideSuggestionVideoCart = ({ item }) => {
  const [views, setViews] = useState("");
  const [likes, setLikes] = useState("");
  const currentTheme = useSelector(selectTheme);

  const getYoutubeStatistics = async () => {
    try {
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${item.id.videoId}&key=${API_KEY}`)
      // console.log(res);
      setViews(res.data.items[0].statistics.viewCount);
      setLikes(res.data.items[0].statistics.likeCount);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getYoutubeStatistics();
  }, []);

  return (
    // <Link to={`/video/${video?.videoId}`}>
      <div className={`mb-4 md:ml-4 margin0-768 flex flex-col md:flex-row items-start ${currentTheme === "dark"?'lg:hover:bg-white/[0.1]':'lg:hover:bg-black/[0.1]'}`}>
        <div className="relative md:h-24 lg:h-20 xl:h-24 w-full md:w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={item.snippet.thumbnails.medium.url}
          />
          {/* {video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />} */}
        </div>
        <div className={`flex flex-col ml-3 overflow-hidden ${currentTheme === "dark"?'text-white':'text-black'} mobilewidth100`} style={{fontSize:"1.2rem"}}>
          <span className="text-md lg:text-xs xl:text-sm font-semibold line-clamp-2">
            {item.snippet.title}
          </span>
          <span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 flex items-center">
            {item.snippet.channelTitle}
            {/* {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
              <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] lg:text-[10px] xl:text-[12px] ml-1" />
            )} */}
          </span>
          <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold truncate overflow-hidden">
            <span>{`${abbreviateNumber(views, 2)}`} views</span>
            <span className="flex text-[24px] leading-none font-bold relative top-[-10px] mx-1">
              .
            </span>
            <span className="truncate">{`${abbreviateNumber(likes, 2)}`} likes</span>
          </div>
        </div>
      </div>
    // </Link>
  );
};

export default SideSuggestionVideoCart;