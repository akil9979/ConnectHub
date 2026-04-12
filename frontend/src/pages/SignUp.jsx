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
    <div className='min-h-screen bg-gray-50'>
      <div className='w-full max-w-24 h-10 m-8'>
        {/* <img src={logo} alt="" /> */}
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          ConnectHub
        </h1>
      </div>
      <div className='w-full min-h-[calc(100vh-5rem)] bg-gray-50 flex flex-col items-center justify-start px-4 pb-8'>

        <form action="" onSubmit={handleSignUp} className='w-full max-w-sm shadow-md flex flex-col p-6 justify-center gap-3 rounded-xl bg-white border border-gray-100 mb-6' >
          <h1 className='font-semibold text-2xl text-gray-900 mb-6'>SignUp</h1>
          <input
            type="text"
            placeholder='firstname'
            required
            value={firstname}
            onChange={(e) => setfirstname(e.target.value)}
            className='rounded-xl px-3 w-full h-11 border border-gray-200 bg-gray-50 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200' />
          <input
            type="text"
            placeholder='lastname'
            required
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
            className='rounded-xl px-3 w-full h-11 border border-gray-200 bg-gray-50 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200' />
          <input
            type="text"
            placeholder='username'
            required
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className='rounded-xl px-3 w-full h-11 border border-gray-200 bg-gray-50 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200' />
          <input
            type="email"
            placeholder='email'
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className='rounded-xl px-3 w-full h-11 border border-gray-200 bg-gray-50 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200' />
          <div className='rounded-xl w-full h-11 border border-gray-200 bg-gray-50 text-gray-900 text-base relative'>
            <input
              type={show ? "text" : "password"}
              placeholder='password'
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className='rounded-xl h-full w-full text-gray-900 text-base px-3 pr-16 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/30' />
            <span className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-sm font-medium text-blue-600 hover:text-indigo-600 transition-colors duration-200' onClick={() => setshow(prev => !prev)}>{show ? "hidden" : "show"}</span>
          </div>
          {error && <p className='text-center text-sm text-red-600'>*{error}</p>}
          <button className='w-full h-12 rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 cursor-pointer transition-all duration-200 font-medium disabled:opacity-60' disabled={loading}>{loading ? "loading..." : "SignUp"}</button>
          <p className='text-center text-sm text-gray-600 cursor-pointer' onClick={() => navigate("/login")}>Alredy have an account ? <span className='text-blue-600 font-medium hover:text-indigo-600 transition-colors duration-200'>Sign In</span></p>
        </form>
      </div>

    </div>

  )
}
export default SignUp
