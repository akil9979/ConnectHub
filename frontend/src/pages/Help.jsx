import React, { useState } from 'react'
import Nav from '../component/Nav'
import { FiHelpCircle, FiChevronDown } from 'react-icons/fi'

const FAQ_ITEMS = [
  {
    question: "How do I create an account?",
    answer: "Click 'Sign Up' from the landing or login screen, enter your first and last name, username, email, and password, then submit the form. Once registered, your account is created immediately and you will be signed in."
  },
  {
    question: "How do I send, accept, reject, or withdraw a connection request?",
    answer: "You can click 'Connect' on any user profile or suggestion card to send a request. To accept or reject incoming invitations, navigate to the Network page under 'Invitations > Received'. To cancel a pending invitation you sent earlier, switch to the 'Sent' tab or click the outline 'Withdraw' button next to their profile."
  },
  {
    question: "How do I edit my profile?",
    answer: "On your Home sidebar or your personal Profile page, click the 'Edit profile' button. A popup modal will allow you to update your profile picture, cover banner, headline, location, about bio, education, and technical skills."
  },
  {
    question: "How do I create a post?",
    answer: "In the center column of your Home feed, click the 'Share something...' input box. Enter your thoughts or project details, optionally attach an image from your device using the image icon, and click 'Post' to publish to the community feed."
  },
  {
    question: "I can't log in or stay logged in, what do I do?",
    answer: "ConnectHub securely stores authentication tokens in HTTP-only cookies. If you have trouble logging in or are frequently logged out, make sure your browser permits cookies, try clearing your site cookies and cache, and perform a fresh login from the /login page."
  },
  {
    question: "How does the Explore feed work?",
    answer: "The Explore page highlights trending community posts by ordering them based on the total number of likes received, helping you quickly discover popular tutorials, project launches, and discussions."
  }
]

function Help() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleFAQ = (index) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <div className='w-full min-h-screen bg-transparent flex flex-col items-center pt-24 px-4 pb-20'>
      <Nav />
      <div className='w-full max-w-[700px] bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 rounded-3xl p-8 sm:p-10 flex flex-col gap-6 animate-in fade-in duration-200'>
        <div className='flex items-center gap-4 pb-4 border-b border-gray-200/60'>
          <div className='w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand border border-brand-light/60 shadow-sm flex-shrink-0'>
            <FiHelpCircle className='w-6 h-6' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 tracking-tight'>Help Center & FAQ</h1>
            <p className='text-sm text-gray-500 font-medium mt-0.5'>Answers to frequently asked questions about ConnectHub</p>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div 
                key={idx}
                className='border border-white/80 bg-white/60 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm'
              >
                <button
                  type='button'
                  onClick={() => toggleFAQ(idx)}
                  className='w-full flex items-center justify-between p-4.5 text-left font-semibold text-gray-900 hover:text-brand transition-colors cursor-pointer gap-4'
                >
                  <span className='text-[15px]'>{item.question}</span>
                  <FiChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-brand' : ''}`} />
                </button>
                {isOpen && (
                  <div className='px-4.5 pb-4.5 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-100/80 mt-1'>
                    <div className='pt-2.5'>{item.answer}</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className='mt-2 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-gray-600 text-center'>
          Still need assistance? Email us anytime at <a href="mailto:support@connecthub.dev" className='text-brand font-medium hover:underline'>support@connecthub.dev</a>.
        </div>
      </div>
    </div>
  )
}

export default Help

