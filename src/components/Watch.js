import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import API_KEY from '../constant/youtube';
import axios from "axios";
import { Link } from 'react-router-dom';
import Avatar from "react-avatar";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { GoDownload } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";
import LiveChat from './LiveChat';
import SideSuggestionVideoCart from './SideSuggestionVideoCart';
import { useDispatch } from "react-redux";
import { setMessage } from "../utils/chatSlice";
import { useSelector } from "react-redux"
import { selectTheme } from '../utils/themeSlice';

const Watch = () => {
    const [input, setInput] = useState("");
    const [relatedVideos, setRelatedVideos] = useState([]);
    // const relatedVideos = [];

    const [singleVideo, setSingleVideo] = useState(null);
    const [ytIcon, setYtIcon] = useState("");
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('v');
    const currentTheme = useSelector(selectTheme);

    const dispatch = useDispatch();

    const getSingleVideo = async () => {
        try {
            const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`);
            setSingleVideo(res?.data?.items[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const sendMessage = () => {
        dispatch(setMessage({ name: "Pragma", message: input }));
        setInput("");
    }

    const getYoutubeIcon = async () =>{
        try {
            const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${singleVideo?.snippet?.channelId}&key=${API_KEY}`)
            setYtIcon(res.data.items[0].snippet.thumbnails.high.url);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getYoutubeIcon();
    },[singleVideo])

    const getRelatedVideos = async () => {

        try {
            const temp = singleVideo?.snippet?.title;
            console.log("look");
            console.log(singleVideo);
            const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${temp}&type=video&key=${API_KEY}`);
            console.log(res);
            setRelatedVideos(res?.data?.items);
            // relatedVideos.push(res?.data?.items);
        } catch (error) {
            console.log(error);
            console.log("helloerror");
        }
    }

    // useEffect(() => {
    //     getSingleVideo();
    //     getRelatedVideos();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            await getSingleVideo();
            // getRelatedVideos();
        };

        fetchData();
    }, [videoId]);

    useEffect(() => {
        if (singleVideo) {
            getRelatedVideos();
        }
    }, [singleVideo]);

    // getRelatedVideos();

    return (
        <div style={{width:"100%"}}>
            <div className='flex ml-4 w-[98%] mt-2'>
                <div className='flex flex-row mobileflexcolumn w-[96%]'>
                    <div className='mobilewidth100' style={{width:"70%"}}>
                        <div style={{ display: "flex", flexDirection: "column", position: "sticky", top: "90px" }}>
                            <iframe
                                width="720"
                                height="440"
                                src={`https://www.youtube.com/embed/${videoId}?&autoplay=0`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="rounded-xl" style={{width:"100%",height:"40%",aspectRatio:"16/9"}}>
                                
                            </iframe>
                            <h1 className={`font-bold mt-2 text-lg ${currentTheme === "dark"?'text-white':'text-black'}`}>{singleVideo?.snippet?.title.length > 70 ? singleVideo?.snippet?.title.slice(0, 70) + '...' : singleVideo?.snippet?.title}</h1>
                            <div className='flex items-center justify-between mobileflexcolumn'>
                                <div className='flex items-center justify-between w-[35%] mobilewidth100'>
                                    <div className={`flex ${currentTheme === "dark"?'text-white':'text-black'}`} >
                                        <Avatar className='avatarcss' src={ytIcon} size={35} round={true} />
                                        <h1 className='font-bold ml-2 truncate pt-1'>{singleVideo?.snippet?.channelTitle.length > 15 ? singleVideo?.snippet?.channelTitle.slice(0, 15) + '... ' : singleVideo?.snippet?.channelTitle+ "..."}</h1>
                                    </div>
                                    <button className={`px-4 py-1 font-medium text-white rounded-full ${currentTheme === "dark"?'bg-white/[0.3]':'bg-black/[0.9]'}`}>Subscribe</button>
                                </div>
                                <div className='flex items-center w-[70%] mt-2 mobilewidth100' style={{ justifyContent: "end",gap:"2%"}}>
                                    <div className='flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full'>
                                        <AiOutlineLike size="20px" className='mr-5' />
                                        <AiOutlineDislike size="20px" />
                                    </div>
                                    <div className='flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full'>
                                        <PiShareFatLight size="20px" className='mr-2' />
                                        <span>Share</span>
                                    </div>
                                    <div className='flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full'>
                                        <GoDownload />
                                        <span>Download</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mobilewidth100' style={{width:"30%"}}>

                        {/* <div className='w-[100%] border border-gray-300 ml-8 rounded-lg h-fit p-4'>
                        <div className='flex justify-between items-center'>
                            <h1>Top Chat</h1>
                            <BsThreeDotsVertical />
                        </div>
                        <div className='overflow-y-auto h-[28rem] flex flex-col-reverse'>
                            <LiveChat />
                        </div>

                        <div className='flex items-center justify-between border-t p-2'>
                            <div className='flex items-center w-[90%]'>
                                <div>
                                    <Avatar src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw" size={35} round={true} />
                                </div>
                                <input value={input} onChange={(e) => setInput(e.target.value)} className='border-b border-gray-300 outline-none ml-2' type="text" placeholder='Send message...' />
                                <div className='bg-gray-200 cursor-pointer p-2 rounded-full'>
                                    <LuSendHorizonal onClick={sendMessage} />
                                </div>
                            </div>
                        </div>
                    </div> */}

                        <div className="myclassformobile flex flex-col mt-0.3 py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px] mycls ">
                            {
                                relatedVideos.map((item) => {
                                    // console.log(item);
                                    return (
                                        <Link to={`/watch?v=${typeof item.id === 'object' ? item.id.videoId : item.id}`} key={typeof item.id === 'object' ? item.id.videoId : relatedVideos.id} >
                                            <SideSuggestionVideoCart item={item} />
                                        </Link>

                                    )
                                })}
                        </div>


                    </div>

                </div>

            </div>
            {/* <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px] mycls">
                {
                    relatedVideos.map((item) => {
                        // console.log(item);
                        return (
                            <Link to={`/watch?v=${typeof item.id === 'object' ? item.id.videoId : item.id}`} key={typeof item.id === 'object' ? item.id.videoId : relatedVideos.id} >
                                <SideSuggestionVideoCart item={item} />
                            </Link>

                        )
                    })}
            </div> */}
        </div>
    )
}

export default Watch