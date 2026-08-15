import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserFriends, FaRegPaperPlane } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className='relative min-h-screen bg-transparent flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden'>
  {/* Geometric background shapes */}
  <div className='absolute inset-0 pointer-events-none'>
    <div className='absolute top-[-12rem] left-[-10rem] w-[30rem] h-[30rem] bg-indigo-300/30 rounded-full filter blur-3xl'></div>
    <div className='absolute bottom-[-10rem] right-[-8rem] w-[25rem] h-[25rem] bg-teal-300/30 rounded-full filter blur-3xl'></div>
    <div className='absolute top-1/4 left-1/2 w-[22rem] h-[22rem] bg-violet-300/30 filter blur-2xl' style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}></div>
  </div>
      <div className='w-full max-w-4xl space-y-8 flex flex-col items-center animate-in fade-in zoom-in-95 duration-300'>
        
        {/* Header/Hero Section */}
        <div className='flex flex-col items-center justify-center text-center'>
          <div className='w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg mb-6 transform hover:rotate-12 transition-transform duration-300'>
            C
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            ConnectHub
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-xl">
            Connect, share, and grow your professional network in real-time.
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-4 sm:gap-6 mt-6'>
          <button 
            onClick={() => navigate('/login')}
            className='min-w-[140px] py-3.5 px-6 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer text-center text-sm sm:text-base'
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/signUp')}
            className='min-w-[140px] py-3.5 px-6 rounded-2xl bg-white/70 backdrop-blur-md text-blue-600 border border-blue-200 font-semibold hover:bg-white hover:shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer text-center text-sm sm:text-base'
          >
            Sign Up
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12'>
          
          {/* Feature 1 */}
          <div className='bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col items-center text-center hover:bg-white/80 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
            <div className='w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4 shadow-sm border border-blue-100/50'>
              <FaUserFriends className='w-6 h-6' />
            </div>
            <h3 className='text-lg font-bold text-gray-900 mb-2'>Networking</h3>
            <p className='text-sm text-gray-500 leading-relaxed'>
              Build connections, view profiles, and discover opportunities to expand your professional circle.
            </p>
          </div>

          {/* Feature 2 */}
          <div className='bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col items-center text-center hover:bg-white/80 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
            <div className='w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4 shadow-sm border border-blue-100/50'>
              <FaRegPaperPlane className='w-5 h-5' />
            </div>
            <h3 className='text-lg font-bold text-gray-900 mb-2'>Posts</h3>
            <p className='text-sm text-gray-500 leading-relaxed'>
              Share updates, images, and articles, like and comment on community posts to build engagement.
            </p>
          </div>

          {/* Feature 3 */}
          <div className='bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col items-center text-center hover:bg-white/80 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
            <div className='w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4 shadow-sm border border-blue-100/50'>
              <IoIosNotifications className='w-6 h-6' />
            </div>
            <h3 className='text-lg font-bold text-gray-900 mb-2'>Real-Time Connections</h3>
            <p className='text-sm text-gray-500 leading-relaxed'>
              Receive instant updates and notification alerts when users connect or interact with your posts.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Landing
