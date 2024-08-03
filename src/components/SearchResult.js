import React, { useEffect, useState } from 'react'
import axios from "axios";
import API_KEY, { YOUTUBE_VIDEO_API } from '../constant/youtube';
import SearchResultVideoCart from './SearchResultVideoCart';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setSearchVideo} from '../utils/appSlice';



const SearchResult = () => {
    const { searchVideo,searchCategory } = useSelector((store) => store.app);
    console.log(searchCategory);
    const dispatch = useDispatch();
    
    const fetchingYoutubeVideo = async () => {
        try {
            const res = await axios.get(`${YOUTUBE_VIDEO_API}`);
            dispatch(setSearchVideo(res?.data?.items))
        } catch (error) {
            console.log(error);
        }

    }
    const fetchVideoByCategory = async (searchCategory) => {
        try {
            const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchCategory}&type=video&key=${API_KEY}`);
            dispatch(setSearchVideo(res?.data?.items))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (searchCategory === "All") {
            fetchingYoutubeVideo();
        } else {
            fetchVideoByCategory(searchCategory);
        }
    }, [searchCategory]);

    return (
        <div className='grid grid-cols-1 gap-2 p-5'>
            {
                searchVideo.map((item) => {
                    console.log(item);
                    return (
                        <Link to={`/watch?v=${typeof item.id === 'object' ? item.id.videoId : item.id }`} key={typeof item.id === 'object' ? item.id.videoId : searchVideo.id } >
                            <SearchResultVideoCart item={item} />
                        </Link>

                    )
                })
            }

        </div>
    )
}

export default SearchResult;