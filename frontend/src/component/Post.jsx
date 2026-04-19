import React, { useContext, useEffect, useState } from 'react'
import profile from '../assets/profile.webp'
import moment from "moment";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import axios from 'axios';
import { authdatacontext } from '../context/AuthContext';
import { userDatacontext } from '../context/UserContext';
import { AiFillLike } from "react-icons/ai";
import { LuSendHorizontal } from "react-icons/lu";
import socket from '../socket';

import ConnectionButton from './ConnectionButton';


function Post({ id, description, image, like, comment, author, createdAt }) {
  const [more, setmore] = useState(false)
  let { serverURL } = useContext(authdatacontext)
  const { userdata, getPost, handleGetProfile } = useContext(userDatacontext)
  const [likes, setlikes] = useState(like || [])
  const [commentContent, setcommentContent] = useState("")
  const [comments, setcomments] = useState(comment || [])
  const [showComments, setshowComments] = useState(false)
  const handlelike = async () => {
    try {
      const result = await axios.get(serverURL + `/api/v1/post/like/${id}`, { withCredentials: true })
      setlikes(result.data.post.likes)



    } catch (error) {
      console.log("error in fetching", error);

    }
  }
  const handleComment = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(serverURL + `/api/v1/post/comment/${id}`, {
        content: commentContent
      }, { withCredentials: true })
      setcomments(result.data.post.comments)
      setcommentContent("")




    } catch (error) {
      console.log("error in fetching the comment:", error);

    }
  }
  useEffect(() => {
    getPost()
  }, [])
  useEffect(() => {
    socket.on("likeUpdated", (data) => {
      if (data.postId === id) {
        setlikes(data.likes)
      }
    })
    return () => {
      socket.off("likeUpdated")
    }
  }, [id])
  useEffect(() => {
    socket.on("commentUpdated", (data) => {
      if (data.postId === id) {
        setcomments(data.comments)
      }
    })
    return () => {
      socket.off("commentUpdated")
    }
  }, [id])
  return (
    <div className='w-full bg-white/70 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 p-5 sm:p-6 gap-4 flex flex-col mb-6 hover:bg-white/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300'>
      <div className='flex justify-between items-start gap-4'>
        <div className='flex gap-3 min-w-0'>
          <div className='w-12 h-12 rounded-full flex justify-center items-center overflow-hidden cursor-pointer ring-2 ring-white/60 shadow-sm flex-shrink-0' onClick={() => handleGetProfile(author.username)}>
            <img src={author.profileImage || profile} alt="" className='w-full h-full object-cover' />
          </div>
          <div className='min-w-0 flex flex-col justify-center'>
            <div className='text-gray-900 font-bold text-base truncate leading-tight hover:text-blue-600 cursor-pointer transition-colors' onClick={() => handleGetProfile(author.username)}>{`${author?.firstname} ${author?.lastname}`}</div>
            <div className='text-[13px] text-gray-500 truncate mt-0.5'>{`${author?.headline} `}</div>
            <div className='text-sm text-gray-400'>{`${moment(createdAt).fromNow()} `}</div>
          </div>
        </div>
        <div className='flex-shrink-0'>
          {author._id !== userdata._id && <ConnectionButton userId={author._id} />}

        </div>
      </div>
      <div className={`w-full ${!more ? "max-h-[100px] overflow-hidden" : "h-full"} text-[15px] leading-relaxed text-gray-800`}>{description}</div>
      <div className='text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer transition-colors duration-200 inline-block' onClick={() => setmore(prev => !prev)}>{!more ? "Read more..." : "Read less"}</div>
      {image &&
        <div className='w-full max-h-[400px] overflow-hidden flex justify-center rounded-2xl bg-white/40 border border-white/50 shadow-sm mt-2'>
          <img src={image} alt="" className='w-full h-full object-contain' />
        </div>}

      <div className='py-3 w-full flex justify-between items-center border-b border-gray-100 mt-2'>
        <div className='flex justify-center items-center gap-1.5 text-sm text-gray-500'><AiOutlineLike className='text-blue-500 w-4 h-4' /><span>{likes.length}</span></div>
        <div className='cursor-pointer flex justify-center items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200' onClick={() => setshowComments(prev => !prev)} ><span>{comments.length}</span><span>comments</span></div>

      </div>
      <div>
        <div className='flex flex-wrap items-center justify-start w-full gap-2 pt-3'>
          {!likes.includes(userdata._id) && <div className='flex justify-center items-center gap-2 px-3 py-2 rounded-xl cursor-pointer text-gray-600 hover:bg-white/60 hover:text-gray-900 hover:shadow-sm border border-transparent hover:border-white/80 transition-all duration-200' onClick={handlelike}>
            <AiOutlineLike className='h-5 w-5' />
            <span className='text-sm font-medium'>Like</span>
          </div>}
          {likes.includes(userdata._id) && <div className='flex justify-center items-center gap-2 px-3 py-2 rounded-xl cursor-pointer text-blue-600 bg-blue-50 border border-blue-100/50 hover:bg-blue-100 shadow-sm transition-all duration-200' onClick={handlelike}>
            <AiFillLike className='h-5 w-5' />
            <span className='text-sm font-medium'>Liked</span>
          </div>}
          <div className='flex justify-center items-center gap-2 px-3 py-2 rounded-xl cursor-pointer text-gray-600 hover:bg-white/60 hover:text-gray-900 hover:shadow-sm border border-transparent hover:border-white/80 transition-all duration-200' onClick={() => setshowComments(prev => !prev)}>
            <FaRegCommentDots className='h-5 w-5' />
            <span className='text-sm font-medium'>Comment</span>
          </div>
          <div className='flex-1 min-w-[200px] ml-auto'>
            <form className='flex relative' onSubmit={handleComment}>
              <input type="text" placeholder='Add a comment...' onChange={(e) => setcommentContent(e.target.value)} value={commentContent} className='w-full h-10 rounded-full border border-gray-200 bg-gray-50 px-4 pr-10 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200' />
              <button className='absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-blue-50 text-blue-600 transition-colors'> <LuSendHorizontal className='w-4 h-4' /></button>
            </form>

          </div>
        </div>


        {showComments && <div className='flex flex-col gap-4 pt-4 border-t border-white/50 mt-4'>
          {comments.map((com) => (
            <div className='flex gap-3'>
              <div className='w-8 h-8 rounded-full flex justify-center items-center overflow-hidden cursor-pointer ring-2 ring-white/60 shadow-sm flex-shrink-0'>
                <img src={com.user.profileImage || profile} alt="" className='w-full h-full object-cover' />
              </div>
              <div className='flex-1 bg-white/50 border border-white/60 shadow-sm rounded-2xl p-3 px-4'>
                <div className='text-gray-900 font-semibold text-[13px] hover:underline cursor-pointer'>{`${com.user?.firstname} ${com.user?.lastname}`}</div>
                <div className='text-[14px] text-gray-700 mt-0.5'>{com.content}</div>
              </div>
            </div>
          ))}
        </div>}



      </div>

    </div>
  )
}

export default Post
