import React, { useState, useContext, useRef } from 'react'
import { RxCross1 } from "react-icons/rx";
import { userDatacontext } from '../context/UserContext';
import profile from '../assets/profile.webp'
import { FiPlus } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";
import axios from 'axios';
import { authdatacontext } from '../context/AuthContext';
;


function Editprofile() {
    const { edit, setedit, userdata, setuserdata } = useContext(userDatacontext)
    const [firstname, setfirstname] = useState(userdata?.firstname)
    const [lastname, setlastname] = useState(userdata?.lastname)
    const [username, setusername] = useState(userdata?.username)
    const [headline, setheadline] = useState(userdata?.headline)
    const [location, setlocation] = useState(userdata?.location)
    const [gender, setgender] = useState(userdata?.gender)
    const [skills, setskills] = useState(userdata?.skills)
    const [newskills, setnewskills] = useState()
    const [educations, seteducation] = useState(userdata?.education)
    let { serverURL } = useContext(authdatacontext)
    const [saving, setsaving] = useState(false)
    const [neweducation, setneweducation] = useState({
        college: "",
        degree: "",
        fieldOfStudy: "",
    })
    const [experiences, setexperiences] = useState(userdata?.experience)
    const [newexperiences, setnewexperiences] = useState({
        title: "",
        company: "",
        description: ""
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
        setnewskills("")
    }
    function removeskills(skill) {
        if (skills.includes(skill)) {
            setskills(skills.filter((s) => s != skill))
        }
    }
    const addeducation = (e) => {
        e.preventDefault()
        if (neweducation && !educations.includes(neweducation)) {
            seteducation([...educations, neweducation])
        }
        setneweducation({
            college: "",
            degree: "",
            fieldOfStudy: "",
        })
    }
    function removeeducation(education) {
        if (educations.includes(education)) {
            seteducation(educations.filter((s) => s != education))
        }
    }
    const addexperience = (e) => {
        e.preventDefault()
        if (newexperiences && !experiences.includes(newexperiences)) {
            setexperiences([...experiences, newexperiences])
        }
        setnewexperiences({
            title: "",
            company: "",
            description: ""
        })
    }
    function removeexperience(experience) {
        if (experiences.includes(experience)) {
            setexperiences(experiences.filter((s) => s != experience))
        }
    }
    function handleprofileImage(e) {
        const file = e.target.files[0]
        setbackendProfileImage(file)
        setfrontendProfileImage(URL.createObjectURL(file))
    }
    function handlecoverImage(e) {
        const file = e.target.files[0]
        setbackendCoverImage(file)
        setfrontendCoverImage(URL.createObjectURL(file))
    }

    const handleSaveProfile = async () => {
        setsaving(true)
        try {

            let formData = new FormData()
            formData.append("firstname", firstname)
            formData.append("lastname", lastname)
            formData.append("username", username)
            formData.append("headline", headline)
            formData.append("location", location)
            formData.append("gender", gender)
            formData.append("skills", JSON.stringify(skills))
            formData.append("educations", JSON.stringify(educations))
            formData.append("experience", JSON.stringify(experiences))
            if (backendProfileImage) {
                formData.append("profileImage", backendProfileImage)
            }
            if (backendCoverImage) {
                formData.append("coverImage", backendCoverImage)
            }

            const result = await axios.put(serverURL + "/api/v1/user/updateprofile", formData, { withCredentials: true })
            console.log(result);
            setuserdata(result.data.user)
            setsaving(false)
            setedit(false)
        } catch (error) {
            console.log(error);

        }
    }
    return (
            <div className='w-full h-[100vh] fixed top-0 z-[150] flex justify-center items-center'>
            <input type="file" accept="imag/*" hidden ref={profileImage} onChange={handleprofileImage} />
            <input type="file" accept="imag/*" hidden ref={coverImage} onChange={handlecoverImage} />
            <div className='w-full h-full bg-slate-900/40 backdrop-blur-sm absolute top-0 left-0 transition-all'></div>
            <div className='w-[90%] max-w-[550px] max-h-[85vh] bg-white/90 backdrop-blur-xl z-[200] relative shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60 rounded-3xl p-6 overflow-auto animate-in fade-in zoom-in-95 duration-200'>
                <div className='absolute right-4 top-4'>
                    <RxCross1 className='h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200' onClick={() => setedit(false)} />
                </div>
                <div className='w-full h-[150px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl my-4 relative overflow-hidden'>
                    <img src={frontendCoverImage} alt="" className='h-[150px] w-full object-cover opacity-90' />
                    <MdOutlineCameraAlt onClick={() => coverImage.current.click()} className='absolute top-12 right-4 h-6 w-6 text-white cursor-pointer drop-shadow-md hover:opacity-90 transition-opacity duration-200' />
                </div>
                <div className='w-[80px] h-[80px] rounded-full overflow-hidden absolute top-[150px] ml-5 ring-4 ring-white shadow-sm'>
                    <img src={frontendProfileImage} alt="" className='w-full h-full object-cover' />

                </div>
                <div className='w-5 h-5 bg-blue-600 cursor-pointer absolute top-[190px] left-[110px] rounded-full flex justify-center items-center shadow-md ring-2 ring-white hover:bg-blue-700 transition-colors duration-200'>
                    <FiPlus className='text-white w-3 h-3' onClick={() => profileImage.current.click()} />
                </div>
                <div className='w-full flex flex-col items-center justify-center gap-4 mt-12'>
                    <input type="text" placeholder='firstname' value={firstname} onChange={(e) => setfirstname(e.target.value)} className='w-full h-11 outline-none border border-white/60 bg-white/50 rounded-2xl px-3 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 hover:bg-white/70 focus:bg-white/80 transition-all duration-300 shadow-sm' />
                    <input type="text" placeholder='lastname' value={lastname} onChange={(e) => setlastname(e.target.value)} className='w-full h-11 outline-none border border-white/60 bg-white/50 rounded-2xl px-3 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 hover:bg-white/70 focus:bg-white/80 transition-all duration-300 shadow-sm' />
                    <input type="text" placeholder='username' value={username} onChange={(e) => setusername(e.target.value)} className='w-full h-11 outline-none border border-white/60 bg-white/50 rounded-2xl px-3 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 hover:bg-white/70 focus:bg-white/80 transition-all duration-300 shadow-sm' />
                    <input type="text" placeholder='headline' value={headline} onChange={(e) => setheadline(e.target.value)} className='w-full h-11 outline-none border border-white/60 bg-white/50 rounded-2xl px-3 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 hover:bg-white/70 focus:bg-white/80 transition-all duration-300 shadow-sm' />
                    <input type="text" placeholder='location' value={location} onChange={(e) => setlocation(e.target.value)} className='w-full h-11 outline-none border border-white/60 bg-white/50 rounded-2xl px-3 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 hover:bg-white/70 focus:bg-white/80 transition-all duration-300 shadow-sm' />
                    <input type="text" placeholder='gender (male/female/other)' value={gender} onChange={(e) => setgender(e.target.value)} className='w-full h-11 outline-none border border-white/60 bg-white/50 rounded-2xl px-3 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 hover:bg-white/70 focus:bg-white/80 transition-all duration-300 shadow-sm' />
                    <div className='w-full p-4 border border-white/60 flex flex-col gap-3 rounded-3xl bg-white/40 backdrop-blur-sm shadow-sm'>
                        <h1 className='text-lg font-semibold text-gray-900'>Skills</h1>
                        {skills && <div className='flex flex-col gap-3 '>
                            {skills.map((skill, index) => (
                                <div className='w-full min-h-10 border border-white/60 bg-white/60 rounded-2xl flex justify-between items-center px-4 py-2 shadow-sm' key={index}><span className='text-base text-gray-800'>
                                    {skill}</span><RxCross1 className='h-5 w-5 text-gray-500 hover:text-gray-800 cursor-pointer transition-colors duration-200' onClick={() => removeskills(skill)} />
                                </div>
                            ))}
                        </div>}
                        <div className='flex flex-col gap-3 items-start' >
                            <input type="text" placeholder='add new skill' value={newskills} onChange={(e) => setnewskills(e.target.value)} className='w-full h-11 outline-none border border-white/60 bg-white/50 rounded-2xl px-3 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 hover:bg-white/70 focus:bg-white/80 transition-all duration-300 shadow-sm' />
                            <button onClick={addskills} className='w-full h-10 rounded-2xl bg-white/50 text-gray-900 border border-white/60 shadow-sm hover:bg-white hover:shadow-md font-medium transition-all duration-200'>Add</button>
                        </div>
                    </div>
                    <div className='w-full p-4 border border-white/60 flex flex-col gap-3 rounded-3xl bg-white/40 backdrop-blur-sm shadow-sm'>
                        <h1 className='text-lg font-semibold text-gray-900'>Education</h1>
                        {educations && <div className='flex flex-col gap-3 '>
                            {educations.map((education, index) => (
                                <div className='w-full border border-white/60 bg-white/60 rounded-2xl flex justify-between items-start gap-3 px-4 py-3 shadow-sm' key={index}>
                                    <div className='text-sm text-gray-700'>
                                        <span className='font-medium text-gray-900'>College : {education.college}</span>
                                        <div>Degree : {education.degree}</div>
                                        <div className='text-gray-500'>Education : {education.fieldOfStudy}</div>
                                    </div>
                                    <RxCross1 className='h-5 w-5 text-gray-500 hover:text-gray-800 cursor-pointer flex-shrink-0 transition-colors duration-200' onClick={() => removeeducation(education)} />
                                </div>
                            ))}
                        </div>}
                        <div className='flex flex-col gap-3 items-start' >
                            <input type="text" placeholder='college' value={neweducation.college} onChange={(e) => setneweducation({ ...neweducation, college: e.target.value })} className='w-full h-11 outline-none border border-white/60 bg-white/50 rounded-2xl px-3 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 hover:bg-white/70 focus:bg-white/80 transition-all duration-300 shadow-sm' />
                            <input type="text" placeholder='degree' value={neweducation.degree} onChange={(e) => setneweducation({ ...neweducation, degree: e.target.value })} className='w-full h-11 outline-none border border-white/60 bg-white/50 rounded-2xl px-3 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 hover:bg-white/70 focus:bg-white/80 transition-all duration-300 shadow-sm' />
                            <input type="text" placeholder='fieldOfStudy' value={neweducation.fieldOfStudy} onChange={(e) => setneweducation({ ...neweducation, fieldOfStudy: e.target.value })} className='w-full h-11 outline-none border border-white/60 bg-white/50 rounded-2xl px-3 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 hover:bg-white/70 focus:bg-white/80 transition-all duration-300 shadow-sm' />
                            <button onClick={addeducation} className='w-full h-10 rounded-2xl bg-white/50 text-gray-900 border border-white/60 shadow-sm hover:bg-white hover:shadow-md font-medium transition-all duration-200'>Add</button>
                        </div>
                    </div>
                    <div className='w-full p-4 border border-white/60 flex flex-col gap-3 rounded-3xl bg-white/40 backdrop-blur-sm shadow-sm'>
                        <h1 className='text-lg font-semibold text-gray-900'>experience</h1>
                        {experiences && <div className='flex flex-col gap-3 '>
                            {experiences.map((experience, index) => (
                                <div className='w-full border border-white/60 bg-white/60 rounded-2xl flex justify-between items-start gap-3 px-4 py-3 shadow-sm' key={index}>
                                    <div className='text-sm text-gray-700'>
                                        <span className='font-medium text-gray-900'>title : {experience.title}</span>
                                        <div>company : {experience.company}</div>
                                        <div className='text-gray-500'>description : {experience.description}</div>
                                    </div>
                                    <RxCross1 className='h-5 w-5 text-gray-500 hover:text-gray-800 cursor-pointer flex-shrink-0 transition-colors duration-200' onClick={() => removeexperience(experience)} />
                                </div>
                            ))}
                        </div>}
                        <div className='flex flex-col gap-3 items-start' >
                            <input type="text" placeholder='title' value={newexperiences.title} onChange={(e) => setnewexperiences({ ...newexperiences, title: e.target.value })} className='w-full h-11 outline-none border border-white/60 bg-white/50 rounded-2xl px-3 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 hover:bg-white/70 focus:bg-white/80 transition-all duration-300 shadow-sm' />
                            <input type="text" placeholder='company' value={newexperiences.company} onChange={(e) => setnewexperiences({ ...newexperiences, company: e.target.value })} className='w-full h-11 outline-none border border-white/60 bg-white/50 rounded-2xl px-3 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 hover:bg-white/70 focus:bg-white/80 transition-all duration-300 shadow-sm' />
                            <input type="text" placeholder='description' value={newexperiences.description} onChange={(e) => setnewexperiences({ ...newexperiences, description: e.target.value })} className='w-full h-11 outline-none border border-white/60 bg-white/50 rounded-2xl px-3 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 hover:bg-white/70 focus:bg-white/80 transition-all duration-300 shadow-sm' />
                            <button onClick={addexperience} className='w-full h-10 rounded-2xl bg-white/50 text-gray-900 border border-white/60 shadow-sm hover:bg-white hover:shadow-md font-medium transition-all duration-200'>Add</button>
                        </div>

                    </div>
                    <button className='w-full mt-4 h-12 rounded-2xl bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg cursor-pointer font-medium transition-all duration-200 disabled:opacity-60' disabled={saving} onClick={handleSaveProfile} >{saving ? "Saving..." : "Save profile"}</button>
                </div>

            </div>

        </div>
    )
}

export default Editprofile