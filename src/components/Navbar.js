import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, setSearchSuggestion, setSearchCategory } from "../utils/appSlice";
import { toggleTheme, selectTheme } from '../utils/themeSlice';
import axios from "axios";
import { SEARCH_SUGGESTIONS_API } from "../constant/youtube";

const Navbar = () => {
    const [input, setInput] = useState("");
    const [showSearchBar, setShowSearchBar] = useState(false); // State to control search bar visibility
    const [suggestion, setSuggestion] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { searchSuggestion } = useSelector((store) => store.app);
    const currentTheme = useSelector(selectTheme);

    const handleTheme = () => {
        dispatch(toggleTheme());
    }

    if(currentTheme==='dark'){
      document.getElementsByTagName('body')[0].style.backgroundColor = 'black';
    }else{
      document.getElementsByTagName('body')[0].style.backgroundColor = 'white';
    }

    const searchVideo = () => {
        if (input.length >= 1) {
            dispatch(setSearchCategory(input));
            setInput("");
            navigate("/SearchResult");
        }
    }

    const toggleHandler = () => {
        dispatch(toggleSidebar());
    }

    const showSuggestion = async () => {
        try {
            const res = await axios.get(SEARCH_SUGGESTIONS_API + input);
            dispatch(setSearchSuggestion(res?.data[1]));
        } catch (error) {
            console.log(error);
        }
    }

    const openSuggestion = () => {
        setSuggestion(true);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && input.length >= 1) {
            searchVideo();
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            showSuggestion();
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [input]);

    return (
        <div className={`fixed top-0 left-0 right-0 w-full z-10 ${currentTheme === "dark" ? 'bg-black' : 'bg-white'} py-3 navbarcustomcss`}>
            {/* Container for the entire navbar */}
            <div className={`flex flex-row md:flex-row items-center justify-between max-w-screen-xl px-4 sm:px-6 lg:px-8 relative w-full`}>
                {/* Navbar content for mobile view */}
                {showSearchBar ? (
                    <div className="w-full flex flex-col items-center">
                        <div className="flex relative flex-grow max-w-md lg:max-w-lg w-[90%] ">
                            <input
                                value={input}
                                onKeyDown={handleKeyDown}
                                onFocus={openSuggestion}
                                onChange={(e) => setInput(e.target.value)}
                                type="text"
                                placeholder="Search"
                                className="w-full py-2 px-4 border border-gray-400 rounded-l-full outline-none"
                            />
                            <button
                                onClick={searchVideo}
                                className="py-2 border border-gray-400 rounded-r-full px-4 bg-gray-100 hover:bg-gray-200"
                            >
                                <CiSearch
                                    size="24px"
                                    // className={`${currentTheme === "dark" ? 'fill-white' : 'fill-black'}`}
                                />
                            </button>
                            {suggestion && searchSuggestion.length !== 0 && (
                                <div className="absolute top-full left-0 w-full mt-2 py-2 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                                    <ul>
                                        {searchSuggestion.map((text, idx) => (
                                            <li key={idx} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-md font-medium">
                                                <CiSearch size="24px" />
                                                <span className="px-2">{text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => setShowSearchBar(false)}
                            className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900"
                        >
                            &times; {/* Close icon */}
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Navbar content for desktop and mobile non-search view */}
                        <div className="flex items-center space-x-4 md:space-x-6">
                            <GiHamburgerMenu
                                onClick={toggleHandler}
                                size="24px"
                                className={`cursor-pointer ${currentTheme === "dark" ? 'bg-black fill-white' : 'bg-white fill-black'}`}
                            />
                            <img
                                className="h-6 md:h-7"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/768px-YouTube_Logo_2017.svg.png"
                                alt="yt_logo"
                            />
                        </div>
                        <div className="flex-grow hidden md:flex max-w-md lg:max-w-lg relative">
                            <input
                                value={input}
                                onKeyDown={handleKeyDown}
                                onFocus={openSuggestion}
                                onChange={(e) => setInput(e.target.value)}
                                type="text"
                                placeholder="Search"
                                className="w-full py-2 px-4 border border-gray-400 rounded-l-full outline-none"
                            />
                            <button
                                onClick={searchVideo}
                                className="py-2 border border-gray-400 rounded-r-full px-4 bg-gray-100 hover:bg-gray-200"
                            >
                                <CiSearch
                                    size="24px"
                                    // className={`${currentTheme === "dark" ? 'fill-white' : 'fill-black'}`}
                                />
                            </button>
                            {suggestion && searchSuggestion.length !== 0 && (
                                <div className="absolute top-full left-0 w-full mt-2 py-2 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                                    <ul>
                                        {searchSuggestion.map((text, idx) => (
                                            <li key={idx} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-md font-medium">
                                                <CiSearch size="24px" />
                                                <span className="px-2">{text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center space-x-4 md:space-x-6">
                        <button
                                onClick={() => setShowSearchBar(true)}
                                className="p-2 md:hidden"
                            >
                                <CiSearch
                                    size="24px"
                                    className={`${currentTheme === "dark" ? 'fill-white' : 'fill-black'}`}
                                />
                            </button>
                            <IoIosNotificationsOutline
                                size="24px"
                                className={`${currentTheme === "dark" ? 'fill-white' : 'fill-black'}`}
                            />
                            <button onClick={handleTheme} className="p-2">
                                {currentTheme === "dark" ? (
                                    <MdOutlineLightMode size="24px" className="fill-white" />
                                ) : (
                                    <MdDarkMode size="24px" />
                                )}
                            </button>
                            <Avatar
                                src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                                size={35}
                                round={true}
                            />
                            
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
