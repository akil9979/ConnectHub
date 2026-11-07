import React, { useContext, useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../component/Nav'
import profile from '../assets/profile.webp'
import { FiPlus, FiFileText } from 'react-icons/fi'
import { MdOutlineCameraAlt } from 'react-icons/md'
import { userDatacontext } from '../context/UserContext'
import { HiPencil } from 'react-icons/hi2'
import Editprofile from '../component/Editprofile'
import { RxCross1 } from 'react-icons/rx'
import { FaRegImage } from 'react-icons/fa6'
import axios from 'axios'
import { authdatacontext } from '../context/AuthContext'
import Post from '../component/Post'
import logger from '../utils/logger'
import Avatar from '../component/ui/Avatar'
import Button from '../component/ui/Button'
import EmptyState from '../component/ui/EmptyState'

function Home() {
  const { userdata, edit, setedit, postdata, getPost, handleGetProfile } =
    useContext(userDatacontext)

  const [frontendImage, setfrontendImage] = useState('')
  const [backendImage, setbackendImage] = useState('')
  const [description, setdescription] = useState('')
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
      formData.append('description', description)
      if (backendImage) {
        formData.append('image', backendImage)
      }

      await axios.post(`${serverURL}/api/v1/post/createPost`, formData, { withCredentials: true })
      setuploadPost(false)
      setdescription('')
      setbackendImage('')
      setfrontendImage('')
      getPost()
    } catch (error) {
      logger.error('Error creating post:', error)
    } finally {
      setposting(false)
    }
  }

  const handleSuggestion = useCallback(async () => {
    try {
      const result = await axios.get(`${serverURL}/api/v1/user/suggestedUsers`, {
        withCredentials: true
      })
      if (result.data?.getSuggestedUsers) {
        setsuggestedUsers(result.data.getSuggestedUsers)
      }
    } catch (error) {
      logger.error('Error fetching suggestions:', error)
    }
  }, [serverURL])

  useEffect(() => {
    handleSuggestion()
  }, [handleSuggestion])

  if (!userdata) {
    return null
  }

  return (
    <div className="w-full min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {edit && <Editprofile />}

      <Nav />

      {/* Post Composer Modal */}
      {uploadPost && (
        <div
          className="w-full h-full z-[100] bg-slate-900/60 backdrop-blur-sm fixed inset-0 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
          onClick={() => setuploadPost(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 backdrop-blur-xl shadow-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Create a Post</h3>
              <button
                type="button"
                onClick={() => setuploadPost(false)}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors"
              >
                <RxCross1 className="h-4 w-4" />
              </button>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3">
              <Avatar
                src={userdata?.profileImage || profile}
                name={`${userdata?.firstname || ''} ${userdata?.lastname || ''}`}
                size="lg"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {`${userdata?.firstname || ''} ${userdata?.lastname || ''}`}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Post to Anyone</span>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              className="w-full h-36 outline-none border-none resize-none text-sm sm:text-base text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-transparent"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              placeholder="What do you want to talk about?"
              autoFocus
            />

            <input type="file" ref={image} hidden onChange={handleImage} accept="image/*" />

            {/* Image Preview */}
            {frontendImage && (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-64 flex justify-center bg-slate-50 dark:bg-slate-800/50">
                <img
                  src={frontendImage}
                  className="max-h-64 w-full object-contain"
                  alt="Post preview"
                />
                <button
                  type="button"
                  aria-label="Remove image"
                  onClick={() => {
                    setfrontendImage('')
                    setbackendImage('')
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-900/70 text-white flex items-center justify-center hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <RxCross1 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Footer controls */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => image.current.click()}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-brand hover:bg-brand-light dark:hover:bg-blue-950/40 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                <FaRegImage className="w-5 h-5" />
                <span>Add media</span>
              </button>

              <Button
                variant="primary"
                size="md"
                disabled={posting || (!description.trim() && !backendImage)}
                loading={posting}
                loadingText="Posting..."
                onClick={handleuploadPost}
                className="px-6 font-semibold"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main 3-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 items-start">
        {/* LEFT COLUMN: Profile rail */}
        <aside aria-label="Profile summary" className="w-full hidden lg:flex flex-col gap-6 sticky top-24">
          <div className="rounded-3xl w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all hover:shadow-md duration-200">
            {/* Banner */}
            <div className="w-full h-24 bg-gradient-to-r from-brand to-accent relative overflow-hidden flex items-center justify-center">
              {userdata?.coverImage && (
                <img
                  src={userdata.coverImage}
                  alt="Cover banner"
                  className="w-full h-full object-cover opacity-90"
                />
              )}
              <button
                type="button"
                aria-label="Edit cover photo"
                onClick={() => setedit(true)}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-slate-900/50 backdrop-blur-xs flex items-center justify-center text-white hover:bg-slate-900/80 transition-colors cursor-pointer"
              >
                <MdOutlineCameraAlt className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Content Container in Normal Flow */}
            <div className="px-5 pb-5 flex flex-col">
              {/* Avatar in normal flow pulled up over banner */}
              <div className="relative -mt-10 mb-3.5 w-fit">
                <Avatar
                  src={userdata?.profileImage || profile}
                  name={`${userdata?.firstname || ''} ${userdata?.lastname || ''}`}
                  size="xl"
                  ring={true}
                  className="ring-4 ring-white dark:ring-slate-900 shadow-md"
                  onClick={() => setedit(true)}
                />
                <button
                  type="button"
                  aria-label="Edit profile picture"
                  onClick={() => setedit(true)}
                  className="w-6 h-6 bg-brand hover:bg-brand-dark cursor-pointer absolute bottom-0 right-0 rounded-full flex justify-center items-center text-white shadow-sm ring-2 ring-white dark:ring-slate-900 transition-colors duration-150"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Profile Details ALWAYS below Avatar */}
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-900 dark:text-white font-bold text-base sm:text-lg truncate leading-snug">
                  {`${userdata?.firstname || ''} ${userdata?.lastname || ''}`}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">
                  {userdata?.headline || 'Member at ConnectHub'}
                </span>
                {userdata?.location && (
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-1 truncate">
                    {userdata.location}
                  </span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full font-semibold"
                  onClick={() => setedit(true)}
                >
                  <span>Edit profile</span>
                  <HiPencil className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: Feed */}
        <main aria-label="Main Feed" className="w-full flex flex-col gap-5 min-w-0">
          {/* Post Composer Trigger Card */}
          <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex items-center gap-3.5 transition-all duration-200 hover:shadow-md">
            <Avatar
              src={userdata?.profileImage || profile}
              name={`${userdata?.firstname || ''} ${userdata?.lastname || ''}`}
              size="md"
            />
            <button
              type="button"
              onClick={() => setuploadPost(true)}
              className="flex-1 text-left bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/80 dark:hover:bg-slate-800 rounded-full px-4 sm:px-5 py-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 border border-transparent transition-all duration-150 cursor-pointer select-none"
            >
              Share something with your network...
            </button>
            <button
              type="button"
              onClick={() => {
                setuploadPost(true)
                setTimeout(() => image.current?.click(), 100)
              }}
              aria-label="Upload photo"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-brand dark:hover:text-brand rounded-xl hover:bg-brand-light dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
            >
              <FaRegImage className="w-5 h-5" />
            </button>
          </div>

          {/* Posts Feed */}
          {postdata && postdata.length > 0 ? (
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
            <EmptyState
              icon={FiFileText}
              title="Feed is empty"
              description="No posts to show right now. Share something with the community or check back later!"
              action={
                <Button variant="primary" size="sm" onClick={() => setuploadPost(true)}>
                  Create first post
                </Button>
              }
            />
          )}
        </main>

        {/* RIGHT COLUMN: Suggestions & Footer */}
        <aside aria-label="Suggested members" className="w-full hidden lg:flex flex-col gap-6 sticky top-24">
          <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-sm rounded-3xl p-5 transition-all hover:shadow-md duration-200">
            <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 px-1">
              People you may know
            </div>

            <div className="flex flex-col gap-2">
              {suggestedUsers && suggestedUsers.length > 0 ? (
                suggestedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 cursor-pointer transition-colors duration-150 group"
                    onClick={() => handleGetProfile(user?.username)}
                  >
                    <Avatar
                      src={user.profileImage || profile}
                      name={`${user?.firstname || ''} ${user?.lastname || ''}`}
                      size="md"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-brand transition-colors">
                        {`${user?.firstname || ''} ${user?.lastname || ''}`}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user?.headline || `@${user?.username || 'member'}`}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">
                  No suggestions available right now
                </div>
              )}
            </div>
          </div>

          {/* Quick Footer Links */}
          <footer className="px-2 flex flex-col items-center text-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-1 font-medium">
              <Link to="/about" className="hover:text-brand transition-colors">
                About
              </Link>
              <span>·</span>
              <Link to="/accessibility" className="hover:text-brand transition-colors">
                Accessibility
              </Link>
              <span>·</span>
              <Link to="/help" className="hover:text-brand transition-colors">
                Help
              </Link>
              <span>·</span>
              <Link to="/privacy" className="hover:text-brand transition-colors">
                Privacy
              </Link>
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              ConnectHub © {new Date().getFullYear()}
            </span>
          </footer>
        </aside>
      </div>
    </div>
  )
}

export default Home
