import React, { useState, useContext, useRef } from 'react'
import { RxCross1 } from "react-icons/rx";
import { userDatacontext } from '../context/UserContext';
import profile from '../assets/profile.webp'
import { FiPlus } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";
import axios from 'axios';
import { authdatacontext } from '../context/Authcontext';
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
    const [frontendProfileImage, setfrontendProfileImage] = useState(userdata?.profileImage||profile)
    const [backendProfileImage, setbackendProfileImage] = useState(null)
    const [frontendCoverImage, setfrontendCoverImage] = useState(userdata?.coverImage||null)    
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

    const handleSaveProfile=async()=>{
        setsaving(true)
        try {

            let formData= new FormData()
            formData.append("firstname",firstname)
            formData.append("lastname",lastname)
            formData.append("username",username)
            formData.append("headline",headline)
            formData.append("location",location)
            formData.append("gender",gender)
            formData.append("skills", JSON.stringify(skills))
            formData.append("educations", JSON.stringify(educations))
            formData.append("experience", JSON.stringify(experiences))
            if (backendProfileImage) {
                formData.append("profileImage",backendProfileImage)
            }
            if (backendCoverImage) {
                formData.append("coverImage",backendCoverImage)
            }

            const result= await axios.put(serverURL+"/api/v1/user/updateprofile",formData,{withCredentials:true})
            console.log(result);
           setuserdata(result.data.user)
            setsaving(false)
            setedit(false)
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div className='w-full h-[100vh] fixed top-0  z-100 flex justify-center items-center'>
            <input type="file" accept="imag/*" hidden ref={profileImage} onChange={handleprofileImage} />
            <input type="file" accept="imag/*" hidden ref={coverImage} onChange={handlecoverImage}/>
            <div className='w-full h-full bg-black opacity-[0.5] absolute'></div>
            <div className='w-[90%] max-w-[500px] h-[550px] bg-white z-200 relative shadow-lg rounded-lg p-[20px] overflow-auto'>
                <div className='absolute right-[10px] top-3 '>
                    <RxCross1 className='h-[20px] w-[20px] text-gray-800 font-bold cursor-pointer' onClick={() => setedit(false)} />
                </div>
                <div className='w-full h-[150px] bg-gray-500 rounded-lg my-4'>
                    <img src={frontendCoverImage} alt="" className='h-[150px] w-full' />
                    <MdOutlineCameraAlt onClick={()=>coverImage.current.click()} className='absolute top-[50px] right-[15px] h-[25px] w-[60px] text-[white] cursor-pointer' />
                </div>
                <div className='w-[80px] h-[80px] rounded-full overflow-hidden absolute top-[150px] ml-5'>
                    <img src={frontendProfileImage} alt="" className='w-full  h-full' />

                </div>
                <div className='w-[20px] h-[20px] bg-[#17c1ff] cursor-pointer absolute top-[190px] left-[110px] rounded-full flex justify-center items-center'>
                    <FiPlus className='text-white' onClick={()=>profileImage.current.click()}/>
                </div>
                <div className='w-full flex flex-col items-center justify-center gap-[20px] mt-[50px]'>
                    <input type="text" placeholder='firstname' value={firstname} onChange={(e) => setfirstname(e.target.value)} className='w-full h-[45px] outline-none border-2 rounded-lg brder-gray-500 px-[10px] py-[5px] text-[16px]' />
                    <input type="text" placeholder='lastname' value={lastname} onChange={(e) => setlastname(e.target.value)} className='w-full h-[45px] outline-none border-2 rounded-lg brder-gray-500 px-[10px] py-[5px] text-[16px]' />
                    <input type="text" placeholder='username' value={username} onChange={(e) => setusername(e.target.value)} className='w-full h-[45px] outline-none border-2 rounded-lg brder-gray-500 px-[10px] py-[5px] text-[16px]' />
                    <input type="text" placeholder='headline' value={headline} onChange={(e) => setheadline(e.target.value)} className='w-full h-[45px] outline-none border-2 rounded-lg brder-gray-500 px-[10px] py-[5px] text-[16px]' />
                    <input type="text" placeholder='location' value={location} onChange={(e) => setlocation(e.target.value)} className='w-full h-[45px] outline-none border-2 rounded-lg brder-gray-500 px-[10px] py-[5px] text-[16px]' />
                    <input type="text" placeholder='gender (male/female/other)' value={gender} onChange={(e) => setgender(e.target.value)} className='w-full h-[45px] outline-none border-2 rounded-lg brder-gray-500 px-[10px] py-[5px] text-[16px]' />
                    <div className='w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg'>
                        <h1 className='text-[19px] font-semibold'>Skills</h1>
                        {skills && <div className='flex flex-col gap-3 '>
                            {skills.map((skill, index) => (
                                <div className='w-full h-[40px] border-[1px] border-gray-600 bg-gray-200 flex  justify-between items-center  px-[10px] py-[5px]' key={index}><span>
                                    {skill}</span><RxCross1 className='h-[20px] w-[20px] text-gray-800 font-bold cursor-pointer' onClick={() => removeskills(skill)} />
                                </div>
                            ))}
                        </div>}
                        <div className='flex flex-col gap-[10px] items-start' >
                            <input type="text" placeholder='add new skill' value={newskills} onChange={(e) => setnewskills(e.target.value)} className='w-full h-455px] outline-none border-2 rounded-lg brder-gray-500 px-[10px] py-[5px] text-[16px]' />
                            <button onClick={addskills} className='w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] cursor-pointer text-[#2dc0ff]'>Add</button>
                        </div>
                    </div>
                    <div className='w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg'>
                        <h1 className='text-[19px] font-semibold'>Education</h1>
                        {educations && <div className='flex flex-col gap-3 '>
                            {educations.map((education, index) => (
                                <div className='w-full border-[1px] border-gray-600 bg-gray-200 flex  justify-between items-center  px-[10px] py-[5px]' key={index}>
                                    <div>
                                        <span>College : {education.college}</span>
                                        <div>Degree : {education.degree}</div>
                                        <div>Education : {education.fieldOfStudy}</div>
                                    </div>
                                    <RxCross1 className='h-[20px] w-[20px] text-gray-800 font-bold cursor-pointer' onClick={() => removeeducation(education)} />
                                </div>
                            ))}
                        </div>}
                        <div className='flex flex-col gap-[10px] items-start' >
                            <input type="text" placeholder='college' value={neweducation.college} onChange={(e) => setneweducation({ ...neweducation, college: e.target.value })} className='w-full h-[45px] outline-none border-2 rounded-lg brder-gray-500 px-[10px] py-[5px] text-[16px]' />
                            <input type="text" placeholder='degree' value={neweducation.degree} onChange={(e) => setneweducation({ ...neweducation, degree: e.target.value })} className='w-full h-[45px] outline-none border-2 rounded-lg brder-gray-500 px-[10px] py-[5px] text-[16px]' />
                            <input type="text" placeholder='fieldOfStudy' value={neweducation.fieldOfStudy} onChange={(e) => setneweducation({ ...neweducation, fieldOfStudy: e.target.value })} className='w-full h-[45px] outline-none border-2 rounded-lg brder-gray-500 px-[10px] py-[5px] text-[16px]' />
                            <button onClick={addeducation} className='w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] cursor-pointer text-[#2dc0ff]'>Add</button>
                        </div>
                    </div>
                    <div className='w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg'>
                        <h1 className='text-[19px] font-semibold'>experience</h1>
                        {experiences && <div className='flex flex-col gap-3 '>
                            {experiences.map((experience, index) => (
                                <div className='w-full border-[1px] border-gray-600 bg-gray-200 flex  justify-between items-center  px-[10px] py-[5px]' key={index}>
                                    <div>
                                        <span>title : {experience.title}</span>
                                        <div>company : {experience.company}</div>
                                        <div>description : {experience.description}</div>
                                    </div>
                                    <RxCross1 className='h-[20px] w-[20px] text-gray-800 font-bold cursor-pointer' onClick={() => removeexperience(experience)} />
                                </div>
                            ))}
                        </div>}
                        <div className='flex flex-col gap-[10px] items-start' >
                            <input type="text" placeholder='title' value={newexperiences.title} onChange={(e) => setnewexperiences({ ...newexperiences, title: e.target.value })} className='w-full h-[45px] outline-none border-2 rounded-lg brder-gray-500 px-[10px] py-[5px] text-[16px]' />
                            <input type="text" placeholder='company' value={newexperiences.company} onChange={(e) => setnewexperiences({ ...newexperiences, company: e.target.value })} className='w-full h-[45px] outline-none border-2 rounded-lg brder-gray-500 px-[10px] py-[5px] text-[16px]' />
                            <input type="text" placeholder='description' value={newexperiences.description} onChange={(e) => setnewexperiences({ ...newexperiences, description: e.target.value })} className='w-full h-[45px] outline-none border-2 rounded-lg brder-gray-500 px-[10px] py-[5px] text-[16px]' />
                            <button onClick={addexperience} className='w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] cursor-pointer text-[#2dc0ff]'>Add</button>
                        </div>
                
                    </div>
                    <button className='w-[100%] h-[50px] rounded-full bg-[#24b2ff] text-white cursor-pointer 'disabled={saving}  onClick={handleSaveProfile} >{saving?"saving...":"Save profile"}</button>
                </div>
                
            </div>

        </div>
    )
}

export default Editprofile