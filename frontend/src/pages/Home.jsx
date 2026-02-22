import React from 'react'
import Nav from '../component/Nav'
import profile from '../assets/profile.webp'
import { FiPlus } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";
import {userDatacontext} from '../context/UserContext'
import { HiPencil } from "react-icons/hi2";
import Editprofile from '../component/Editprofile';

function Home() {
const {userdata,setuserdata,edit,setedit}=React.useContext(userDatacontext)

  return (
    <div className='w-full px-[20px] pl-2 min-h-[100vh] bg-[#f0efe7] pt-[80px] flex flex-col md:flex-row lg:flex-row justify-center items-start gap-[20px]'>
      {edit && <Editprofile />}
      <Nav />
      <div className='rounded-lg w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg relative' >
        <div className='w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center cursor-pointer'>
          <img src={userdata.coverImage} alt="" />
          <MdOutlineCameraAlt  className='absolute top-[20px] right-[15px] h-[25px] text-white w-[25px]' onClick={()=>setedit(true)}/>
        </div>
        <div className='w-[70px] h-[70px] rounded-full flex justify-center items-center overflow-hidden absolute top-[50px] left-[35px] cursor-pointer'>
          <img src={userdata.profileImage||profile} alt="" className='w-full  h-full' />
        </div>
        <div className='w-[20px] h-[20px] bg-[#17c1ff] cursor-pointer absolute top-[95px] left-[90px] rounded-full flex justify-center items-center'>
            <FiPlus className='text-white' onClick={()=>setedit(true)} />
        </div>
        <div className='mt-5 p-3'>
        <div className='text-gray-700 font-semibold text-[20px]'>{`${userdata?.firstname} ${userdata?.lastname}`}</div>
        
        <div className='text-gray-500 text-[16px]'>{userdata.headline}</div>
        <div className='text-gray-500 text-[16px]'>{userdata.location}</div>
       
        <button className=' w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] cursor-pointer text-[#2dc0ff] my-[20px] flex justify-center items-center gap-3'onClick={()=>setedit(true)}>Edit profile  <HiPencil /> </button>
        </div>
      </div>
      <div className='w-full lg:w-[50%] min-h-[200px] bg-[white] shadow-lg'>

      </div>
      <div className='w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg'>

      </div>
    </div>
  )
}

export default Home
