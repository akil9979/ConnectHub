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
        <div className='w-full h-[60px] bg-[#18181B]  fixed top-0 left-0 z-[80] shadow-lg flex  justify-between md:justify-around items-center px-2'>
            <div className='flex items-center justify-center gap-4 '>

                <div onClick={() => navigate("/")} className='flex items-center gap-2  cursor-pointer '>
                    {/* <img src={logo2} alt="" className='w-[35px]' /> */}
                    <h1 className="text-xl font-bold text-[#FAFAFA] ">
                        ConnectHub
                    </h1>
                </div>

                {/* {!activesearch &&  <div className=" left-3 top-2 lg:hidden md:hidden " onClick={()=>setactivesearch(true)}><IoSearch /></div> } */}
                {searchResults?.length > 0 && <div className='absolute top-[80px] min-h-[80px] h-[500px] overflow-auto shadow-lg lg:left-[50px] left-[0px] p-[20px] w-[100%] lg:w-[500px] bg-[#18181B] flex flex-col gap-[20px]'>
                    {searchResults.map((sea) => (
                        <div onClick={() => handleGetProfile(sea?.username)} className='flex rounded-lg items-center gap-[10px] border-b-2 p-[10px] border-b-gray-300 hover:bg-gray-700 cursor-pointer' >
                            <div className='w-[70px] h-[70px] rounded-full overflow-hidden'>
                                <img src={sea.profileImage || profile} alt="" className='w-full  h-full' />
                            </div>
                            <div className='flex flex-col items-start justify-center'>
                                <div className='text-[#FAFAFA] font-semibold text-[19px]'>{`${sea?.firstname} ${sea?.lastname}`}</div>
                                <div className='text-[#FAFAFA] font-semibold text-[15px]'>{`${sea?.headline} `}</div>
                            </div>

                        </div>
                    ))}
                </div>}

                <div className="relative flex ">
                    <div className={`lg:block md:block  absolute left-3 top-2 text-[#FAFAFA] `}><IoSearch /></div>
                    <input type="text" placeholder='Search people, posts, skills...' onChange={(e) => setsearchQuery(e.target.value)} value={searchQuery} className={`lg:block md:block pl-8 w-[200px] lg:w-[300px] h-[30px] rounded-full border-2 border-gray-400 px-4 text-[#FAFAFA] bg-[#18181B] placeholder:text-[#FAFAFA]`} />

                </div>
            </div>

            <div className='flex items-center justify-center gap-4 ' >
                {showPopup && <div className='w-[280px] min-h-[300px] bg-[#18181B] shadow-lg absolute top-[75px] right-[20px] lg:right-[100px] rounded-lg flex flex-col items-center p-[20px] gap-[20px]'>
                    <div className='w-[70px] h-[70px] rounded-full overflow-hidden'>
                        <img src={userdata.profileImage || profile} alt="" className='w-full  h-full' />
                    </div>
                    <div className='text-[#FAFAFA] font-semibold text-[19px]'>{`${userdata?.firstname} ${userdata?.lastname}`}</div>
                    <button className='w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] cursor-pointer text-[#2dc0ff]' onClick={() => handleGetProfile(userdata?.username)}>view profile</button>
                    <div className='w-full h-[1px] bg-gray-600'></div>

                    <div className='flex w-full gap-2 items-center justify-start text-[#FAFAFA] cursor-pointer' onClick={() => navigate("/Network")}><HiUserGroup className='w-[23px] h-[23px] text-[#FAFAFA]' />
                        <div>Connections</div>
                    </div>
                    <button className='w-[100%] h-[40px] rounded-full border-2 border-red-400 cursor-pointer text-red-400' onClick={handleSignOut}>Sign Out</button>


                </div>}

                <div className='lg:flex flex-col items-center justify-center text-[#FAFAFA] hidden cursor-pointer' onClick={() => navigate("/")}>< IoHomeSharp className='w-[23px] h-[23px] text-[#FAFAFA] ' />
                    <div>Home</div>
                </div>
                <div className='lg:flex flex-col items-center justify-center text-[#FAFAFA] hidden cursor-pointer' onClick={() => navigate("/Network")}><HiUserGroup className='w-[23px] h-[23px] text-[#FAFAFA]' />
                  <div>Connections</div>  
                </div>
                <div className='flex flex-col items-center justify-center text-[#FAFAFA] cursor-pointer' onClick={() => navigate("/Notification")} ><IoIosNotifications className=' w-[23px] h-[23px] text-[#FAFAFA]' />
                    <div className='md:block hidden '>Notifications</div>
                </div>
                <div className='w-[50px] h-[50px] rounded-full overflow-hidden '>
                    <img src={userdata.profileImage || profile} alt="" className='w-full  h-full cursor-pointer' onClick={() => setshowPopup(prev => !prev)} />
                </div>
            </div>

        </div>
    )
}

export default Nav
