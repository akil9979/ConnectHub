import React, { useState } from 'react'
import profile from '../assets/profile.webp'
import moment from "moment";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";

function Post({ id, description, image, like, comment, author, createdAt }) {
  const [more, setmore] = useState(false)
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
        <div className=' flex justify-center items-center gap-[5px] text-[18px]'><AiOutlineLike className='text-[#24b2ff] w-[20px] h-[20px] ' /><span>{like.length}</span></div>
        <div className='flex justify-center items-center gap-[5px]'><span>{comment.length}</span><span>comments</span></div>

      </div>
      <div className='flex items-center justify-start w-full gap-[20px] p-[20x] pl-[40px]'>
        <div className='flex justify-center items-center gap-[5px]'>
          <div className='flex items-center'> <AiOutlineLike className=' h-[40px] w-[30px]' /> </div>
          <span>like</span>
        </div>
        <div className='flex justify-center items-center gap-[5px]'>
          <FaRegCommentDots className='h-[40px] w-[30px]' />
          <span>comment</span>
        </div>
      </div>
    </div>
  )
}

export default Post
