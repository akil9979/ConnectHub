import React, { useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Post from '../component/Post'
import { userDatacontext } from '../context/UserContext'
import { FiTrendingUp, FiFileText } from 'react-icons/fi'

function Explore() {
  const { postdata, getPost } = useContext(userDatacontext)

  useEffect(() => {
    getPost()
  }, [])

  const sortedPosts = React.useMemo(() => {
    return [...postdata].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
  }, [postdata])

  return (
    <div className='w-full min-h-screen bg-transparent flex flex-col items-center pt-24 px-4 pb-20'>
      <Nav />
      <div className='w-full max-w-[650px] bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 rounded-3xl flex items-center gap-4 mb-6 px-6 py-4.5 text-lg font-bold text-gray-900'>
        <div className='w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand border border-brand-light/50 shadow-sm'>
          <FiTrendingUp className='w-5 h-5' />
        </div>
        <div>
          <h2 className='text-lg font-bold text-gray-900 leading-tight'>Explore Trending</h2>
          <p className='text-xs text-gray-500 font-medium mt-0.5'>Popular professional posts sorted by community likes</p>
        </div>
      </div>

      <div className='w-full max-w-[650px] flex flex-col gap-6'>
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post, index) => (
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
              <h3 className='text-lg font-bold text-gray-900 mb-1'>No posts trending</h3>
              <p className='text-sm text-gray-500 max-w-sm'>
                Check back later when posts have been created and liked by the community.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Explore
