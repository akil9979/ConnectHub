import React, {  useContext, useState } from 'react'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { authdatacontext } from '../context/Authcontext'
import { userDatacontext } from '../context/UserContext'
import axios from 'axios'
function SignUp() {
  let [show,setshow]=useState(false)
  
  const navigate=useNavigate()
 
  let {serverURL}=useContext(authdatacontext)
  const {userdata, setuserdata } = useContext(userDatacontext)
  const [firstname,setfirstname]=useState("")
  const [lastname,setlastname]=useState("")
  const [username,setusername]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [loading,setloading]=useState(false)
  const [error,seterror]=useState("")

  const handleSignUp=async(e)=>{
    e.preventDefault()
    setloading(true)
    seterror("")
    try {
      let result= await axios.post(serverURL+"/api/v1/auth/signUp",{
        firstname,
        lastname,
        username,
        email,
        password},
        {withCredentials:true}
      )
      console.log(result);
      setuserdata(result.data.registerUser)
      
      navigate("/")
      setloading(false)
      seterror("")
      setfirstname("")
      setlastname("")
      setpassword("")
      setusername("")
      setemail("")
      
    } catch (error) {
      seterror(error.response.data.message)
      setloading(false)
    }
  }
  return (
    <div>
      <div className='w-full max-w-24 h-10 m-8'>
        <img src={logo} alt="" />
      </div>
      <div className='w-full h-screen bg-[white] flex flex-col items-center justify-start'>

        <form action="" onSubmit={handleSignUp} className='w-xs h-full max-h-110 shadow-xl flex flex-col p-5 justify-center gap-3' >
          <h1 className='font-semibold text-[30px] text-gray-800 mb-3'>SignUp</h1>
          <input
            type="text"
            placeholder='firstname'
            required
            value={firstname}
            onChange={(e)=>setfirstname(e.target.value)}
            className='rounded-md px-2 w-[100%] h-[40px] border-2 border-gray-600 text-gray-800 text-[18px] py-[10px]' />
          <input
            type="text"
            placeholder='lastname'
            required
            value={lastname}
            onChange={(e)=>setlastname(e.target.value)}
            className='rounded-md px-2 w-[100%] h-[40px] border-2 border-gray-600 text-gray-800 text-[18px] py-[10px]' />
          <input
            type="text"
            placeholder='username'
            required
            value={username}
            onChange={(e)=>setusername(e.target.value)}
            className='rounded-md px-2 w-[100%] h-[40px] border-2 border-gray-600 text-gray-800 text-[18px] py-[10px]' />
          <input
            type="email"
            placeholder='email'
            required
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            className='rounded-md px-2 w-[100%] h-[40px] border-2 border-gray-600 text-gray-800 text-[18px] py-[10px]' />
          <div className='rounded-md  w-[100%] h-[40px] border-2 border-gray-600 text-gray-800 text-[18px] relative '>
            <input
              type={show?"text":"password"}
              placeholder='password'
              required
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
              className='rounded-md  h-full w-full text-gray-800 text-[18px] px-2 py-[10px] ' />
              <span className='absolute right-[21px] top-[7px] cursor-pointer font-semibold text-[#1dc9fd] ' onClick={()=>setshow(prev=>!prev)}>{show?"hidden":"show"}</span>
          </div>
          {error && <p className='text-center text-red-500'>*{error}</p>}
          <button className='w-[100%] h-[50px] rounded-full bg-[#24b2ff] text-white cursor-pointer ' disabled={loading}>{loading?"loading...":"SignUp"}</button>
          <p className='text-center cursor-pointer ' onClick={()=>navigate("/login")}>Alredy have an account ? <span className=' text-[#24b2ff] cursor-pointer'>Sign In</span></p>
        </form>
      </div>

    </div>

  )
}
export default SignUp
