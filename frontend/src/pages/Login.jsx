import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authdatacontext } from '../context/AuthContext'
import { userDatacontext } from '../context/UserContext'
import axios from 'axios'
import logger from '../utils/logger'
import { HiOutlineLockClosed, HiEye, HiEyeSlash } from 'react-icons/hi2'
import { HiOutlineMail } from 'react-icons/hi'
import Button from '../component/ui/Button'

function Login() {
  const { setuserdata } = useContext(userDatacontext)
  const [show, setshow] = useState(false)
  const navigate = useNavigate()
  const { serverURL } = useContext(authdatacontext)
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState('')

  const handleSignin = async (e) => {
    e.preventDefault()
    setloading(true)
    seterror('')
    try {
      const result = await axios.post(
        `${serverURL}/api/v1/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      if (result.data?.user) {
        setuserdata(result.data.user)
        navigate('/')
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials. Please try again.'
      seterror(msg)
      logger.error('Login failed:', err)
    } finally {
      setloading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10rem] left-[-10rem] w-[28rem] h-[28rem] bg-brand-light/70 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10rem] right-[-10rem] w-[28rem] h-[28rem] bg-accent-light/70 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md space-y-6 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center text-center">
          <div
            onClick={() => navigate('/')}
            className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand to-accent flex items-center justify-center text-white text-2xl font-extrabold shadow-lg shadow-brand/25 cursor-pointer hover:scale-105 transition-transform duration-200 mb-4"
          >
            C
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Welcome back to Connect<span className="text-brand">Hub</span>
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Sign in to continue connecting with your network
          </p>
        </div>

        {/* Card Form */}
        <form
          onSubmit={handleSignin}
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col gap-5 transition-all duration-200"
        >
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-in fade-in duration-150">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Email field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-email"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <HiOutlineMail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                id="login-email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-slate-300/80 hover:border-slate-400 focus:border-brand focus:ring-3 focus:ring-brand/20 bg-white/90 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-password"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <HiOutlineLockClosed className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                id="login-password"
                type={show ? 'text' : 'password'}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="w-full h-11 pl-10 pr-12 text-sm rounded-xl border border-slate-300/80 hover:border-slate-400 focus:border-brand focus:ring-3 focus:ring-brand/20 bg-white/90 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setshow((prev) => !prev)}
                className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer select-none"
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                {show ? <HiEyeSlash className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            loadingText="Signing in..."
            className="w-full mt-2 font-semibold shadow-md"
          >
            Sign in
          </Button>

          {/* Footer link to sign up */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <button
                type="button"
                className="font-semibold text-brand hover:text-brand-dark cursor-pointer transition-colors"
                onClick={() => navigate('/signUp')}
              >
                Create an account
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
