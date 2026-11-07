import React, { useEffect, useState, useContext } from 'react'
import Nav from '../component/Nav'
import profile from '../assets/profile.webp'
import { FiPlus } from 'react-icons/fi'
import { MdOutlineCameraAlt } from 'react-icons/md'
import { userDatacontext } from '../context/UserContext'
import { HiPencil, HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineSparkles, HiOutlineDocumentText } from 'react-icons/hi2'
import Editprofile from '../component/Editprofile'
import Post from '../component/Post'
import ConnectionButton from '../component/ConnectionButton'
import Avatar from '../component/ui/Avatar'
import Button from '../component/ui/Button'
import Badge from '../component/ui/Badge'
import EmptyState from '../component/ui/EmptyState'

function Profile() {
  const { userdata, edit, setedit, postdata, profiledata } = useContext(userDatacontext)
  const [profilePosts, setprofilePosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')

  useEffect(() => {
    if (profiledata?._id && Array.isArray(postdata)) {
      setprofilePosts(
        postdata.filter((post) => post.author?._id === profiledata._id)
      )
    } else {
      setprofilePosts([])
    }
  }, [profiledata, postdata])

  if (!profiledata || Object.keys(profiledata).length === 0) {
    return (
      <div className="w-full min-h-screen pt-20 flex flex-col items-center pb-10">
        <Nav />
        <div className="text-slate-400 mt-20 text-sm font-medium">No profile data found.</div>
      </div>
    )
  }

  const isOwnProfile = userdata?._id && profiledata?._id && userdata._id === profiledata._id

  const tabs = [
    { id: 'posts', label: 'Posts', icon: HiOutlineDocumentText, count: profilePosts.length },
    { id: 'skills', label: 'Skills', icon: HiOutlineSparkles, count: profiledata.skills?.length || 0 },
    { id: 'education', label: 'Education', icon: HiOutlineAcademicCap, count: profiledata.education?.length || 0 },
    { id: 'experience', label: 'Experience', icon: HiOutlineBriefcase, count: profiledata.experience?.length || 0 }
  ]

  return (
    <div className="w-full min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col gap-6">
      {edit && <Editprofile />}
      <Nav />

      {/* Main Profile Header Card */}
      <section aria-label="Profile summary" className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800 overflow-hidden relative">
        {/* Cover Banner */}
        <div className="w-full h-36 sm:h-48 bg-gradient-to-r from-brand to-accent relative overflow-hidden flex items-center justify-center">
          {profiledata.coverImage && (
            <img
              src={profiledata.coverImage}
              alt="Cover banner"
              className="w-full h-full object-cover opacity-90"
            />
          )}
          {isOwnProfile && (
            <button
              type="button"
              aria-label="Edit cover photo"
              onClick={() => setedit(true)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/50 backdrop-blur-xs flex items-center justify-center text-white hover:bg-slate-900/80 transition-colors cursor-pointer"
            >
              <MdOutlineCameraAlt className="w-4.5 h-4.5" />
            </button>
          )}
        </div>

        {/* Profile Content Container in Normal Flow */}
        <div className="px-5 sm:px-8 pb-6 flex flex-col">
          {/* Avatar and Action Button Row */}
          <div className="relative -mt-12 sm:-mt-16 mb-4 flex items-end justify-between gap-4">
            <div className="relative inline-block">
              <Avatar
                src={profiledata.profileImage || profile}
                name={`${profiledata?.firstname || ''} ${profiledata?.lastname || ''}`}
                size="2xl"
                ring={true}
                className="ring-4 ring-white dark:ring-slate-900 shadow-md"
                onClick={isOwnProfile ? () => setedit(true) : undefined}
              />
              {isOwnProfile && (
                <button
                  type="button"
                  aria-label="Edit avatar"
                  onClick={() => setedit(true)}
                  className="w-7 h-7 bg-brand hover:bg-brand-dark cursor-pointer absolute bottom-1 right-1 rounded-full flex justify-center items-center text-white shadow-sm ring-2 ring-white dark:ring-slate-900 transition-colors duration-150"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Action button */}
            <div className="pb-1">
              {isOwnProfile ? (
                <Button
                  variant="outline"
                  size="sm"
                  icon={HiPencil}
                  onClick={() => setedit(true)}
                  className="font-semibold"
                >
                  Edit profile
                </Button>
              ) : (
                profiledata._id && <ConnectionButton userId={profiledata._id} />
              )}
            </div>
          </div>

          {/* User Details ALWAYS below Avatar */}
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-snug">
              {`${profiledata?.firstname || ''} ${profiledata?.lastname || ''}`}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium mt-1 leading-relaxed">
              {profiledata.headline || 'Member at ConnectHub'}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              {profiledata.location && (
                <span className="font-medium text-slate-600 dark:text-slate-300">
                  {profiledata.location}
                </span>
              )}
              {profiledata.location && <span>·</span>}
              <span className="font-semibold text-brand">
                {profiledata?.connections?.length || 0}{' '}
                {profiledata?.connections?.length === 1 ? 'connection' : 'connections'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Bar */}
      <nav aria-label="Profile navigation" className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xs border border-slate-200/80 dark:border-slate-800 rounded-2xl p-1.5 flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer select-none ${
                isActive
                  ? 'bg-brand text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/25 text-white' : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                {tab.count}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Tab Content Panels */}
      {activeTab === 'posts' && (
        <section aria-label="User posts" className="flex flex-col gap-4">
          <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 px-6 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Posts ({profilePosts?.length || 0})
            </h2>
          </div>

          {profilePosts.length > 0 ? (
            profilePosts.map((post) => (
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
              icon={HiOutlineDocumentText}
              title="No posts yet"
              description="This member hasn't published any posts to the community feed."
            />
          )}
        </section>
      )}

      {activeTab === 'skills' && (
        <section aria-label="Skills" className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              Skills ({profiledata.skills?.length || 0})
            </h2>
            {isOwnProfile && (
              <Button variant="outline" size="sm" onClick={() => setedit(true)}>
                Add Skill
              </Button>
            )}
          </div>

          {profiledata.skills && profiledata.skills.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2.5">
              {profiledata.skills.map((skill, index) => (
                <Badge key={index} variant="accent" size="lg">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 dark:text-slate-500">No skills added yet.</p>
          )}
        </section>
      )}

      {activeTab === 'education' && (
        <section aria-label="Education" className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              Education ({profiledata?.education?.length || 0})
            </h2>
            {isOwnProfile && (
              <Button variant="outline" size="sm" onClick={() => setedit(true)}>
                Add Education
              </Button>
            )}
          </div>

          {profiledata?.education && profiledata.education.length > 0 ? (
            <div className="flex flex-col gap-4">
              {profiledata.education.map((edu, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700"
                >
                  <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {edu.college}
                  </div>
                  <div className="text-xs sm:text-sm text-brand dark:text-blue-400 font-medium">
                    {edu.degree}
                  </div>
                  {edu.fieldOfStudy && (
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Field of Study: {edu.fieldOfStudy}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 dark:text-slate-500">No education history added yet.</p>
          )}
        </section>
      )}

      {activeTab === 'experience' && (
        <section aria-label="Experience" className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              Experience ({profiledata?.experience?.length || 0})
            </h2>
            {isOwnProfile && (
              <Button variant="outline" size="sm" onClick={() => setedit(true)}>
                Add Experience
              </Button>
            )}
          </div>

          {profiledata?.experience && profiledata.experience.length > 0 ? (
            <div className="flex flex-col gap-4">
              {profiledata.experience.map((exp, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700"
                >
                  <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {exp.title}
                  </div>
                  <div className="text-xs sm:text-sm text-brand dark:text-blue-400 font-medium">
                    {exp.company}
                  </div>
                  {exp.description && (
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 dark:text-slate-500">No experience added yet.</p>
          )}
        </section>
      )}
    </div>
  )
}

export default Profile
