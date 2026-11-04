import React from 'react'
import Nav from '../component/Nav'
import { FiInfo } from 'react-icons/fi'

function About() {
  return (
    <div className='w-full min-h-screen bg-transparent flex flex-col items-center pt-24 px-4 pb-20'>
      <Nav />
      <div className='w-full max-w-[700px] bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 rounded-3xl p-8 sm:p-10 flex flex-col gap-6 animate-in fade-in duration-200'>
        <div className='flex items-center gap-4 pb-4 border-b border-gray-200/60'>
          <div className='w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand border border-brand-light/60 shadow-sm flex-shrink-0'>
            <FiInfo className='w-6 h-6' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 tracking-tight'>About ConnectHub</h1>
            <p className='text-sm text-gray-500 font-medium mt-0.5'>A developer-first professional networking platform</p>
          </div>
        </div>

        <div className='flex flex-col gap-4 text-base text-gray-700 leading-relaxed font-normal'>
          <p>
            ConnectHub is a modern networking and collaboration platform created specifically for developers, engineers, and tech enthusiasts. It provides an open space to share technical insights, showcase side projects, and build meaningful professional relationships without the clutter of traditional corporate social media.
          </p>

          <p>
            Our mission is simple: make it effortless for developers to build an authentic, visible professional network where their code, ideas, and accomplishments take center stage. Whether you are an aspiring programmer looking for mentors or an experienced engineer sharing architectural lessons, ConnectHub is designed to help you discover new opportunities and collaborate.
          </p>

          <p>
            ConnectHub was designed and built as a solo MERN-stack portfolio project by <strong>Akil</strong>. The application features a modern React 19 frontend bundled with Vite and styled with Tailwind CSS, backed by an Express 5 and MongoDB server providing real-time communication via Socket.io and secure authentication.
          </p>

          <p>
            Thank you for exploring ConnectHub. As an evolving platform, new features and improvements are added regularly to provide the smoothest experience possible for developers worldwide.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About

