
import React, {  useContext, useState } from 'react'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { authdatacontext } from '../context/Authcontext'
import axios from 'axios'
function Login() {
  let [show,setshow]=useState(false)
  const navigate=useNavigate()
  let serverURL=useContext(authdatacontext)
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [loading,setloading]=useState(false)
  const [error,seterror]=useState("")

  const handleSignin=async(e)=>{
    e.preventDefault()
    setloading(true)
    try {
      let result= await axios.post(serverURL+"/api/v1/auth/login",{
        email,
        password},
        {withCredentials:true}
      )
      console.log(result);
      setloading(false)
      seterror("")
      setpassword("")
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

        <form action="" onSubmit={handleSignin} className='w-xs h-full max-h-110 shadow-xl flex flex-col p-5 justify-center gap-3' >
          <h1 className='font-semibold text-[30px] text-gray-800 mb-3'>Sign In</h1>
         
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
          <button className='w-[100%] h-[50px] rounded-full bg-[#24b2ff] text-white cursor-pointer ' disabled={loading}>{loading?"loading...":"Sign In"}</button>
          <p className='text-center cursor-pointer ' onClick={()=>navigate("/signUp")}>want to create  a new account ? <span className=' text-[#24b2ff] cursor-pointer'>Signup</span></p>
        </form>
      </div>

    </div>

  )
}

export default Login
