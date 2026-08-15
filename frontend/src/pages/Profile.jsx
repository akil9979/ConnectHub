import React, { useEffect } from 'react'
import Nav from '../component/Nav'
import profile from '../assets/profile.webp'
import { FiPlus } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";
import { userDatacontext } from '../context/UserContext'
import { HiPencil } from "react-icons/hi2";
import Editprofile from '../component/Editprofile';
import axios from 'axios';
import { authdatacontext } from '../context/AuthContext';
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
        <div className='w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 pt-24 flex flex-col items-center pb-10'>
            {edit && <Editprofile />}
            <Nav />
            <div className='w-full max-w-[900px] min-h-[100vh] flex flex-col gap-6 px-4'>


                <div className='rounded-3xl w-full min-h-[300px] bg-white/70 backdrop-blur-md shadow-md border border-white/40 relative overflow-hidden' >
                    <div className='w-full h-[100px] bg-gradient-to-r from-brand to-accent rounded-t-xl overflow-hidden flex items-center justify-center cursor-pointer'>
                        <img src={profiledata.coverImage} alt="" className='w-full h-full object-cover opacity-90' />
                        {userdata._id == profiledata._id && <MdOutlineCameraAlt className='absolute top-5 right-4 h-6 w-6 text-white drop-shadow-md' onClick={() => setedit(true)} />}

                    </div>
                    <div className='w-[70px] h-[70px] rounded-full flex justify-center items-center overflow-hidden absolute top-[50px] left-6 cursor-pointer ring-4 ring-white shadow-sm'>
                        <img src={profiledata.profileImage || profile} alt="" className='w-full h-full object-cover' />
                    </div>
                    {userdata._id == profiledata._id && <div className='w-5 h-5 bg-brand cursor-pointer absolute top-[92px] left-[5.25rem] rounded-full flex justify-center items-center shadow-md ring-2 ring-white hover:bg-brand-dark transition-colors duration-200'>
                        <FiPlus className='text-white w-3 h-3' onClick={() => setedit(true)} />
                    </div>}

                    <div className='mt-6 p-6 pt-2'>
                        <div className='text-gray-900 font-bold text-xl'>{`${profiledata?.firstname} ${profiledata?.lastname}`}</div>

                        <div className='text-base text-gray-600 mt-1'>{profiledata.headline}</div>
                        <div className='text-sm text-gray-500'>{profiledata.location}</div>
                        <div className='text-sm text-gray-500 mt-1'>{profiledata?.connections?.length} connections</div>
                        {userdata._id == profiledata._id && <button className=' min-w-[150px] h-10 rounded-xl border border-brand text-brand shadow-sm hover:bg-brand hover:text-white my-4 flex justify-center items-center gap-2 font-medium transition-all duration-200' onClick={() => setedit(true)}>Edit profile  <HiPencil className='w-4 h-4' /> </button>}
                        {userdata._id != profiledata._id && <ConnectionButton userId={profiledata._id} />}

                    </div>
                    
                </div>
                <div className="w-full bg-white/70 backdrop-blur-md shadow-md border border-white/40 rounded-2xl flex justify-around items-center p-4 text-base font-semibold text-gray-600">

                    <div
                        onClick={() => setActiveTab("posts")}
                        className={`cursor-pointer py-2 px-6 rounded-full transition-all duration-200 ${activeTab === "posts" ? "text-white bg-brand shadow-md" : "hover:text-gray-900 hover:bg-white/50"}`}
                    >
                        Posts
                    </div>

                    <div
                        onClick={() => setActiveTab("skills")}
                        className={`cursor-pointer py-2 px-6 rounded-full transition-all duration-200 ${activeTab === "skills" ? "text-white bg-brand shadow-md" : "hover:text-gray-900 hover:bg-white/50"}`}
                    >
                        Skills
                    </div>

                    <div
                        onClick={() => setActiveTab("education")}
                        className={`cursor-pointer py-2 px-6 rounded-full transition-all duration-200 ${activeTab === "education" ? "text-white bg-brand shadow-md" : "hover:text-gray-900 hover:bg-white/50"}`}
                    >
                        Education
                    </div>

                    <div
                        onClick={() => setActiveTab("experience")}
                        className={`cursor-pointer py-2 px-6 rounded-full transition-all duration-200 ${activeTab === "experience" ? "text-white bg-brand shadow-md" : "hover:text-gray-900 hover:bg-white/50"}`}
                    >
                        Experience
                    </div>

                </div>
                {activeTab==="posts" && ( <div className='flex flex-col gap-6'>
                    <div className='w-full min-h-[100px] flex items-center p-6 text-lg text-gray-900 font-semibold bg-white/70 backdrop-blur-sm shadow-sm border border-white/40 rounded-2xl w-full'>
                        {`Posts (${profilePosts?.length})`}
                    </div>
                    <div >
                        {profilePosts.map((post, index) => (
                            <Post key={index} id={post._id} description={post.description} author={post.author} image={post.image} like={post.likes} comment={post.comments} createdAt={post.createdAt} />
                        ))}
                    </div>
                </div>  )}
                {activeTab==="skills" && profiledata?.skills?.length > 0 && <div className='w-full h-full flex flex-col justify-center p-6 text-gray-700 text-base font-semibold bg-white/70 backdrop-blur-sm shadow-sm border border-white/40 rounded-2xl hover:shadow-md transition-all duration-200 w-full'>
                    <div className='text-lg text-gray-900 mb-4'>
                        skills ({profiledata.skills.length})</div>
                    <div className='flex flex-col gap-6'>
                        <div className='mt-2 flex flex-wrap items-center justify-start gap-3'>
                            {profiledata?.skills?.map((skill) => (
                                <div className='text-base px-3 py-1.5 rounded-lg bg-accent-light text-accent-dark border border-accent-light'>{skill}</div>
                            ))
                            }
                        </div>
                        {userdata._id == profiledata._id && <button className=' min-w-[150px] h-9 rounded-xl border border-brand text-brand shadow-sm hover:bg-brand hover:text-white my-4 text-sm flex justify-center items-center gap-2 font-medium transition-all duration-200' onClick={() => setedit(true)}>Add Skill </button>}


                    </div>
                </div>}

                {activeTab==="education" && profiledata?.education?.length > 0 && <div className='w-full h-full flex flex-col justify-center p-6 text-gray-700 text-base font-semibold bg-white/70 backdrop-blur-sm shadow-sm border border-white/40 rounded-2xl hover:shadow-md transition-all duration-200 w-full'>
                    <div className='text-lg text-gray-900 mb-4'>
                        Education ({profiledata?.education?.length})</div>
                    <div className='flex flex-col gap-6'>
                        <div className='mt-2 flex flex-col items-start justify-center gap-6'>
                            {profiledata.education.map((edu) => (
                                <div className='flex flex-col text-base gap-1 border-b border-gray-100 pb-4 last:border-0 w-full'>
                                    <div className='text-gray-900 font-medium'>college : {edu.college} </div>
                                    <div className='text-sm text-gray-600'>degree : {edu.degree}</div>
                                    <div className='text-sm text-gray-500'>fieldOfStudy : {edu.fieldOfStudy}</div>
                                </div>
                            ))
                            }
                            {userdata._id == profiledata._id && <button className=' min-w-[150px] h-9 rounded-xl border border-brand text-sm cursor-pointer text-brand shadow-sm hover:bg-brand hover:text-white my-4 flex justify-center items-center gap-2 font-medium transition-all duration-200' onClick={() => setedit(true)}>Add Education </button>}
                        </div>

                    </div>

                </div>}
                {activeTab==="experience" && profiledata?.experience?.length > 0 && <div className='w-full h-full flex flex-col justify-center p-6 text-gray-700 text-base font-semibold bg-white/70 backdrop-blur-sm shadow-sm border border-white/40 rounded-2xl hover:shadow-md transition-all duration-200 w-full'>
                    <div className='text-lg text-gray-900 mb-4'>
                        Experience ({profiledata?.experience?.length})</div>
                    <div className='flex flex-col gap-6'>
                        <div className='mt-2 flex flex-col items-start justify-center gap-6'>
                            {profiledata?.experience?.map((ex) => (
                                <div className='flex flex-col text-base gap-1 border-b border-gray-100 pb-4 last:border-0 w-full'>
                                    <div className='text-gray-900 font-medium'>title : {ex.title} </div>
                                    <div className='text-sm text-gray-600'>company : {ex.company}</div>
                                    <div className='text-sm text-gray-500'>description : {ex.description}</div>
                                </div>
                            ))
                            }
                            {userdata._id == profiledata._id && <button className=' min-w-[150px] h-9 text-sm rounded-xl border border-brand cursor-pointer text-brand shadow-sm hover:bg-brand hover:text-white my-4 flex justify-center items-center gap-2 font-medium transition-all duration-200' onClick={() => setedit(true)}>Add Experience </button>}
                        </div>

                    </div>

                </div>}
            </div>
        </div>
    )
}

export default Profile
