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
    <div className='w-full min-h-[200px] bg-white rounded-xl shadow-md border border-gray-100 p-6 gap-4 flex flex-col mb-6'>
      <div className='flex justify-between items-start gap-4'>
        <div className='flex gap-3 min-w-0'>
          <div className='w-[70px] h-[70px] rounded-full flex justify-center items-center overflow-hidden cursor-pointer ring-2 ring-gray-100 flex-shrink-0' onClick={() => handleGetProfile(author.username)}>
            <img src={author.profileImage || profile} alt="" className='w-full h-full object-cover' />
          </div>
          <div className='min-w-0'>
            <div className='text-gray-900 font-semibold text-lg truncate'>{`${author?.firstname} ${author?.lastname}`}</div>
            <div className='text-sm text-gray-500 truncate'>{`${author?.headline} `}</div>
            <div className='text-sm text-gray-400'>{`${moment(createdAt).fromNow()} `}</div>
          </div>
        </div>
        <div className='flex-shrink-0'>
          {author._id !== userdata._id && <ConnectionButton userId={author._id} />}

        </div>
      </div>
      <div className={`w-full ${!more ? "max-h-[100px] overflow-hidden" : "h-full"} pl-0 md:pl-[50px] text-base text-gray-800`}>{description}</div>
      <div className='pl-0 md:pl-[50px] text-sm font-medium text-blue-600 hover:text-indigo-600 cursor-pointer transition-colors duration-200' onClick={() => setmore(prev => !prev)}>{!more ? "read more..." : "read less"}</div>
      {image &&
        <div className='w-full h-[300px] overflow-hidden flex justify-center rounded-xl'>
          <img src={image} alt="" className='h-full rounded-xl object-cover' />
        </div>}

      <div className='pl-0 md:pl-[50px] py-4 w-full flex justify-between items-center border-b border-gray-200'>
        <div className='flex justify-center items-center gap-2 text-base text-gray-700'><AiOutlineLike className='text-blue-600 w-5 h-5' /><span>{likes.length}</span></div>
        <div className='cursor-pointer flex justify-center items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200' onClick={() => setshowComments(prev => !prev)} ><span>{comments.length}</span><span>comments</span></div>

      </div>
      <div>
        <div className='flex flex-wrap items-center justify-start w-full gap-4 p-0 pl-0 md:pl-10'>
          {!likes.includes(userdata._id) && <div className='flex justify-center items-center gap-2 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-200' onClick={handlelike}>
            <div className='flex items-center' > <AiOutlineLike className='h-8 w-8' /> </div>
            <span className='text-sm font-medium'>like</span>
          </div>}
          {likes.includes(userdata._id) && <div className='flex justify-center items-center gap-2 cursor-pointer text-blue-600' onClick={handlelike}>
            <div className='flex items-center' > <AiFillLike className='h-8 w-8' /> </div>
            <span className='text-sm font-medium'>liked</span>
          </div>}
          <div className='flex justify-center items-center gap-2 cursor-pointer text-gray-600 hover:text-indigo-600 transition-colors duration-200' onClick={() => setshowComments(prev => !prev)}>
            <FaRegCommentDots className='h-8 w-8' />
            <span className='text-sm font-medium'>comment</span>
          </div>
          <div className='flex-1 min-w-[200px]'>
            <form className='flex relative' onSubmit={handleComment}>
              <input type="text" placeholder='write a comment...' onChange={(e) => setcommentContent(e.target.value)} value={commentContent} className='w-full h-10 rounded-xl border border-gray-200 bg-gray-50 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200' />
              <button className='absolute right-3 top-1/2 -translate-y-1/2'> <LuSendHorizontal className='text-blue-600 w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors duration-200' /></button>
            </form>

          </div>
        </div>


        {showComments && <div className='flex flex-col gap-4 pt-4 border-t border-gray-100 mt-2'>
          {comments.map((com) => (
            <div className='border-b border-gray-100 pb-4 last:border-0'>
              <div className='flex items-center gap-2'>
                <div className='w-10 h-10 rounded-full flex justify-center items-center overflow-hidden cursor-pointer ring-2 ring-gray-100'>
                  <img src={com.user.profileImage || profile} alt="" className='w-full h-full object-cover' />
                </div>
                <div className='text-gray-900 font-semibold text-sm'>{`${com.user?.firstname} ${com.user?.lastname}`}</div>

              </div>
              <div className='pl-12 pt-2 text-base text-gray-700'>{com.content}</div>
              {/* {moment(com.createdAt).fromNow()} */}
            </div>
          ))}
        </div>}



      </div>

    </div>
  )
}

export default Post
