import React, { useContext, useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../component/Nav'
import profile from '../assets/profile.webp'
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
import logger from '../utils/logger';

function Home() {
  const { userdata, edit, setedit, postdata, getPost, handleGetProfile } = useContext(userDatacontext)

  const [frontendImage, setfrontendImage] = useState("")
  const [backendImage, setbackendImage] = useState("")
  const [description, setdescription] = useState("")
  const [uploadPost, setuploadPost] = useState(false)
  const { serverURL } = useContext(authdatacontext)
  const [posting, setposting] = useState(false)
  const [suggestedUsers, setsuggestedUsers] = useState([])
  const image = useRef()

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setbackendImage(file)
      setfrontendImage(URL.createObjectURL(file))
    }
  }

  const handleuploadPost = async () => {
    if (!description.trim() && !backendImage) return
    setposting(true)
    try {
      let formData = new FormData()
      formData.append("description", description)
      if (backendImage) {
        formData.append("image", backendImage)
      }

      await axios.post(`${serverURL}/api/v1/post/createPost`, formData, { withCredentials: true })
      setuploadPost(false)
      setdescription("")
      setbackendImage("")
      setfrontendImage("")
      getPost()
    } catch (error) {
      logger.error("Error creating post:", error)
    } finally {
      setposting(false)
    }
  }

  const handleSuggestion = useCallback(async () => {
    try {
      const result = await axios.get(`${serverURL}/api/v1/user/suggestedUsers`, { withCredentials: true })
      if (result.data?.getSuggestedUsers) {
        setsuggestedUsers(result.data.getSuggestedUsers)
      }
    } catch (error) {
      logger.error("Error fetching suggestions:", error)
    }
  }, [serverURL])

  useEffect(() => {
    handleSuggestion()
  }, [handleSuggestion])

  if (!userdata) {
    return null
  }

  return (
    <div className='w-full min-h-[100vh] grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 items-start relative pt-24 px-4 pb-20 sm:px-10 lg:px-12 xl:px-20 bg-transparent max-w-[1440px] mx-auto'>
      {edit && <Editprofile />}

      <Nav />

      {uploadPost && <div className='w-full h-full z-[100] bg-slate-900/40 backdrop-blur-sm fixed inset-0' onClick={() => setuploadPost(false)}></div>}

      {uploadPost && (
        <div className='w-[90%] h-[90%] max-w-[550px] top-[10%] bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60 rounded-3xl fixed z-[200] p-6 flex flex-col gap-4 justify-start items-start animate-in fade-in zoom-in-95 duration-200'>
          <div className='absolute right-4 top-4'>
            <RxCross1 className='h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200' onClick={() => setuploadPost(false)} />
          </div>

          <div className='flex justify-start items-center gap-3'>
            <div className='w-[70px] h-[70px] rounded-full flex justify-center items-center overflow-hidden cursor-pointer ring-2 ring-gray-100'>
              <img src={userdata?.profileImage || profile} alt="" className='w-full h-full object-cover' />
            </div>
            <div>
              <div className='text-gray-900 font-semibold text-lg'>{`${userdata?.firstname || ''} ${userdata?.lastname || ''}`}</div>
            </div>
          </div>

          <textarea
            className={`w-full ${frontendImage ? "h-[200px]" : "h-[500px]"} outline-none border-none resize-none text-base text-gray-800 placeholder:text-gray-400`}
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder='What do you want to talk about ? '
          ></textarea>

          <input type="file" ref={image} hidden onChange={handleImage} accept="image/*" />

          <div className={`w-full ${frontendImage ? "h-[300px]" : "h-[0px]"} overflow-hidden flex justify-center items-center`}>
            {frontendImage && <img src={frontendImage} className='h-full rounded-xl object-contain' alt="" />}
          </div>

          <div className='w-full h-[200px] flex flex-col'>
            <div className='border-b border-gray-200 p-4 flex justify-start items-center'>
              <FaRegImage onClick={() => image.current.click()} className='h-6 w-6 text-brand hover:text-accent cursor-pointer transition-colors duration-200' />
            </div>

            <div className='p-4 flex justify-end items-center'>
              <button 
                className='min-w-[100px] h-12 px-6 rounded-2xl bg-brand text-white shadow-md hover:bg-brand-dark hover:shadow-lg cursor-pointer transition-all duration-200 font-medium disabled:opacity-60' 
                disabled={posting || (!description.trim() && !backendImage)} 
                onClick={handleuploadPost}
              >
                {posting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEFT COLUMN (Profile Rail) */}
      <div className='w-full hidden lg:flex flex-col gap-6 sticky top-24 self-start'>
        <div className='rounded-3xl w-full bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 relative overflow-hidden transition-all hover:bg-white/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] duration-300'>
          <div className='w-full h-[84px] bg-gradient-to-r from-brand to-accent rounded-t-3xl overflow-hidden flex items-center justify-center cursor-pointer relative'>
            {userdata?.coverImage && <img src={userdata.coverImage} alt="" className='w-full h-full object-cover opacity-90' />}
            <MdOutlineCameraAlt className='absolute top-3 right-3 h-5 w-5 text-white drop-shadow-md' onClick={() => setedit(true)} />
          </div>

          <div className='w-[72px] h-[72px] rounded-full flex justify-center items-center overflow-hidden absolute top-[48px] left-5 cursor-pointer ring-4 ring-white/80 bg-white shadow-sm'>
            <img src={userdata?.profileImage || profile} alt="" className='w-full h-full object-cover' />
          </div>

          <div className='w-6 h-6 bg-brand cursor-pointer absolute top-[92px] left-[65px] rounded-full flex justify-center items-center shadow-md ring-2 ring-white hover:bg-brand-dark transition-colors duration-200'>
            <FiPlus className='text-white w-3.5 h-3.5' onClick={() => setedit(true)} />
          </div>

          <div className='mt-11 p-5 pt-0 flex flex-col'>
            <div className='text-gray-900 font-bold text-lg truncate'>{`${userdata?.firstname || ''} ${userdata?.lastname || ''}`}</div>
            <div className='text-xs text-gray-500 mt-1 font-medium line-clamp-2'>{userdata?.headline || ''}</div>
            <div className='text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-semibold truncate'>{userdata?.location || ''}</div>

            <div className='flex items-center justify-start mt-5'>
              <button className='w-full h-9 rounded-xl bg-white/60 text-gray-900 border border-white/60 shadow-sm hover:bg-white hover:shadow-md flex justify-center items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer' onClick={() => setedit(true)}>
                Edit profile <HiPencil className='w-3.5 h-3.5' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER COLUMN (Feed) */}
      <div className='w-full min-h-[200px] bg-transparent flex flex-col gap-6'>
        {/* POST BOX */}
        <div className='w-full bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 rounded-3xl p-5 flex items-center gap-4 hover:bg-white/80 transition-all duration-300'>
          <div className='w-12 h-12 rounded-full overflow-hidden cursor-pointer ring-2 ring-white/60 shadow-sm flex-shrink-0'>
            <img src={userdata?.profileImage || profile} alt="" className='w-full h-full object-cover' />
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
          postdata.map((post) => (
            <Post
              key={post._id}
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

      {/* RIGHT COLUMN (Suggestions & Footer) */}
      <div className='w-full hidden lg:flex flex-col gap-6 sticky top-24 self-start'>
        {/* SUGGESTIONS CARD */}
        <div className='w-full min-h-[200px] bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl flex flex-col hover:bg-white/80 transition-all duration-300'>
          <div className='p-6'>
            {suggestedUsers.length > 0 && (
              <div className='mb-5 text-gray-900 font-bold text-[15px] px-1 uppercase tracking-wider'>
                People you may know
              </div>
            )}
            <div className='flex flex-col gap-3'>
              {suggestedUsers.length > 0 ? (
                suggestedUsers.map((user) => (
                  <div 
                    key={user._id} 
                    className='flex rounded-2xl items-center gap-4 p-3 cursor-pointer hover:bg-white/60 hover:shadow-sm border border-transparent hover:border-white/80 transition-all duration-200 group' 
                    onClick={() => handleGetProfile(user?.username)}
                  >
                    <div className='w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/60 shadow-sm flex-shrink-0 group-hover:ring-brand transition-colors'>
                      <img src={user.profileImage || profile} alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className='flex flex-col items-start justify-center min-w-0'>
                      <div className='text-gray-900 font-semibold text-[15px] truncate w-full'>
                        {`${user?.firstname || ''} ${user?.lastname || ''}`}
                      </div>
                      <div className='text-[13px] text-gray-500 truncate w-full'>
                        {user?.headline || ''}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-sm text-gray-400 text-center py-4'>No suggestions right now</div>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className='px-2 flex flex-col items-center text-center gap-2 text-xs text-gray-400'>
          <div className='flex flex-wrap justify-center gap-x-2 gap-y-1 leading-relaxed'>
            <Link to="/about" className='hover:underline hover:text-gray-600 transition-colors'>About</Link>
            <span>·</span>
            <Link to="/accessibility" className='hover:underline hover:text-gray-600 transition-colors'>Accessibility</Link>
            <span>·</span>
            <Link to="/help" className='hover:underline hover:text-gray-600 transition-colors'>Help Center</Link>
            <span>·</span>
            <Link to="/privacy" className='hover:underline hover:text-gray-600 transition-colors'>Privacy & Terms</Link>
          </div>
          <div className='text-[11px] text-gray-400 mt-1'>
            ConnectHub Corporation © 2026
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
