import React from 'react';
import { CiHome } from "react-icons/ci";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdSwitchAccount } from "react-icons/md";
import { GrHistory } from "react-icons/gr";
import { CgPlayList } from "react-icons/cg";
import { BiSolidVideos } from "react-icons/bi";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineFlag } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import {useSelector} from "react-redux";
import {selectTheme } from '../utils/themeSlice';


const Sidebar = () => { 
    const open = useSelector((store)=>store.app.open);
    const currentTheme = useSelector(selectTheme);

    const sidebarItem1 = [
        {
            icons: <CiHome size="24px" className={`${currentTheme === "dark"?'bg-black fill-white':'bg-white fill-black'}`}/>,
            title: "Home"
        },
        {
            icons: <SiYoutubeshorts size="24px" className={`${currentTheme === "dark"?'bg-black fill-white':'bg-white fill-black'}`}/>,
            title: "Short"
        },
        {
            icons: <MdOutlineSubscriptions size="24px" className={`${currentTheme === "dark"?'bg-black fill-white':'bg-white fill-black'}`}/>,
            title: "Subscription"
        },
        
    ];

    const sidebarItem2 = [
        {
            icons: <MdSwitchAccount size="24px" className={`${currentTheme === "dark"?'bg-black fill-white':'bg-white fill-black'}`}/>,
            title: "Your channel"
        },
        {
            icons: <GrHistory size="24px" className={`${currentTheme === "dark"?'bg-black stroke-white':'bg-white fill-black'}`}/>,
            title: "History"
        },
        {
            icons: <CgPlayList size="24px" className={`${currentTheme === "dark"?'bg-black path-stroke-white':'bg-white fill-black'}`}/>,
            title: "Playlists"
        },
        {
            icons: <BiSolidVideos size="24px" className={`${currentTheme === "dark"?'bg-black fill-white':'bg-white fill-black'}`}/>,
            title: "Your videos"
        },
        {
            icons: <MdOutlineWatchLater size="24px" className={`${currentTheme === "dark"?'bg-black fill-white':'bg-white fill-black'}`}/>,
            title: "Watch later"
        },
        {
            icons: <AiOutlineLike size="24px" className={`${currentTheme === "dark"?'bg-black fill-white':'bg-white fill-black'}`}/>,
            title: "Liked videos"
        }
    ];
     
    const sidebarItem3 = [
        {
            icons: <IoSettingsOutline size="24px" className={`${currentTheme === "dark"?'bg-black stroke-white':'bg-white fill-black'}`}/>,
            title: "Settings"
        },
        {
            icons: <MdOutlineFlag size="24px" className={`${currentTheme === "dark"?'bg-black fill-white':'bg-white fill-black'}`}/>,
            title: "Report history"
        },
        {
            icons: <IoIosHelpCircleOutline size="24px" className={`${currentTheme === "dark"?'bg-black fill-white':'bg-white fill-black'}`}/>,
            title: "Help"
        },
        {
            icons: <MdOutlineFeedback size="24px" className={`${currentTheme === "dark"?'bg-black fill-white':'bg-white fill-black'}`}/>,
            title: "Send feedback"
        },
    ];
    return (
        <div className={`left-0 ${open? "w-[100%] fixed bottom-0 top60px" : "w-[0%] md:w-[8%] relative"} overflow-y-hidden overflow-x-hidden ${currentTheme === "dark"?'bg-black':'bg-white'}`} style={{background:"#00000080",zIndex:"9"}}>
            <div className={`overflow-x-hidden h-[100%] ${open? "w-[60%] md:w-[20%] overflow-y-scroll" : "w-[100%] md:pl-4"} ${currentTheme === "dark"?'bg-black':'bg-white'}`} >
            {
                sidebarItem1.map((item, index) => {
                    return (
                        <div key={index} className={`flex pl-2 my-4 ml-2 cursor-pointer `}>
                            {item.icons}
                            <span className={`ml-5 ${open ? "": 'hidden'} ${currentTheme === "dark"?'text-white':'text-black'}`}>{item.title}</span>
                        </div>
                    )
                })
            }
            <hr className="w-full my-5 border-gray-300" />
        
            {
                sidebarItem2.map((item, index) => {
                    return (
                        <div key={index} className='flex pl-2 my-4 ml-2 cursor-pointer'>
                            {item.icons}
                            <span className={`ml-5 ${open ? "": 'hidden'} ${currentTheme === "dark"?'text-white':'text-black'}`}>{item.title}</span>
                        </div>
                    )
                })
            }
            <hr className="w-full my-5 border-gray-300" />
            
            {
                sidebarItem3.map((item, index) => {
                    return (
                        <div key={index} className='flex pl-2 my-4 ml-2 cursor-pointer'>
                            {item.icons}
                            <span className={`ml-5 ${open ? "": 'hidden'} ${currentTheme === "dark"?'text-white':'text-black'}`}>{item.title}</span>
                        </div>
                    )
                })
            }
            <hr className="w-full my-5 border-gray-300" />
            <p className={` truncate ${currentTheme === "dark"?'text-white':'text-black'} pl-3`}>@copyright of mr sajal</p>
        </div>
        </div>


    )
}

export default Sidebar