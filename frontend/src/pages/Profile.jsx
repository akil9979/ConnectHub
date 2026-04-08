import React, { useEffect } from 'react'
import Nav from '../component/Nav'
import profile from '../assets/profile.webp'
import { FiPlus } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";
import { userDatacontext } from '../context/UserContext'
import { HiPencil } from "react-icons/hi2";
import Editprofile from '../component/Editprofile';
import axios from 'axios';
import { authdatacontext } from '../context/Authcontext';
import Post from '../component/Post';
import ConnectionButton from '../component/ConnectionButton';


function Profile() {
    const { userdata, setuserdata, edit, setedit, postdata, setpostdata, profiledata, setprofiledata } = React.useContext(userDatacontext)
    const { serverURL } = React.useContext(authdatacontext)
    const [profilePosts, setprofilePosts] = React.useState([])
    const [activeTab, setActiveTab] = React.useState("posts")



    useEffect(() => {
        setprofilePosts(
            postdata.filter((post) => post.author._id === profiledata?._id)
        )
    }, [profiledata])

    return (
        <div className='w-full h-ful bg-[#F3F4F6] pt-[100px] flex flex-col items-center  pb-[40px]'>
            {edit && <Editprofile />}
            <Nav />
            <div className='w-full max-w-[900px] min-h-[100vh] flex flex-col gap-[10px] '>


                <div className='rounded-lg w-full  min-h-[300px] bg-[white] shadow-lg relative ' >
                    <div className='w-full h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center cursor-pointer'>
                        <img src={profiledata.coverImage} alt="" />
                        {userdata._id == profiledata._id && <MdOutlineCameraAlt className='absolute top-[20px] right-[15px] h-[25px] text-white w-[25px]' onClick={() => setedit(true)} />}

                    </div>
                    <div className='w-[70px] h-[70px] rounded-full flex justify-center items-center overflow-hidden absolute top-[50px] left-[35px] cursor-pointer'>
                        <img src={profiledata.profileImage || profile} alt="" className='w-full  h-full' />
                    </div>
                    {userdata._id == profiledata._id && <div className='w-[20px] h-[20px] bg-[#17c1ff] cursor-pointer absolute top-[95px] left-[90px] rounded-full flex justify-center items-center'>
                        <FiPlus className='text-white' onClick={() => setedit(true)} />
                    </div>}

                    <div className='mt-5 p-3'>
                        <div className='text-gray-700 font-bold text-[24px]'>{`${profiledata?.firstname} ${profiledata?.lastname}`}</div>

                        <div className=' text-[16px]'>{profiledata.headline}</div>
                        <div className=' text-[16px]'>{profiledata.location}</div>
                        <div className='text-[16px]'>{profiledata?.connections?.length} connections</div>
                        {userdata._id == profiledata._id && <button className=' w-[150px] h-[40px] rounded-full border-2 border-[#2dc0ff] cursor-pointer text-[#2dc0ff] my-[20px] flex justify-center items-center gap-3' onClick={() => setedit(true)}>Edit profile  <HiPencil /> </button>}
                        {userdata._id != profiledata._id && <ConnectionButton userId={profiledata._id} />}

                    </div>
                    
                </div>
                <div className="w-full bg-white shadow-lg rounded-lg flex justify-around items-center p-[15px] text-[18px] font-semibold text-gray-600">

                    <div
                        onClick={() => setActiveTab("posts")}
                        className={`cursor-pointer ${activeTab === "posts" && "text-[#24b2ff]"}`}
                    >
                        Posts
                    </div>

                    <div
                        onClick={() => setActiveTab("skills")}
                        className={`cursor-pointer ${activeTab === "skills" && "text-[#24b2ff]"}`}
                    >
                        Skills
                    </div>

                    <div
                        onClick={() => setActiveTab("education")}
                        className={`cursor-pointer ${activeTab === "education" && "text-[#24b2ff]"}`}
                    >
                        Education
                    </div>

                    <div
                        onClick={() => setActiveTab("experience")}
                        className={`cursor-pointer ${activeTab === "experience" && "text-[#24b2ff]"}`}
                    >
                        Experience
                    </div>

                </div>
                {activeTab==="posts" && ( <div className='flex flex-col gap-[10px]'>
                    <div className='w-full  min-h-[100px] flex items-center p-[20px] text-[22px] text-gray-600 font-semibold bg-white shadow-lg rounded-lg w-full'>
                        {`Posts (${profilePosts?.length})`}
                    </div>
                    <div >
                        {profilePosts.map((post, index) => (
                            <Post key={index} id={post._id} description={post.description} author={post.author} image={post.image} like={post.likes} comment={post.comments} createdAt={post.createdAt} />
                        ))}
                    </div>
                </div>  )}
                {activeTab==="skills" && profiledata?.skills?.length > 0 && <div className='w-full  h-full flex flex-col justify-center p-[20px] text-gray-600 text-[22px]  font-semibold bg-white shadow-lg rounded-lg w-full'>
                    <div className='text-[22px] text-gray-600'>
                        skills ({profiledata.skills.length})</div>
                    <div className='flex flex-col gap-[20px]'>
                        <div className='mt-2 flex flex-wrap items-center justify-start gap-[20px]'>
                            {profiledata?.skills?.map((skill) => (
                                <div className='text-[22px]'>{skill}</div>
                            ))
                            }
                        </div>
                        {userdata._id == profiledata._id && <button className=' w-[150px] h-[30px] rounded-full border-2 border-[#2dc0ff] cursor-pointer text-[#2dc0ff] my-[20px] text-[16px] flex justify-center items-center gap-3' onClick={() => setedit(true)}>Add Skill </button>}


                    </div>
                </div>}

                {activeTab==="education" && profiledata?.education?.length > 0 && <div className='w-full  h-full flex flex-col justify-center p-[20px] text-gray-600 text-[22px]  font-semibold bg-white shadow-lg rounded-lg w-full'>
                    <div className='text-[22px] text-gray-700'>
                        Education ({profiledata?.education?.length})</div>
                    <div className='flex flex-col gap-[20px]'>
                        <div className='mt-2 flex flex-col items-start justify-center gap-[20px]'>
                            {profiledata.education.map((edu) => (
                                <div className='flex flex-col text-[22px] gap-2'>
                                    <div>college : {edu.college} </div>
                                    <div>degree : {edu.degree}</div>
                                    <div>fieldOfStudy : {edu.fieldOfStudy}</div>
                                </div>
                            ))
                            }
                            {userdata._id == profiledata._id && <button className=' w-[150px] h-[30px] rounded-full border-2 border-[#2dc0ff] text-[16px] cursor-pointer text-[#2dc0ff] my-[20px] flex justify-center items-center gap-3' onClick={() => setedit(true)}>Add Education </button>}
                        </div>

                    </div>

                </div>}
                {activeTab==="experience" && profiledata?.experience?.length > 0 && <div className='w-full  h-full flex flex-col justify-center p-[20px] text-gray-600 text-[22px]  font-semibold bg-white shadow-lg rounded-lg w-full'>
                    <div className='text-[22px] text-gray-700'>
                        Experience ({profiledata?.experience?.length})</div>
                    <div className='flex flex-col gap-[20px]'>
                        <div className='mt-2 flex flex-col items-start justify-center gap-[20px]'>
                            {profiledata?.experience?.map((ex) => (
                                <div className='flex flex-col text-[22px] gap-2'>
                                    <div>title : {ex.title} </div>
                                    <div>company : {ex.company}</div>
                                    <div>description : {ex.description}</div>
                                </div>
                            ))
                            }
                            {userdata._id == profiledata._id && <button className=' w-[150px] h-[30px] text-[16px] rounded-full border-2 border-[#2dc0ff] cursor-pointer text-[#2dc0ff] my-[20px] flex justify-center items-center gap-3' onClick={() => setedit(true)}>Add Experience </button>}
                        </div>

                    </div>

                </div>}
            </div>
        </div>
    )
}

export default Profile
