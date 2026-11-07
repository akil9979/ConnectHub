import React, { useContext, useEffect, useState } from 'react'
import profile from '../assets/profile.webp'
import moment from 'moment'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa6'
import { LuSendHorizontal } from 'react-icons/lu'
import axios from 'axios'
import { authdatacontext } from '../context/AuthContext'
import { userDatacontext } from '../context/UserContext'
import socket from '../socket'
import ConnectionButton from './ConnectionButton'
import logger from '../utils/logger'
import Avatar from './ui/Avatar'

function Post({ id, description, image, like, comment, author, createdAt }) {
  const [more, setmore] = useState(false)
  const { serverURL } = useContext(authdatacontext)
  const { userdata, handleGetProfile } = useContext(userDatacontext)
  const [likes, setlikes] = useState(like || [])
  const [commentContent, setcommentContent] = useState('')
  const [comments, setcomments] = useState(comment || [])
  const [showComments, setshowComments] = useState(false)
  const [isLiking, setIsLiking] = useState(false)

  const handlelike = async () => {
    setIsLiking(true)
    setTimeout(() => setIsLiking(false), 300)
    try {
      const result = await axios.get(`${serverURL}/api/v1/post/like/${id}`, { withCredentials: true })
      if (result.data?.post?.likes) {
        setlikes(result.data.post.likes)
      }
    } catch (error) {
      logger.error('Error liking post:', error)
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if (!commentContent.trim()) return

    try {
      const result = await axios.post(
        `${serverURL}/api/v1/post/comment/${id}`,
        {
          content: commentContent
        },
        { withCredentials: true }
      )
      if (result.data?.post?.comments) {
        setcomments(result.data.post.comments)
        setcommentContent('')
      }
    } catch (error) {
      logger.error('Error submitting comment:', error)
    }
  }

  // Real-time like updates scoped to specific handler
  useEffect(() => {
    const handleLikeUpdate = (data) => {
      if (data?.postId === id) {
        setlikes(data.likes)
      }
    }

    socket.on('likeUpdated', handleLikeUpdate)
    return () => {
      socket.off('likeUpdated', handleLikeUpdate)
    }
  }, [id])

  // Real-time comment updates scoped to specific handler
  useEffect(() => {
    const handleCommentUpdate = (data) => {
      if (data?.postId === id) {
        setcomments(data.comments)
      }
    }

    socket.on('commentUpdated', handleCommentUpdate)
    return () => {
      socket.off('commentUpdated', handleCommentUpdate)
    }
  }, [id])

  const isLiked = userdata?._id && likes.includes(userdata._id)
  const isAuthor = userdata?._id && author?._id === userdata._id

  return (
    <article className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 mb-5 transition-all duration-200 hover:shadow-md">
      {/* Author Header */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar
            src={author?.profileImage || profile}
            name={`${author?.firstname || ''} ${author?.lastname || ''}`}
            size="lg"
            onClick={() => author?.username && handleGetProfile(author.username)}
          />

          <div className="min-w-0 flex flex-col">
            <button
              type="button"
              className="text-left font-bold text-slate-900 dark:text-white text-sm sm:text-base truncate leading-tight hover:text-brand cursor-pointer transition-colors"
              onClick={() => author?.username && handleGetProfile(author.username)}
            >
              {`${author?.firstname || ''} ${author?.lastname || ''}`}
            </button>
            {author?.headline && (
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {author.headline}
              </span>
            )}
            <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              {createdAt ? moment(createdAt).fromNow() : ''}
            </span>
          </div>
        </div>

        {/* Follow / Connection Button */}
        <div className="flex-shrink-0">
          {!isAuthor && author?._id && <ConnectionButton userId={author._id} />}
        </div>
      </div>

      {/* Description Content */}
      <div className="mt-3.5">
        <div
          className={`w-full ${
            !more ? 'max-h-[120px] overflow-hidden' : 'h-full'
          } text-sm sm:text-[15px] leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line`}
        >
          {description}
        </div>
        {description && description.length > 120 && (
          <button
            type="button"
            className="text-xs sm:text-sm font-semibold text-brand hover:text-brand-dark cursor-pointer transition-colors duration-150 mt-1 inline-block"
            onClick={() => setmore((prev) => !prev)}
          >
            {!more ? 'Read more...' : 'Show less'}
          </button>
        )}
      </div>

      {/* Post Image */}
      {image && (
        <div className="w-full max-h-[460px] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 shadow-2xs mt-3 flex justify-center items-center">
          <img
            src={image}
            alt="Post content"
            loading="lazy"
            className="w-full h-full object-cover sm:object-contain max-h-[460px]"
          />
        </div>
      )}

      {/* Likes & Comments Counter Row */}
      <div className="py-2.5 w-full flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-5 h-5 rounded-full bg-brand-light dark:bg-blue-950/60 text-brand flex items-center justify-center">
            <AiFillLike className="w-3 h-3" />
          </span>
          <span>
            {likes.length} {likes.length === 1 ? 'like' : 'likes'}
          </span>
        </div>

        <button
          type="button"
          className="cursor-pointer hover:text-slate-900 dark:hover:text-slate-200 hover:underline transition-colors font-medium"
          onClick={() => setshowComments((prev) => !prev)}
        >
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </button>
      </div>

      {/* Action Buttons Row */}
      <div className="pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlelike}
              aria-label={isLiked ? 'Unlike post' : 'Like post'}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl cursor-pointer text-xs sm:text-sm font-semibold transition-all duration-150 select-none ${
                isLiked
                  ? 'text-brand bg-brand-light dark:bg-blue-950/50'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              } ${isLiking ? 'animate-like-pop' : ''}`}
            >
              {isLiked ? (
                <AiFillLike className="w-4.5 h-4.5 text-brand" />
              ) : (
                <AiOutlineLike className="w-4.5 h-4.5" />
              )}
              <span>{isLiked ? 'Liked' : 'Like'}</span>
            </button>

            <button
              type="button"
              onClick={() => setshowComments((prev) => !prev)}
              aria-label="Toggle comments"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl cursor-pointer text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-150 select-none"
            >
              <FaRegCommentDots className="w-4.5 h-4.5" />
              <span>Comment</span>
            </button>
          </div>

          {/* Quick Comment Input in bar */}
          <div className="flex-1 min-w-[200px] max-w-sm ml-auto">
            <form className="flex relative items-center" onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Write a comment..."
                aria-label="Write a comment"
                onChange={(e) => setcommentContent(e.target.value)}
                value={commentContent}
                className="w-full h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-4 pr-9 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand focus:bg-white dark:focus:bg-slate-900 transition-all duration-150"
              />
              <button
                type="submit"
                disabled={!commentContent.trim()}
                aria-label="Send comment"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-brand-light text-brand dark:hover:bg-blue-950/40 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <LuSendHorizontal className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-3 animate-in fade-in duration-150">
            {comments.length === 0 ? (
              <div className="text-center py-3 text-xs sm:text-sm text-slate-400">
                No comments yet. Be the first to start the conversation!
              </div>
            ) : (
              comments.map((com, index) => (
                <div className="flex gap-2.5 items-start" key={com._id || index}>
                  <Avatar
                    src={com.user?.profileImage || profile}
                    name={`${com.user?.firstname || ''} ${com.user?.lastname || ''}`}
                    size="sm"
                    className="mt-0.5"
                    onClick={() => com.user?.username && handleGetProfile(com.user.username)}
                  />
                  <div className="flex-1 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700 rounded-2xl p-2.5 px-3.5 text-xs sm:text-sm">
                    <button
                      type="button"
                      className="text-left text-slate-900 dark:text-white font-semibold hover:text-brand cursor-pointer transition-colors"
                      onClick={() => com.user?.username && handleGetProfile(com.user.username)}
                    >
                      {`${com.user?.firstname || ''} ${com.user?.lastname || ''}`}
                    </button>
                    <div className="text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                      {com.content}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default Post
