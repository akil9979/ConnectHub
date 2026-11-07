import React from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../component/Nav'
import { FiEye } from 'react-icons/fi'
import BackButton from '../component/ui/BackButton'

function Accessibility() {
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen pt-20 pb-20 px-4 sm:px-6 flex flex-col items-center">
      <Nav />

      <main className="w-full max-w-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col gap-6 animate-in fade-in duration-150">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <BackButton onClick={() => navigate(-1)} label="Back" />
          <div className="w-10 h-10 rounded-2xl bg-brand-light dark:bg-blue-950/60 flex items-center justify-center text-brand border border-brand/20 shadow-2xs">
            <FiEye className="w-5 h-5" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Accessibility Statement
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            Our ongoing commitment to digital accessibility and inclusion
          </p>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          <p>
            At ConnectHub, we strive to make our developer community welcoming and usable for everyone. The user interface is developed using semantic HTML, structured headings, and keyboard-navigable interactive elements where practical to provide a coherent experience across different devices and assistive technologies.
          </p>

          <p>
            Because ConnectHub is an independently developed project, full accessibility across every component is an ongoing effort rather than a finished guarantee. We continually refine contrast ratios, focus rings, responsive behaviors, and screen reader clarity as the application grows.
          </p>

          <div className="p-4 rounded-2xl bg-brand-light/60 dark:bg-blue-950/30 border border-brand/20">
            <p className="text-sm text-slate-800 dark:text-slate-200">
              If you encounter any accessibility barriers, have difficulty navigating any part of the site, or have suggestions for improvement, please reach out via email at{' '}
              <a
                href="mailto:support@connecthub.dev"
                className="text-brand font-semibold hover:underline"
              >
                support@connecthub.dev
              </a>
              . Your feedback is genuinely appreciated and directly helps guide future enhancements.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Accessibility
