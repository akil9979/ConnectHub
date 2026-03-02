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

function Post({ id, description, image, like, comment, author, createdAt }) {
  const [more, setmore] = useState(false)
  let { serverURL } = useContext(authdatacontext)
  const { userdata, getPost } = useContext(userDatacontext)
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
  }, [likes,setlikes,comments,setcomments])
  return (
    <div className='w-full min-h-[200px] bg-white rounded-lg shadow-lg p-[20px] gap-[10px] flex flex-col'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-[10px]'>
          <div className='w-[70px] h-[70px] rounded-full flex justify-center items-center overflow-hidden  cursor-pointer'>
            <img src={author.profileImage || profile} alt="" className='w-full  h-full' />
          </div>
          <div>
            <div className='text-gray-700 font-semibold text-[22px]'>{`${author?.firstname} ${author?.lastname}`}</div>
            <div className='text-gray-700 font-semibold text-[16px]'>{`${author?.headline} `}</div>
            <div className='text-gray-700 font-semibold text-[16px]'>{`${moment(createdAt).fromNow()} `}</div>
          </div>
        </div>
        <div>
          {/* button */}
        </div>
      </div>
      <div className={`w-full ${!more ? "max-h-[100px] overflow-hidden" : "h-full"} pl-[50px]  `}>{description}</div>
      <div className='pl-[50px] font-semibold cursor-pointer ' onClick={() => setmore(prev => !prev)}>{!more ? "read more..." : "read less"}</div>
      {image &&
        <div className='w-full h-[300px] overflow-hidden flex justify-center rounded-lg'>
          <img src={image} alt="" className='h-full rounded-lg' />
        </div>}

      <div className='pl-[50px] p-[20px] w-full flex justify-between items-center border-b-2 border-gray-500'>
        <div className=' flex justify-center items-center gap-[5px] text-[18px]'><AiOutlineLike className='text-[#24b2ff] w-[20px] h-[20px] ' /><span>{likes.length}</span></div>
        <div className='cursor-pointer flex justify-center items-center gap-[5px]'onClick={()=>setshowComments(prev=>!prev)} ><span>{comments.length}</span><span>comments</span></div>

      </div>
      <div>
      <div className='flex  items-center justify-start w-full gap-[20px] p-[20x] pl-[40px]'>
        {!likes.includes(userdata._id) && <div className='flex justify-center items-center gap-[5px] cursor-pointer' onClick={handlelike}>
          <div className='flex items-center ' > <AiOutlineLike className=' h-[40px] w-[30px]' /> </div>
          <span>like</span>
        </div>}
        {likes.includes(userdata._id) && <div className='flex justify-center items-center gap-[5px] cursor-pointer' onClick={handlelike}>
          <div className='flex items-center ' > <AiFillLike className=' h-[40px] w-[30px] text-[#07a4ff] ' /> </div>
          <span className='text-[#07a4ff]'>liked</span>
        </div>}
        <div className='flex justify-center items-center gap-[5px] cursor-pointer'onClick={()=>setshowComments(prev=>!prev)}>
          <FaRegCommentDots className='h-[40px] w-[30px]' />
          <span>comment</span>
        </div>
        <div>
          <form className='flex relative' onSubmit={handleComment}>
            <input type="text" placeholder='write a comment...' onChange={(e) => setcommentContent(e.target.value)} value={commentContent} className=' w-full h-[40px] rounded-full border-2 border-gray-300 px-[20px] pr-[50px]' />
            <button className='absolute right-[22px] top-[10px] '> <LuSendHorizontal className='text-[#07a4ff] w-[22px] h-[22px]' /></button>
          </form>

        </div>
        </div>
   
     
        {showComments &&  <div className='flex flex-col gap-[20px] pt-[10px]'>
            {comments.map((com) => (
              <div className='  border-b-2 border-b-gray-300'>
                <div className='flex items-center gap-[5px] '>
                  <div className='w-[40px] h-[40px] rounded-full flex justify-center items-center overflow-hidden  cursor-pointer'>
                    <img src={com.user.profileImage || profile} alt="" className='w-full  h-full' />
                  </div>
                  <div className='text-gray-700 font-semibold text-[16px]'>{`${com.user?.firstname} ${com.user?.lastname}`}</div>
                  
                </div>
                <div className='pl-[50px] pt-[10px] pb-[10px]'>{com.content}</div>
                  {/* {moment(com.createdAt).fromNow()} */}
                </div>
            ))}
          </div> }
       
          
           
      </div>
      
    </div>
  )
}

export default Post
