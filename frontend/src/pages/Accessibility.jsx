import React from 'react'
import Nav from '../component/Nav'
import { FiEye } from 'react-icons/fi'

function Accessibility() {
  return (
    <div className='w-full min-h-screen bg-transparent flex flex-col items-center pt-24 px-4 pb-20'>
      <Nav />
      <div className='w-full max-w-[700px] bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 rounded-3xl p-8 sm:p-10 flex flex-col gap-6 animate-in fade-in duration-200'>
        <div className='flex items-center gap-4 pb-4 border-b border-gray-200/60'>
          <div className='w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand border border-brand-light/60 shadow-sm flex-shrink-0'>
            <FiEye className='w-6 h-6' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 tracking-tight'>Accessibility Statement</h1>
            <p className='text-sm text-gray-500 font-medium mt-0.5'>Our ongoing commitment to digital accessibility</p>
          </div>
        </div>

        <div className='flex flex-col gap-4 text-base text-gray-700 leading-relaxed font-normal'>
          <p>
            At ConnectHub, we strive to make our developer community welcoming and usable for everyone. The user interface is developed using semantic HTML, structured headings, and keyboard-navigable interactive elements where practical to provide a coherent experience across different devices and assistive technologies.
          </p>

          <p>
            Because ConnectHub is an independently developed project, full accessibility across every component is an ongoing effort rather than a finished guarantee. We continually refine contrast ratios, focus rings, responsive behaviors, and screen reader clarity as the application grows.
          </p>

          <p>
            If you encounter any accessibility barriers, have difficulty navigating any part of the site, or have suggestions for improvement, please reach out via email at <a href="mailto:support@connecthub.dev" className='text-brand font-medium hover:underline'>support@connecthub.dev</a>. Your feedback is genuinely appreciated and directly helps guide future enhancements.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Accessibility

