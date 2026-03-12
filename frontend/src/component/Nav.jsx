import React, { useContext, useState } from 'react'
import logo2 from '../assets/logo2.png'
import { IoSearch } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import profile from '../assets/profile.webp'
import { userDatacontext } from '../context/UserContext';
import { authdatacontext } from '../context/Authcontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Nav() {
    // const [activesearch,setactivesearch]=useState(false)
    const {serverURL}=useContext(authdatacontext)
    const { userdata, setuserdata } = useContext(userDatacontext)
    const [showPopup,setshowPopup]=useState(false)
    const navigate=useNavigate()
    const handleSignOut=async()=>{
        try {
            let result= await axios.post(serverURL+"/api/v1/auth/logout")
            setuserdata(null)
            navigate("/login")
        } catch (error) {
            
        }
    }
    return (
        <div className='w-full h-[60px] bg-[white] fixed top-0 left-0 z-[80] shadow-lg flex  justify-between md:justify-around items-center px-2'>
            <div className='flex items-center justify-center gap-4 '>

                <div onClick={()=>navigate("/") }>
                    <img src={logo2} alt="" className='w-[50px] cursor-pointer' />
                </div>
                {/* {!activesearch &&  <div className=" left-3 top-2 lg:hidden md:hidden " onClick={()=>setactivesearch(true)}><IoSearch /></div> } */}

                <form className="relative  ">
                    <div className={`lg:block md:block  absolute left-3 top-2 `}><IoSearch /></div>
                    <input type="text" placeholder='Search' className={`lg:block md:block pl-8 w-[200px] lg:w-[300px] h-[30px] rounded-full border-2 border-gray-400 px-4`} />
                </form>
            </div>

            <div className='flex items-center justify-center gap-4 relative' >
                {showPopup && <div className='w-[280px] min-h-[300px] bg-white shadow-lg absolute top-[70px] left-[100px] rounded-lg flex flex-col items-center p-[20px] gap-[20px]'>
                    <div className='w-[70px] h-[70px] rounded-full overflow-hidden'>
                        <img src={userdata.profileImage||profile} alt="" className='w-full  h-full' />
                    </div>
                    <div className='text-gray-600 font-semibold text-[19px]'>{`${userdata?.firstname} ${userdata?.lastname}`}</div>
                    <button className='w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] cursor-pointer text-[#2dc0ff]' onClick={()=>navigate("/profile")}>view profile</button>
                    <div className='w-full h-[1px] bg-gray-600'></div>
           
            <div className='flex w-full gap-2 items-center justify-start text-gray-600 cursor-pointer' onClick={()=> navigate("/Network")}><FaUserFriends className='w-[23px] h-[23px] text-gray-600' />
                        <div>My Network</div>
                    </div>
                    <button className='w-[100%] h-[40px] rounded-full border-2 border-red-400 cursor-pointer text-red-400' onClick={handleSignOut}>Sign Out</button>


                </div> }
                
                <div className='lg:flex flex-col items-center justify-center text-gray-600 hidden cursor-pointer' onClick={()=>navigate("/")}>< IoHomeSharp className='w-[23px] h-[23px] text-gray-600 ' />
                    <div>Home</div>
                </div>
                <div className='lg:flex flex-col items-center justify-center text-gray-600 hidden cursor-pointer' onClick={()=> navigate("/Network")}><FaUserFriends className='w-[23px] h-[23px] text-gray-600' />
                    <div>My Network</div>
                </div>
                <div className='flex flex-col items-center justify-center text-gray-600 cursor-pointer' ><IoIosNotifications className=' w-[23px] h-[23px] text-gray-600' />
                    <div className='md:block hidden '>Notifications</div>
                </div>
                <div className='w-[50px] h-[50px] rounded-full overflow-hidden '>
                    <img src={userdata.profileImage||profile} alt="" className='w-full  h-full cursor-pointer'onClick={()=>setshowPopup(prev=>!prev)} />
                </div>
            </div>

        </div>
    )
}

export default Nav
