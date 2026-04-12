import React, { useContext, useEffect, useRef, useState } from 'react'
import Nav from '../component/Nav'
import profile from '../assets/profile.webp'
import { FiPlus } from "react-icons/fi";
import { MdOutlineCameraAlt } from "react-icons/md";
import { userDatacontext } from '../context/UserContext'
import { HiPencil } from "react-icons/hi2";
import Editprofile from '../component/Editprofile';
import { RxCross1 } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa6";
import axios from 'axios';
import { authdatacontext } from "../context/AuthContext"
import Post from '../component/Post';

function Home() {

  const { userdata, setuserdata, edit, setedit, postdata, setpostdata, handleGetProfile } = React.useContext(userDatacontext)

  const [frontendImage, setfrontendImage] = useState("")
  const [backendImage, setbackendImage] = useState("")
  const [description, setdescription] = useState("")
  const [uploadPost, setuploadPost] = useState(false)

  const { serverURL } = useContext(authdatacontext)

  const [posting, setposting] = useState(false)
  const [suggestedUsers, setsuggestedUsers] = useState([])

  const image = useRef()

  const handleImage = (e) => {
    const file = e.target.files[0]
    setbackendImage(file)
    setfrontendImage(URL.createObjectURL(file))
  }

  const handleuploadPost = async () => {

    setposting(true)

    try {

      let formData = new FormData()

      formData.append("description", description)

      if (backendImage) {
        formData.append("image", backendImage)
      }

      const result = await axios.post(serverURL + "/api/v1/post/createPost", formData, { withCredentials: true })

      setposting(false)
      setuploadPost(false)

    } catch (error) {

      setposting(false)
      console.log(error);

    }

  }

  const handleSuggestion = async () => {

    try {

      const result = await axios.get(serverURL + "/api/v1/user/suggestedUsers", { withCredentials: true })

      setsuggestedUsers(result.data.getSuggestedUsers)

      console.log(result.data.getSuggestedUsers)

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    handleSuggestion()

  }, [])


  return (

    <div className='w-full px-4 pb-6 min-h-[100vh] bg-gray-50 pt-20 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 relative'>

      {edit && <Editprofile />}

      <Nav />

      {uploadPost && <div className='w-full h-full z-[100] bg-gray-900/50 fixed inset-0'></div>}

      {uploadPost &&

        <div className='w-[90%] max-w-[500px] h-[600px] top-[70px] bg-white shadow-md border border-gray-100 rounded-xl fixed z-[200] p-6 flex flex-col gap-4 justify-start items-start'>

          <div className='absolute right-4 top-4'>

            <RxCross1 className='h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200' onClick={() => setuploadPost(false)} />

          </div>

          <div className='flex justify-start items-center gap-3'>

            <div className='w-[70px] h-[70px] rounded-full flex justify-center items-center overflow-hidden cursor-pointer ring-2 ring-gray-100'>

              <img src={userdata.profileImage || profile} alt="" className='w-full h-full object-cover' />

            </div>

            <div>

              <div className='text-gray-900 font-semibold text-lg'>{`${userdata?.firstname} ${userdata?.lastname}`}</div>

            </div>

          </div>

          <textarea

            className={`w-full ${frontendImage ? "h-[200px]" : "h-[500px]"} outline-none border-none resize-none text-base text-gray-800 placeholder:text-gray-400`}

            value={description}

            onChange={(e) => setdescription(e.target.value)}

            placeholder='What do you want to talk about ? '

          ></textarea>

          <input type="file" ref={image} hidden onChange={handleImage} />

          <div className={`w-full ${frontendImage ? "h-[300px]" : "h-[0px]"} overflow-hidden flex justify-center items-center`}>

            <img src={frontendImage || null} className='h-full rounded-xl' alt="" />

          </div>

          <div className='w-full h-[200px] flex flex-col'>

            <div className='border-b border-gray-200 p-4 flex justify-start items-center'>

              <FaRegImage onClick={() => image.current.click()} className='h-6 w-6 text-blue-600 hover:text-indigo-600 cursor-pointer transition-colors duration-200' />

            </div>

            <div className='p-4 flex justify-end items-center'>

              <button className='min-w-[100px] h-12 px-4 rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 cursor-pointer transition-all duration-200 font-medium disabled:opacity-60' disabled={posting} onClick={handleuploadPost}>

                {posting ? "posting.." : "Post"}

              </button>

            </div>

          </div>

        </div>

      }


      {/* FEED COLUMN */}

      <div className='w-full lg:w-[50%] min-h-[200px] bg-gray-50 flex flex-col gap-6'>

        {/* PROFILE CARD */}

        <div className='rounded-xl w-full bg-white shadow-md border border-gray-100 relative overflow-hidden'>

          <div className='w-full h-[100px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl overflow-hidden flex items-center justify-center cursor-pointer'>

            <img src={userdata.coverImage} alt="" className='w-full h-full object-cover opacity-90' />

            <MdOutlineCameraAlt className='absolute top-5 right-4 h-6 w-6 text-white drop-shadow-md' onClick={() => setedit(true)} />

          </div>

          <div className='w-[70px] h-[70px] rounded-full flex justify-center items-center overflow-hidden absolute top-[50px] left-6 cursor-pointer ring-4 ring-white shadow-sm'>

            <img src={userdata.profileImage || profile} alt="" className='w-full h-full object-cover' />

          </div>

          <div className='w-5 h-5 bg-blue-600 cursor-pointer absolute top-[92px] left-[5.25rem] rounded-full flex justify-center items-center shadow-md ring-2 ring-white hover:bg-blue-700 transition-colors duration-200'>

            <FiPlus className='text-white w-3 h-3' onClick={() => setedit(true)} />

          </div>

          <div className='mt-8 p-6 pt-2'>

            <div className='text-gray-900 font-semibold text-xl'>{`${userdata?.firstname} ${userdata?.lastname}`}</div>

            <div className='text-sm text-gray-500 mt-1'>{userdata.headline}</div>

            <div className='text-sm text-gray-500'>{userdata.location}</div>
            <div className='flex items-center justify-start'>
              <button className='w-full sm:w-1/2 h-10 rounded-xl border border-blue-600 text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white my-4 flex justify-center items-center gap-2 font-medium transition-all duration-200' onClick={() => setedit(true)}>
              Edit profile <HiPencil className='w-4 h-4' />
              </button>
            </div>



          </div>

        </div>


        {/* POST BOX */}

        <div className='w-full bg-white shadow-md border border-gray-100 rounded-xl p-4 flex items-center gap-3'>

          <div className='w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer ring-2 ring-gray-100'>

            <img src={userdata.profileImage || profile} alt="" className='w-full h-full object-cover' />

          </div>

          <div

            onClick={() => setuploadPost(true)}

            className='flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors duration-200'

          >

            Share something...

          </div>

        </div>


        {/* POSTS */}

        {postdata.map((post, index) => (

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

        ))}

      </div>


      {/* SUGGESTIONS */}

      <div className='w-full lg:w-[25%] min-h-[200px] bg-white border border-gray-100 shadow-md rounded-xl hidden lg:flex flex-col mb-6'>

        <div className='p-4'>

          {suggestedUsers.length > 0 &&

            <div className='mb-4 text-gray-900 font-semibold text-lg'>

              People you may know

            </div>

          }

          {suggestedUsers.length > 0 && suggestedUsers.map((user) => (

            <div className='flex rounded-xl items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200' onClick={() => handleGetProfile(user?.username)}>

              <div className='w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100 flex-shrink-0'>

                <img src={user.profileImage || profile} alt="" className='w-full h-full object-cover' />

              </div>

              <div className='flex flex-col items-start justify-center min-w-0'>

                <div className='text-gray-900 font-semibold text-base truncate w-full'>

                  {`${user?.firstname} ${user?.lastname}`}

                </div>

                <div className='text-sm text-gray-500 truncate w-full'>

                  {`${user?.headline}`}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}

export default Home
