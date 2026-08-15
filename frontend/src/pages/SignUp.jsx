import React, { useContext, useState } from 'react'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { authdatacontext } from '../context/AuthContext'
import { userDatacontext } from '../context/UserContext'
import axios from 'axios'
function SignUp() {
  let [show, setshow] = useState(false)

  const navigate = useNavigate()

  let { serverURL } = useContext(authdatacontext)
  const { userdata, setuserdata } = useContext(userDatacontext)
  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState("")

  const handleSignUp = async (e) => {
    e.preventDefault()
    setloading(true)
    seterror("")
    try {
      let result = await axios.post(serverURL + "/api/v1/auth/signUp", {
        firstname,
        lastname,
        username,
        email,
        password
      },
        { withCredentials: true }
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
    <div className='relative min-h-screen bg-transparent flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden'>
  {/* Geometric background shapes */}
  <div className='absolute inset-0 pointer-events-none'>
    <div className='absolute top-[-12rem] left-[-10rem] w-[30rem] h-[30rem] bg-indigo-300/30 rounded-full filter blur-3xl'></div>
    <div className='absolute bottom-[-10rem] right-[-8rem] w-[25rem] h-[25rem] bg-teal-300/30 rounded-full filter blur-3xl'></div>
    <div className='absolute top-1/4 left-1/2 w-[22rem] h-[22rem] bg-violet-300/30 filter blur-2xl' style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}></div>
  </div>
      <div className='w-full max-w-md space-y-8'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            ConnectHub
          </h1>
          <h2 className="mt-6 text-center text-xl font-medium text-gray-600">
            Create a new account
          </h2>
        </div>

        <form action="" onSubmit={handleSignUp} className='mt-8 bg-white/70 backdrop-blur-md py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] sm:rounded-3xl sm:px-10 border border-white/60 flex flex-col gap-5 hover:bg-white/80 transition-all duration-300' >
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
              <input
                type="text"
            placeholder='firstname'
                required
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                className='appearance-none block w-full px-3 py-2 border border-white/60 bg-white/50 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 focus:bg-white/80 hover:bg-white/70 sm:text-sm transition-all duration-300' />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
              <input
                type="text"
            placeholder='lastname'
                required
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                className='appearance-none block w-full px-3 py-2 border border-white/60 bg-white/50 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 focus:bg-white/80 hover:bg-white/70 sm:text-sm transition-all duration-300' />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
            placeholder='username'
              required
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className='appearance-none block w-full px-3 py-2 border border-white/60 bg-white/50 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 focus:bg-white/80 hover:bg-white/70 sm:text-sm transition-all duration-300' />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              type="email"
            placeholder='email'
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className='appearance-none block w-full px-3 py-2 border border-white/60 bg-white/50 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 focus:bg-white/80 hover:bg-white/70 sm:text-sm transition-all duration-300' />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className='relative'>
              <input
                type={show ? "text" : "password"}
                placeholder='••••••••'
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className='appearance-none block w-full px-3 py-2 border border-white/60 bg-white/50 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 focus:bg-white/80 hover:bg-white/70 sm:text-sm transition-all duration-300 pr-12' />
              <button type="button" className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors' onClick={() => setshow(prev => !prev)}>{show ? "Hide" : "Show"}</button>
            </div>
          </div>
          {error && <div className='rounded-md bg-red-50 p-3'><p className='text-sm text-red-700 text-center'>{error}</p></div>}
          <button className='w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 disabled:opacity-60' disabled={loading}>{loading ? "Creating account..." : "Sign up"}</button>
          
          <div className="mt-4 text-center">
            <p className='text-sm text-gray-600'>Already have an account? <span className='font-medium text-brand hover:text-brand-dark cursor-pointer transition-colors' onClick={() => navigate("/login")}>Sign in</span></p>
          </div>
        </form>
      </div>

    </div>

  )
}
export default SignUp
