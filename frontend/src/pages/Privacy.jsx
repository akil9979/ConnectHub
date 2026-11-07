import React from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../component/Nav'
import { FiShield } from 'react-icons/fi'
import BackButton from '../component/ui/BackButton'

function Privacy() {
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen pt-20 pb-20 px-4 sm:px-6 flex flex-col items-center">
      <Nav />

      <main className="w-full max-w-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col gap-6 animate-in fade-in duration-150">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <BackButton onClick={() => navigate(-1)} label="Back" />
          <div className="w-10 h-10 rounded-2xl bg-brand-light dark:bg-blue-950/60 flex items-center justify-center text-brand border border-brand/20 shadow-2xs">
            <FiShield className="w-5 h-5" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Privacy & Terms
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            Transparent data practices and simple usage guidelines
          </p>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {/* Data Collected */}
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 font-display">
              1. What Data We Collect
            </h2>
            <p>
              When you use ConnectHub, we collect only the information necessary to provide the networking service: your first and last name, email address, chosen username, password (hashed using bcrypt), optional profile information (headline, location, about bio, education, skills, profile picture, and cover banner), user-generated posts and comments, and your network connection records.
            </p>
          </div>

          {/* How Data is Used */}
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 font-display">
              2. How Your Data is Used & Protected
            </h2>
            <p>
              Your data is strictly used to authenticate your session and render your public profile, posts, and network connections. Authentication is managed via secure, encrypted JSON Web Tokens (JWT) stored in HTTP-only cookies to protect against cross-site scripting (XSS). We do not track you across third-party websites, and we never sell, monetize, or share your personal data with advertisers or data brokers.
            </p>
          </div>

          {/* Account Deletion */}
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 font-display">
              3. Account Deletion & Data Rights
            </h2>
            <p>
              Because ConnectHub does not currently have a self-serve automated account deletion button in the settings UI, you can request full removal of your account, posts, and associated data by emailing{' '}
              <a
                href="mailto:support@connecthub.dev"
                className="text-brand font-semibold hover:underline"
              >
                support@connecthub.dev
              </a>{' '}
              with your username. All requests are processed promptly.
            </p>
          </div>

          {/* Terms of Use */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 font-display">
              4. Terms of Use & Community Guidelines
            </h2>
            <p className="mb-2">
              ConnectHub is a developer portfolio and educational project. By using this service, you agree to:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 text-slate-600 dark:text-slate-400">
              <li>Interact respectfully with other members and avoid harassment, hate speech, or abuse.</li>
              <li>Refrain from spamming, posting deceptive content, or attempting unauthorized access to other user accounts.</li>
              <li>Acknowledge that this is an independent portfolio demonstration without guaranteed 24/7 uptime or enterprise SLAs.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Privacy
