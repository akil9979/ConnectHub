import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../component/Nav'
import { FiHelpCircle, FiChevronDown } from 'react-icons/fi'
import BackButton from '../component/ui/BackButton'

const FAQ_ITEMS = [
  {
    question: 'How do I create an account?',
    answer:
      "Click 'Sign Up' from the landing or login screen, enter your first and last name, username, email, and password, then submit the form. Once registered, your account is created immediately and you will be signed in."
  },
  {
    question: 'How do I send, accept, reject, or withdraw a connection request?',
    answer:
      "You can click 'Connect' on any user profile or suggestion card to send a request. To accept or reject incoming invitations, navigate to the Network page under 'Invitations > Received'. To cancel a pending invitation you sent earlier, switch to the 'Sent' tab or click the outline 'Withdraw' button next to their profile."
  },
  {
    question: 'How do I edit my profile?',
    answer:
      "On your Home sidebar or your personal Profile page, click the 'Edit profile' button. A popup modal will allow you to update your profile picture, cover banner, headline, location, about bio, education, and technical skills."
  },
  {
    question: 'How do I create a post?',
    answer:
      "In the center column of your Home feed, click the 'Share something...' input box. Enter your thoughts or project details, optionally attach an image from your device using the image icon, and click 'Post' to publish to the community feed."
  },
  {
    question: "I can't log in or stay logged in, what do I do?",
    answer:
      'ConnectHub securely stores authentication tokens in HTTP-only cookies. If you have trouble logging in or are frequently logged out, make sure your browser permits cookies, try clearing your site cookies and cache, and perform a fresh login from the /login page.'
  },
  {
    question: 'How does the Explore feed work?',
    answer:
      'The Explore page highlights trending community posts by ordering them based on the total number of likes received, helping you quickly discover popular tutorials, project launches, and discussions.'
  }
]

function Help() {
  const [openIndex, setOpenIndex] = useState(0)
  const navigate = useNavigate()

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="w-full min-h-screen pt-20 pb-20 px-4 sm:px-6 flex flex-col items-center">
      <Nav />

      <main className="w-full max-w-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col gap-6 animate-in fade-in duration-150">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <BackButton onClick={() => navigate(-1)} label="Back" />
          <div className="w-10 h-10 rounded-2xl bg-brand-light dark:bg-blue-950/60 flex items-center justify-center text-brand border border-brand/20 shadow-2xs">
            <FiHelpCircle className="w-5 h-5" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Help Center & FAQ
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            Answers to frequently asked questions about ConnectHub
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="border border-slate-200/80 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-slate-900 dark:text-white hover:text-brand transition-colors cursor-pointer gap-4 select-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-[15px]">{item.question}</span>
                  <FiChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-brand' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 animate-in fade-in duration-150">
                    <p className="pt-3">{item.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Support Note */}
        <div className="p-4 rounded-2xl bg-brand-light/60 dark:bg-blue-950/30 border border-brand/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300 text-center">
          Still need assistance? Email us anytime at{' '}
          <a
            href="mailto:support@connecthub.dev"
            className="text-brand font-semibold hover:underline"
          >
            support@connecthub.dev
          </a>
          .
        </div>
      </main>
    </div>
  )
}

export default Help
