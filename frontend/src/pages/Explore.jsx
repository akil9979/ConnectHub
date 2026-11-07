import React, { useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Post from '../component/Post'
import { userDatacontext } from '../context/UserContext'
import { FiTrendingUp, FiFileText } from 'react-icons/fi'
import EmptyState from '../component/ui/EmptyState'

function Explore() {
  const { postdata, getPost } = useContext(userDatacontext)

  useEffect(() => {
    getPost()
  }, [getPost])

  const sortedPosts = React.useMemo(() => {
    if (!postdata || !Array.isArray(postdata)) return []
    return [...postdata].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
  }, [postdata])

  return (
    <div className="w-full min-h-screen pt-20 pb-20 px-4 sm:px-6 flex flex-col items-center">
      <Nav />

      {/* Explore Header Card */}
      <div className="w-full max-w-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl flex items-center gap-4 mb-6 p-4 sm:p-5">
        <div className="w-12 h-12 rounded-2xl bg-brand-light dark:bg-blue-950/60 flex items-center justify-center text-brand border border-brand/20 shadow-xs flex-shrink-0">
          <FiTrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight font-display">
            Explore Trending
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Top engineering posts and insights ranked by community engagement
          </p>
        </div>
      </div>

      {/* Feed Container */}
      <main aria-label="Trending posts" className="w-full max-w-2xl flex flex-col gap-5">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
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
          <EmptyState
            icon={FiFileText}
            title="No trending posts yet"
            description="When posts are published and liked by the community, the most popular will appear here."
          />
        )}
      </main>
    </div>
  )
}

export default Explore
