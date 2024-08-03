import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Avatar from "react-avatar";
import API_KEY from '../constant/youtube';
import { useSelector } from "react-redux"
import { selectTheme } from '../utils/themeSlice';
import { abbreviateNumber } from "js-abbreviation-number";


const VideoCart = ({ item }) => {
    const [ytIcon, setYtIcon] = useState("");
    const currentTheme = useSelector(selectTheme);

    const getYoutubeIcon = async () => {
        try {
            const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${item.snippet.channelId}&key=${API_KEY}`)
            setYtIcon(res.data.items[0].snippet.thumbnails.high.url);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getYoutubeIcon();
    }, [])

    return (
        <div className='w-94 cursor-pointer my-4'>
            <img className='rounded-xl w-full' src={item.snippet.thumbnails.medium.url} alt="ytvideo" />
            <div>
                <div className='flex mt-2'>
                    <Avatar src={ytIcon} size={35} round={true} />
                    <div className='ml-2 w-4/5'>
                        <h1 className={`font-semibold font-sans ${currentTheme === "dark" ? 'bg-black-900 text-white' : 'bg-white text-black'}`}>{item.snippet.title.length > 60 ? item.snippet.title.slice(0, 60) + "..." : item.snippet.title}</h1>
                        <p className='text-sm text-gray-500'>{item.snippet.channelTitle}</p>
                        <div className={`flex text-xs font-semibold truncate overflow-hidden ${currentTheme === "dark" ? 'text-white' : 'text-black'}`}>
                            <span>{`${abbreviateNumber(item.statistics.viewCount, 2)}`} views</span>
                            <span className="flex text-[24px] font-bold leading-none relative top-[-10px] mx-1">
                                .
                            </span>
                            <span className="truncate">{`${abbreviateNumber(item.statistics.likeCount, 2)}`} likes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
}

export default VideoCart