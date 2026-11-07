import React from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../component/Nav'
import { FiInfo } from 'react-icons/fi'
import BackButton from '../component/ui/BackButton'

function About() {
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen pt-20 pb-20 px-4 sm:px-6 flex flex-col items-center">
      <Nav />

      <main className="w-full max-w-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col gap-6 animate-in fade-in duration-150">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <BackButton onClick={() => navigate(-1)} label="Back" />
          <div className="w-10 h-10 rounded-2xl bg-brand-light dark:bg-blue-950/60 flex items-center justify-center text-brand border border-brand/20 shadow-2xs">
            <FiInfo className="w-5 h-5" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            About ConnectHub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            A developer-first professional networking platform
          </p>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          <p>
            ConnectHub is a modern networking and collaboration platform created specifically for developers, engineers, and tech enthusiasts. It provides an open space to share technical insights, showcase side projects, and build meaningful professional relationships without the clutter of traditional corporate social media.
          </p>

          <p>
            Our mission is simple: make it effortless for developers to build an authentic, visible professional network where their code, ideas, and accomplishments take center stage. Whether you are an aspiring programmer looking for mentors or an experienced engineer sharing architectural lessons, ConnectHub is designed to help you discover new opportunities and collaborate.
          </p>

          <div className="p-4 rounded-2xl bg-brand-light/60 dark:bg-blue-950/30 border border-brand/20">
            <p className="text-sm text-slate-800 dark:text-slate-200">
              ConnectHub was designed and built as a solo MERN-stack portfolio project by <strong className="text-brand font-semibold">Akil</strong>. The application features a modern React 19 frontend bundled with Vite and styled with Tailwind CSS, backed by an Express 5 and MongoDB server providing real-time communication via Socket.io and secure authentication.
            </p>
          </div>

          <p>
            Thank you for exploring ConnectHub. As an evolving platform, new features and improvements are added regularly to provide the smoothest experience possible for developers worldwide.
          </p>
        </div>
      </main>
    </div>
  )
}

export default About
