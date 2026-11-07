import React, { useState, useContext, useRef } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { userDatacontext } from '../context/UserContext'
import profile from '../assets/profile.webp'
import { FiPlus } from 'react-icons/fi'
import { MdOutlineCameraAlt } from 'react-icons/md'
import axios from 'axios'
import { authdatacontext } from '../context/AuthContext'
import logger from '../utils/logger'
import Button from './ui/Button'
import Badge from './ui/Badge'
import Avatar from './ui/Avatar'

function Editprofile() {
  const { setedit, userdata, setuserdata } = useContext(userDatacontext)
  const [firstname, setfirstname] = useState(userdata?.firstname || '')
  const [lastname, setlastname] = useState(userdata?.lastname || '')
  const [username, setusername] = useState(userdata?.username || '')
  const [headline, setheadline] = useState(userdata?.headline || '')
  const [location, setlocation] = useState(userdata?.location || '')
  const [gender, setgender] = useState(userdata?.gender || '')
  const [skills, setskills] = useState(userdata?.skills || [])
  const [newskills, setnewskills] = useState('')
  const [educations, seteducation] = useState(userdata?.education || [])
  const { serverURL } = useContext(authdatacontext)
  const [saving, setsaving] = useState(false)
  const [neweducation, setneweducation] = useState({
    college: '',
    degree: '',
    fieldOfStudy: ''
  })
  const [experiences, setexperiences] = useState(userdata?.experience || [])
  const [newexperiences, setnewexperiences] = useState({
    title: '',
    company: '',
    description: ''
  })
  const [frontendProfileImage, setfrontendProfileImage] = useState(userdata?.profileImage || profile)
  const [backendProfileImage, setbackendProfileImage] = useState(null)
  const [frontendCoverImage, setfrontendCoverImage] = useState(userdata?.coverImage || null)
  const [backendCoverImage, setbackendCoverImage] = useState(null)
  const profileImage = useRef()
  const coverImage = useRef()

  const addskills = (e) => {
    e.preventDefault()
    if (newskills && !skills.includes(newskills)) {
      setskills([...skills, newskills])
    }
    setnewskills('')
  }

  function removeskills(skill) {
    if (skills.includes(skill)) {
      setskills(skills.filter((s) => s !== skill))
    }
  }

  const addeducation = (e) => {
    e.preventDefault()
    if (neweducation.college) {
      seteducation([...educations, neweducation])
      setneweducation({
        college: '',
        degree: '',
        fieldOfStudy: ''
      })
    }
  }

  function removeeducation(education) {
    seteducation(educations.filter((s) => s !== education))
  }

  const addexperience = (e) => {
    e.preventDefault()
    if (newexperiences.title) {
      setexperiences([...experiences, newexperiences])
      setnewexperiences({
        title: '',
        company: '',
        description: ''
      })
    }
  }

  function removeexperience(experience) {
    setexperiences(experiences.filter((s) => s !== experience))
  }

  function handleprofileImage(e) {
    const file = e.target.files[0]
    if (file) {
      setbackendProfileImage(file)
      setfrontendProfileImage(URL.createObjectURL(file))
    }
  }

  function handlecoverImage(e) {
    const file = e.target.files[0]
    if (file) {
      setbackendCoverImage(file)
      setfrontendCoverImage(URL.createObjectURL(file))
    }
  }

  const handleSaveProfile = async () => {
    setsaving(true)
    try {
      let formData = new FormData()
      formData.append('firstname', firstname)
      formData.append('lastname', lastname)
      formData.append('username', username)
      formData.append('headline', headline)
      formData.append('location', location)
      formData.append('gender', gender)
      formData.append('skills', JSON.stringify(skills))
      formData.append('educations', JSON.stringify(educations))
      formData.append('experience', JSON.stringify(experiences))
      if (backendProfileImage) {
        formData.append('profileImage', backendProfileImage)
      }
      if (backendCoverImage) {
        formData.append('coverImage', backendCoverImage)
      }

      const result = await axios.put(`${serverURL}/api/v1/user/updateprofile`, formData, {
        withCredentials: true
      })
      if (result.data?.user) {
        setuserdata(result.data.user)
      }
      setedit(false)
    } catch (error) {
      logger.error('Error updating profile:', error)
    } finally {
      setsaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[150] overflow-y-auto p-4 sm:p-6 flex items-start justify-center bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <input type="file" accept="image/*" hidden ref={profileImage} onChange={handleprofileImage} />
      <input type="file" accept="image/*" hidden ref={coverImage} onChange={handlecoverImage} />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-xl my-6 sm:my-10 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 flex flex-col max-h-[calc(100vh-4rem)] z-10 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display">
            Edit Profile
          </h2>
          <button
            type="button"
            onClick={() => setedit(false)}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors"
          >
            <RxCross1 className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto flex-1 pr-1.5 py-4 flex flex-col gap-6">
          {/* Cover and Avatar Section */}
          <div className="flex flex-col">
            <div className="w-full h-32 sm:h-36 rounded-2xl bg-gradient-to-r from-brand to-accent relative overflow-hidden flex items-center justify-center">
              {frontendCoverImage && (
                <img
                  src={frontendCoverImage}
                  alt="Cover preview"
                  className="h-full w-full object-cover opacity-90"
                />
              )}
              <button
                type="button"
                onClick={() => coverImage.current.click()}
                aria-label="Change cover picture"
                className="absolute top-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-slate-900/60 hover:bg-slate-900/90 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-xs transition-colors cursor-pointer shadow-sm"
              >
                <MdOutlineCameraAlt className="w-4 h-4" />
                <span>Change Cover</span>
              </button>
            </div>

            {/* Avatar in normal flow pulled up into banner */}
            <div className="relative -mt-10 mb-4 pl-4 flex items-end">
              <div className="relative inline-block">
                <Avatar
                  src={frontendProfileImage}
                  name={`${firstname} ${lastname}`}
                  size="2xl"
                  ring={true}
                  className="ring-4 ring-white dark:ring-slate-900 shadow-md"
                />
                <button
                  type="button"
                  onClick={() => profileImage.current.click()}
                  aria-label="Change profile picture"
                  className="w-7 h-7 bg-brand hover:bg-brand-dark cursor-pointer absolute bottom-0 right-0 rounded-full flex justify-center items-center text-white shadow-sm ring-2 ring-white dark:ring-slate-900 transition-colors duration-150"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Text Inputs with Explicit High-Contrast Dark-Mode Colors */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                  className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand dark:focus:border-blue-500 focus:ring-2 focus:ring-brand/20 outline-none transition-all shadow-2xs"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand dark:focus:border-blue-500 focus:ring-2 focus:ring-brand/20 outline-none transition-all shadow-2xs"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand dark:focus:border-blue-500 focus:ring-2 focus:ring-brand/20 outline-none transition-all shadow-2xs"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                Headline
              </label>
              <input
                type="text"
                placeholder="Headline / Role (e.g. Senior Frontend Engineer)"
                value={headline}
                onChange={(e) => setheadline(e.target.value)}
                className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand dark:focus:border-blue-500 focus:ring-2 focus:ring-brand/20 outline-none transition-all shadow-2xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City, Country"
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                  className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand dark:focus:border-blue-500 focus:ring-2 focus:ring-brand/20 outline-none transition-all shadow-2xs"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Gender
                </label>
                <input
                  type="text"
                  placeholder="male / female / other"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand dark:focus:border-blue-500 focus:ring-2 focus:ring-brand/20 outline-none transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Skills Management */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col gap-3">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Skills
              </h3>
              {skills && skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="accent"
                      size="md"
                      onRemove={() => removeskills(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new skill (e.g. TypeScript, React)"
                  value={newskills}
                  onChange={(e) => setnewskills(e.target.value)}
                  className="flex-1 h-10 px-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand outline-none"
                />
                <Button variant="secondary" size="md" onClick={addskills}>
                  Add
                </Button>
              </div>
            </div>

            {/* Education Management */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col gap-3">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Education
              </h3>
              {educations && educations.length > 0 && (
                <div className="flex flex-col gap-2">
                  {educations.map((edu, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-xs sm:text-sm"
                    >
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          {edu.college}
                        </div>
                        <div className="text-brand dark:text-blue-400 font-medium">
                          {edu.degree}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400">
                          {edu.fieldOfStudy}
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove education"
                        onClick={() => removeeducation(edu)}
                        className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 cursor-pointer transition-colors"
                      >
                        <RxCross1 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="College / University"
                  value={neweducation.college}
                  onChange={(e) => setneweducation({ ...neweducation, college: e.target.value })}
                  className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand outline-none"
                />
                <input
                  type="text"
                  placeholder="Degree (e.g. B.Tech, Master's)"
                  value={neweducation.degree}
                  onChange={(e) => setneweducation({ ...neweducation, degree: e.target.value })}
                  className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand outline-none"
                />
                <input
                  type="text"
                  placeholder="Field of Study (e.g. Computer Science)"
                  value={neweducation.fieldOfStudy}
                  onChange={(e) =>
                    setneweducation({ ...neweducation, fieldOfStudy: e.target.value })
                  }
                  className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand outline-none"
                />
                <Button variant="secondary" size="sm" onClick={addeducation} className="self-end">
                  Add Education
                </Button>
              </div>
            </div>

            {/* Experience Management */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col gap-3">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Experience
              </h3>
              {experiences && experiences.length > 0 && (
                <div className="flex flex-col gap-2">
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-xs sm:text-sm"
                    >
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          {exp.title}
                        </div>
                        <div className="text-brand dark:text-blue-400 font-medium">
                          {exp.company}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400">
                          {exp.description}
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove experience"
                        onClick={() => removeexperience(exp)}
                        className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 cursor-pointer transition-colors"
                      >
                        <RxCross1 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Title / Role (e.g. Software Engineer)"
                  value={newexperiences.title}
                  onChange={(e) => setnewexperiences({ ...newexperiences, title: e.target.value })}
                  className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand outline-none"
                />
                <input
                  type="text"
                  placeholder="Company (e.g. Acme Corp)"
                  value={newexperiences.company}
                  onChange={(e) => setnewexperiences({ ...newexperiences, company: e.target.value })}
                  className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand outline-none"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newexperiences.description}
                  onChange={(e) =>
                    setnewexperiences({ ...newexperiences, description: e.target.value })
                  }
                  className="w-full h-10 px-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand outline-none"
                />
                <Button variant="secondary" size="sm" onClick={addexperience} className="self-end">
                  Add Experience
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
          <Button
            variant="primary"
            size="lg"
            disabled={saving}
            loading={saving}
            loadingText="Saving changes..."
            onClick={handleSaveProfile}
            className="w-full font-bold shadow-md"
          >
            Save profile
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Editprofile
