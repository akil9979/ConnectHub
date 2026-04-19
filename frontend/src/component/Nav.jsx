import React, { useContext, useEffect, useState } from 'react'
// import logo2 from '../assets/logo2.png'
import { IoSearch } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import profile from '../assets/profile.webp'
import { userDatacontext } from '../context/UserContext';
import { authdatacontext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Nav() {
    // const [activesearch,setactivesearch]=useState(false)
    const { serverURL } = useContext(authdatacontext)
    const { userdata, setuserdata, handleGetProfile } = useContext(userDatacontext)
    const [showPopup, setshowPopup] = useState(false)
    const [searchQuery, setsearchQuery] = useState("")
    const [searchResults, setsearchResults] = useState([])
    const navigate = useNavigate()
    const handleSignOut = async () => {
        try {

            let result = await axios.post(serverURL + "/api/v1/auth/logout")
            setuserdata(null)
            navigate("/login")
        } catch (error) {

        }
    }
    const handleSearch = async () => {
        try {
            const result = await axios.get(serverURL + `/api/v1/user/search?query=${searchQuery}`, { withCredentials: true })
            console.log(result.data)
            setsearchResults(result.data.users)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (searchQuery.trim() !== "") {
            handleSearch()
        } else {
            setsearchResults([])
        }
    }, [searchQuery])

    return (
        <div className='w-full h-16 bg-gray-700/90 backdrop-blur-md border-b border-gray-800 shadow-sm fixed top-0 left-0 z-[80] flex justify-between md:justify-around items-center px-4 transition-all'>
            <div className='flex items-center justify-center gap-6'>

                <div onClick={() => navigate("/")} className='flex items-center gap-2 cursor-pointer'>
                    {/* <img src={logo2} alt="" className='w-[35px]' /> */}
                    <h1 className="text-xl font-bold text-white tracking-tight hover:text-fuchsia-400 transition-colors duration-300">
                        ConnectHub
                    </h1>
                </div>

                {/* {!activesearch &&  <div className=" left-3 top-2 lg:hidden md:hidden " onClick={()=>setactivesearch(true)}><IoSearch /></div> } */}
                {searchResults?.length > 0 && <div className='absolute top-[70px] min-h-[80px] h-[500px] overflow-auto shadow-lg rounded-3xl border border-gray-700 lg:left-[50px] left-4 p-4 w-[calc(100%-32px)] lg:w-[500px] bg-gray-900/95 backdrop-blur-xl flex flex-col gap-2 z-[100]'>
                    {searchResults.map((sea) => (
                        <div onClick={() => handleGetProfile(sea?.username)} className='flex rounded-xl items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer transition-all duration-300' >
                            <div className='w-12 h-12 rounded-full overflow-hidden ring-1 ring-gray-700 flex-shrink-0'>
                                <img src={sea.profileImage || profile} alt="" className='w-full h-full object-cover' />
                            </div>
                            <div className='flex flex-col items-start justify-center min-w-0'>
                                <div className='text-white font-medium text-base truncate w-full'>{`${sea?.firstname} ${sea?.lastname}`}</div>
                                <div className='text-gray-400 text-sm truncate w-full'>{`${sea?.headline} `}</div>
                            </div>

                        </div>
                    ))}
                </div>}

                <div className="relative flex items-center hidden sm:flex">
                    <div className={`absolute left-4 text-gray-400`}><IoSearch className='w-4 h-4' /></div>
                    <input type="text" placeholder='Search...' onChange={(e) => setsearchQuery(e.target.value)} value={searchQuery} className={`pl-11 w-[200px] lg:w-[320px] px-4 py-2 rounded-full border border-gray-700 bg-gray-700 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 hover:bg-gray-700 transition-all duration-300 shadow-sm backdrop-blur-sm`} />

                </div>
            </div>

            <div className='flex items-center justify-center gap-8'>
                {showPopup && <div className='w-[280px] bg-gray-900/95 backdrop-blur-xl shadow-lg border border-gray-700 absolute top-16 right-4 lg:right-8 rounded-3xl flex flex-col items-center p-6 gap-5 z-50'>
                    <div className='w-16 h-16 rounded-full overflow-hidden ring-4 ring-gray-700 shadow-sm'>
                        <img src={userdata.profileImage || profile} alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className='text-white font-bold text-lg text-center leading-tight'>{`${userdata?.firstname} ${userdata?.lastname}`}</div>
                    <button className='w-full h-10 rounded-2xl bg-fuchsia-600 text-white font-medium hover:bg-fuchsia-700 hover:scale-105 transition-all duration-300' onClick={() => handleGetProfile(userdata?.username)}>View Profile</button>
                    <div className='w-full h-[1px] bg-gray-800 my-1'></div>

                    <div className='flex w-full gap-3 items-center justify-start text-gray-300 hover:text-fuchsia-400 cursor-pointer transition-all duration-300 rounded-xl p-2 hover:bg-gray-800' onClick={() => navigate("/Network")}>
                        <HiUserGroup className='w-5 h-5' />
                        <div className='font-medium text-sm'>Connections</div>
                    </div>
                    <button className='w-full h-10 mt-1 rounded-2xl bg-gray-800 text-gray-300 font-medium hover:bg-red-900/30 hover:text-red-400 border border-gray-700 transition-all duration-300 hover:shadow-sm' onClick={handleSignOut}>Sign Out</button>

                </div>}

                <div className='lg:flex flex-col items-center justify-center text-white hover:text-fuchsia-400 hover:-translate-y-1 hidden cursor-pointer transition-all duration-300' onClick={() => navigate("/")}>
                    <IoHomeSharp className='w-[22px] h-[22px]' />
                    <div className='text-[11px] font-medium mt-1'>Home</div>
                </div>
                <div className='lg:flex flex-col items-center justify-center text-white hover:text-fuchsia-400 hover:-translate-y-1 hidden cursor-pointer transition-all duration-300' onClick={() => navigate("/Network")}>
                    <HiUserGroup className='w-[22px] h-[22px]' />
                    <div className='text-[11px] font-medium mt-1'>Network</div>
                </div>
                <div className='flex flex-col items-center justify-center text-white hover:text-fuchsia-400 hover:-translate-y-1 cursor-pointer transition-all duration-300' onClick={() => navigate("/Notification")} >
                    <IoIosNotifications className='w-[24px] h-[24px]' />
                    <div className='text-[11px] font-medium mt-1 md:block hidden'>Notifications</div>
                </div>
                <div className='w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-700 cursor-pointer hover:ring-fuchsia-500 hover:scale-105 transition-all duration-300'>
                    <img src={userdata.profileImage || profile} alt="" className='w-full h-full object-cover' onClick={() => setshowPopup(prev => !prev)} />
                </div>
            </div>

        </div>
    )
}

export default Nav
