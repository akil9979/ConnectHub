import React, { useContext, useEffect, useRef, useState } from 'react'
import Nav from '../component/Nav'
import profile from '../assets/profile.webp'
import { useNavigate } from 'react-router-dom';

import { FiPlus, FiFileText } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";
import { userDatacontext } from '../context/UserContext'
import { HiPencil } from "react-icons/hi2";
import Editprofile from '../component/Editprofile';
import { RxCross1 } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa6";
import axios from 'axios';
import { authdatacontext } from "../context/AuthContext"
import Post from '../component/Post';

function Home() {

  const { userdata, setuserdata, edit, setedit, postdata, setpostdata, handleGetProfile } = React.useContext(userDatacontext)

  const [frontendImage, setfrontendImage] = useState("")
  const [backendImage, setbackendImage] = useState("")
  const [description, setdescription] = useState("")
  const [uploadPost, setuploadPost] = useState(false)

  const { serverURL } = useContext(authdatacontext)

  const [posting, setposting] = useState(false)
  const [suggestedUsers, setsuggestedUsers] = useState([])


  const navigate = useNavigate()

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

      setposting(false)
      setuploadPost(false)

    } catch (error) {

      setposting(false)
      console.log(error);

    }

  }

  const handleSuggestion = async () => {

    try {

      const result = await axios.get(serverURL + "/api/v1/user/suggestedUsers", { withCredentials: true })

      setsuggestedUsers(result.data.getSuggestedUsers)

      console.log(result.data.getSuggestedUsers)

    } catch (error) {

      console.log(error);

    }

  }



  useEffect(() => {
    handleSuggestion()
  }, [])


  return (

    <div className='w-full min-h-[100vh] flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 relative pt-24 px-4 pb-20 sm:px-10 lg:px-20 bg-transparent'>

      {edit && <Editprofile />}

      <Nav />

      {uploadPost && <div className='w-full h-full z-[100] bg-slate-900/40 backdrop-blur-sm fixed inset-0'></div>}

      {uploadPost &&

        <div className='w-[90%] h-[90%] max-w-[550px] top-[10%] bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60 rounded-3xl fixed z-[200] p-6 flex flex-col gap-4 justify-start items-start animate-in fade-in zoom-in-95 duration-200'>

          <div className='absolute right-4 top-4'>

            <RxCross1 className='h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200' onClick={() => setuploadPost(false)} />

          </div>

          <div className='flex justify-start items-center gap-3'>

            <div className='w-[70px] h-[70px] rounded-full flex justify-center items-center overflow-hidden cursor-pointer ring-2 ring-gray-100'>

              <img src={userdata.profileImage || profile} alt="" className='w-full h-full object-cover' />

            </div>

            <div>

              <div className='text-gray-900 font-semibold text-lg'>{`${userdata?.firstname} ${userdata?.lastname}`}</div>

            </div>

          </div>

          <textarea

            className={`w-full ${frontendImage ? "h-[200px]" : "h-[500px]"} outline-none border-none resize-none text-base text-gray-800 placeholder:text-gray-400`}

            value={description}

            onChange={(e) => setdescription(e.target.value)}

            placeholder='What do you want to talk about ? '

          ></textarea>

          <input type="file" ref={image} hidden onChange={handleImage} />

          <div className={`w-full ${frontendImage ? "h-[300px]" : "h-[0px]"} overflow-hidden flex justify-center items-center`}>

            <img src={frontendImage || null} className='h-full rounded-xl' alt="" />

          </div>

          <div className='w-full h-[200px] flex flex-col'>

            <div className='border-b border-gray-200 p-4 flex justify-start items-center'>

              <FaRegImage onClick={() => image.current.click()} className='h-6 w-6 text-brand hover:text-accent cursor-pointer transition-colors duration-200' />

            </div>

            <div className='p-4 flex justify-end items-center'>

              <button className='min-w-[100px] h-12 px-6 rounded-2xl bg-brand text-white shadow-md hover:bg-brand-dark hover:shadow-lg cursor-pointer transition-all duration-200 font-medium disabled:opacity-60' disabled={posting} onClick={handleuploadPost}>

                {posting ? "Posting..." : "Post"}

              </button>

            </div>

          </div>

        </div>

      }


      {/* FEED COLUMN */}

      <div className='w-full lg:w-[50%] min-h-[200px] bg-transparent flex flex-col gap-6'>

        {/* PROFILE CARD */}

        <div className='rounded-3xl w-full bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 relative overflow-hidden transition-all hover:bg-white/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] duration-300'>

          <div className='w-full h-[120px] bg-gradient-to-r from-brand to-accent rounded-t-3xl overflow-hidden flex items-center justify-center cursor-pointer relative'>

            <img src={userdata.coverImage} alt="" className='w-full h-full object-cover opacity-90' />

            <MdOutlineCameraAlt className='absolute top-5 right-4 h-6 w-6 text-white drop-shadow-md' onClick={() => setedit(true)} />

          </div>

          <div className='w-[80px] h-[80px] rounded-full flex justify-center items-center overflow-hidden absolute top-[80px] left-5 cursor-pointer ring-4 ring-white/80 bg-white shadow-sm'>

            <img src={userdata.profileImage || profile} alt="" className='w-full h-full object-cover' />

          </div>

          <div className='w-7 h-7 bg-brand cursor-pointer absolute top-[135px] left-[75px] rounded-full flex justify-center items-center shadow-md ring-4 ring-white/80 hover:bg-brand-dark transition-colors duration-200'>

            <FiPlus className='text-white w-4 h-4' onClick={() => setedit(true)} />

          </div>

          <div className='mt-16 p-6 pt-0 flex flex-col'>

            <div className='text-gray-900 font-bold text-xl'>{`${userdata?.firstname} ${userdata?.lastname}`}</div>

            <div className='text-sm text-gray-500 mt-1 font-medium'>{userdata.headline}</div>

            <div className='text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold'>{userdata.location}</div>

            <div className='flex items-center justify-start mt-6'>
              <button className='w-full sm:w-[150px] h-10 rounded-2xl bg-white/60 text-gray-900 border border-white/60 shadow-sm hover:bg-white hover:shadow-md flex justify-center items-center gap-2 font-medium transition-all duration-200' onClick={() => setedit(true)}>
                Edit profile <HiPencil className='w-4 h-4' />
              </button>
            </div>

          </div>

        </div>


        {/* POST BOX */}

        <div className='w-full bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 rounded-3xl p-5 flex items-center gap-4 hover:bg-white/80 transition-all duration-300'>

          <div className='w-12 h-12 rounded-full overflow-hidden cursor-pointer ring-2 ring-white/60 shadow-sm flex-shrink-0'>

            <img src={userdata.profileImage || profile} alt="" className='w-full h-full object-cover' />

          </div>

          <div

            onClick={() => setuploadPost(true)}

            className='flex-1 border border-white/80 bg-white/50 rounded-2xl px-5 py-3.5 text-[15px] text-gray-500 cursor-pointer hover:bg-white/80 hover:shadow-sm transition-all duration-200'

          >

            Share something...

          </div>

        </div>


        {/* POSTS */}

        {postdata.length > 0 ? (
          postdata.map((post, index) => (
            <Post
              key={index}
              id={post._id}
              description={post.description}
              author={post.author}
              image={post.image}
              like={post.likes}
              comment={post.comments}
              createdAt={post.createdAt}
            />
          ))
        ) : (
          <div className='w-full bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 rounded-3xl flex flex-col items-center justify-center p-10 text-center gap-4 hover:bg-white/80 transition-all duration-300'>
            <div className='w-16 h-16 rounded-full bg-brand-light flex items-center justify-center text-brand shadow-sm border border-brand-light/50'>
              <FiFileText className='w-8 h-8' />
            </div>
            <div>
              <h3 className='text-lg font-bold text-gray-900 mb-1'>Feed is empty</h3>
              <p className='text-sm text-gray-500 max-w-sm'>
                No posts to show right now. Share something with the community or check back later!
              </p>
            </div>
          </div>
        )}

      </div>


      {/* SIDEBAR COLUMN */}
      <div className='w-full lg:w-[25%] hidden lg:flex flex-col gap-6 mb-6'>
        


        {/* SUGGESTIONS CARD */}
        <div className='w-full min-h-[200px] bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl flex flex-col hover:bg-white/80 transition-all duration-300'>
          <div className='p-6'>
            {suggestedUsers.length > 0 &&
              <div className='mb-5 text-gray-900 font-bold text-[15px] px-1 uppercase tracking-wider'>
                People you may know
              </div>
            }
            <div className='flex flex-col gap-3'>
              {suggestedUsers.length > 0 && suggestedUsers.map((user) => (
                <div key={user._id} className='flex rounded-2xl items-center gap-4 p-3 cursor-pointer hover:bg-white/60 hover:shadow-sm border border-transparent hover:border-white/80 transition-all duration-200 group' onClick={() => handleGetProfile(user?.username)}>
                  <div className='w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/60 shadow-sm flex-shrink-0 group-hover:ring-brand transition-colors'>
                    <img src={user.profileImage || profile} alt="" className='w-full h-full object-cover' />
                  </div>
                  <div className='flex flex-col items-start justify-center min-w-0'>
                    <div className='text-gray-900 font-semibold text-[15px] truncate w-full'>
                      {`${user?.firstname} ${user?.lastname}`}
                    </div>
                    <div className='text-[13px] text-gray-500 truncate w-full'>
                      {`${user?.headline}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>

  )

}

export default Home
