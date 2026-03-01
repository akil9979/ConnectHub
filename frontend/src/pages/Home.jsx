import React, { useContext, useRef, useState } from 'react'
import Nav from '../component/Nav'
import profile from '../assets/profile.webp'
import { FiPlus } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";
import { userDatacontext } from '../context/UserContext'
import { HiPencil } from "react-icons/hi2";
import Editprofile from '../component/Editprofile';
import { RxCross1 } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa6";
import axios from 'axios';
import { authdatacontext } from "../context/Authcontext"
import Post from '../component/Post';

function Home() {
  const { userdata, setuserdata, edit, setedit,postdata,setpostdata } = React.useContext(userDatacontext)
  const [frontendImage, setfrontendImage] = useState("")
  const [backendImage, setbackendImage] = useState("")
  const [description, setdescription] = useState("")
  const [uploadPost, setuploadPost] = useState(false)
  const { serverURL } = useContext(authdatacontext)
  const [posting, setposting] = useState(false)

  const image = useRef()
  const handleImage = (e) => {
    const file = e.target.files[0]
    setbackendImage(file)
    setfrontendImage(URL.createObjectURL(file))
  }
 
  const handleuploadPost = async () => {
    setposting(true)
    try {
      let formData = new FormData()
      formData.append("description", description)
      if (backendImage) {
        formData.append("image", backendImage)
      }
      const result = await axios.post(serverURL + "/api/v1/post/createPost", formData, { withCredentials: true })
      console.log(result);
      setposting(false)
      setuploadPost(false)
    } catch (error) {
      setposting(false)
      console.log(error);

    }
  }
  return (
    <div className='w-full px-[20px] pb-[20px] pl-2 min-h-[100vh] bg-[#f0efe7] pt-[80px] flex flex-col  lg:flex-row justify-center items-center  lg:items-start gap-[20px] relative'>
      {edit && <Editprofile />}
      <Nav />
      <div className='rounded-lg w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg relative' >
        <div className='w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center cursor-pointer'>
          <img src={userdata.coverImage} alt="" />
          <MdOutlineCameraAlt className='absolute top-[20px] right-[15px] h-[25px] text-white w-[25px]' onClick={() => setedit(true)} />
        </div>
        <div className='w-[70px] h-[70px] rounded-full flex justify-center items-center overflow-hidden absolute top-[50px] left-[35px] cursor-pointer'>
          <img src={userdata.profileImage || profile} alt="" className='w-full  h-full' />
        </div>
        <div className='w-[20px] h-[20px] bg-[#17c1ff] cursor-pointer absolute top-[95px] left-[90px] rounded-full flex justify-center items-center'>
          <FiPlus className='text-white' onClick={() => setedit(true)} />
        </div>
        <div className='mt-5 p-3'>
          <div className='text-gray-700 font-semibold text-[20px]'>{`${userdata?.firstname} ${userdata?.lastname}`}</div>

          <div className='text-gray-500 text-[16px]'>{userdata.headline}</div>
          <div className='text-gray-500 text-[16px]'>{userdata.location}</div>

          <button className=' w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] cursor-pointer text-[#2dc0ff] my-[20px] flex justify-center items-center gap-3' onClick={() => setedit(true)}>Edit profile  <HiPencil /> </button>
        </div>
      </div>
      {uploadPost && <div className='w-full h-full z-[100] bg-black  fixed inset-0 opacity-[0.6] '></div>}

      {uploadPost && <div className='w-[90%] max-w-[500px] h-[600px] bg-white shadow-lg rounded-lg fixed z-[200] p-5 flex flex-col gap-[20px] justify-start items-start'>
        <div className='absolute right-[10px] top-3 ' >
          <RxCross1 className='h-[20px] w-[20px] text-gray-800 font-bold cursor-pointer' onClick={() => setuploadPost(false)} />
        </div>
        <div className='flex justify-start items-center gap-[10px] '>
          <div className='w-[70px] h-[70px] rounded-full flex justify-center items-center overflow-hidden  cursor-pointer'>
            <img src={userdata.profileImage || profile} alt="" className='w-full  h-full' />
          </div>
          <div>
            <div className='text-gray-700 font-semibold text-[20px]'>{`${userdata?.firstname} ${userdata?.lastname}`}</div>
          </div>

        </div>
        <textarea className={`w-full ${frontendImage ? "h-[200px]" : "h-[500px]"}  outline-none border-none resize-none text-[19px]`} value={description} onChange={(e) => setdescription(e.target.value)} placeholder='What do you want to talk about ? '></textarea>
        <input type="file" ref={image} hidden onChange={handleImage} />
        <div className={`w-full ${frontendImage ? "h-[300px]" : "h-[0px]"} overflow-hidden flex justify-center items-center`}><img src={frontendImage || null} className='h-full rounded-lg' alt="" /></div>
        <div className='w-full h-[200px] flex flex-col'>
          <div className='border-b-2 border-gray-500 p-[20px] flex justify-start items-center'><FaRegImage onClick={() => image.current.click()} className='h-[24px] w-[24px] text-gray-700 cursor-pointer' /></div>

          <div className='p-5 flex justify-end items-center'>
            <button className='w-[100px] h-[50px] rounded-full bg-[#24b2ff] text-white cursor-pointer ' disabled={posting} onClick={handleuploadPost}> {posting ? "posting.." : "Post"}</button>
          </div>
        </div>
      </div>}


      <div className='w-full lg:w-[50%] min-h-[200px] bg-[#f0efe7] flex flex-col gap-[20px]  '>
        <div className='w-full h-[100px] bg-[white] shadow-lg rounded-lg relative flex justify-center items-center gap-3'>
          <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center overflow-hidden  cursor-pointer'>
            <img src={userdata.profileImage || profile} alt="" className='w-full  h-full' />
          </div>
          <button onClick={() => setuploadPost(true)} className='w-[80%] h-[40%] border-2 boder-gray-600  rounded-full flex justify-start items-center p-3 cursor-pointer hover:bg-gray-200'>start a post</button>
        </div>
          {postdata.map((post,index) => (
            <Post key={index} id={post._id} description={post.description} author={post.author} image={post.image} like={post.likes} comment={post.comments} createdAt={post.createdAt}/>
          ))}
       
      </div>
      <div className='w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg'>

      </div>
    </div>
  )
}

export default Home
