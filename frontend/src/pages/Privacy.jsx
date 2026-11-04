import React from 'react'
import Nav from '../component/Nav'
import { FiShield } from 'react-icons/fi'

function Privacy() {
  return (
    <div className='w-full min-h-screen bg-transparent flex flex-col items-center pt-24 px-4 pb-20'>
      <Nav />
      <div className='w-full max-w-[700px] bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 rounded-3xl p-8 sm:p-10 flex flex-col gap-6 animate-in fade-in duration-200'>
        <div className='flex items-center gap-4 pb-4 border-b border-gray-200/60'>
          <div className='w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand border border-brand-light/60 shadow-sm flex-shrink-0'>
            <FiShield className='w-6 h-6' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 tracking-tight'>Privacy & Terms</h1>
            <p className='text-sm text-gray-500 font-medium mt-0.5'>Transparent data practices and simple usage guidelines</p>
          </div>
        </div>

        <div className='flex flex-col gap-6 text-sm text-gray-700 leading-relaxed font-normal'>
          {/* Data Collected */}
          <div>
            <h2 className='text-base font-bold text-gray-900 mb-2'>1. What Data We Collect</h2>
            <p>
              When you use ConnectHub, we collect only the information necessary to provide the networking service: your first and last name, email address, chosen username, password (hashed using bcrypt), optional profile information (headline, location, about bio, education, skills, profile picture, and cover banner), user-generated posts and comments, and your network connection records.
            </p>
          </div>

          {/* How Data is Used */}
          <div>
            <h2 className='text-base font-bold text-gray-900 mb-2'>2. How Your Data is Used & Protected</h2>
            <p>
              Your data is strictly used to authenticate your session and render your public profile, posts, and network connections. Authentication is managed via secure, encrypted JSON Web Tokens (JWT) stored in HTTP-only cookies to protect against cross-site scripting (XSS). We do not track you across third-party websites, and we never sell, monetize, or share your personal data with advertisers or data brokers.
            </p>
          </div>

          {/* Account Deletion */}
          <div>
            <h2 className='text-base font-bold text-gray-900 mb-2'>3. Account Deletion & Data Rights</h2>
            <p>
              Because ConnectHub does not currently have a self-serve automated account deletion button in the settings UI, you can request full removal of your account, posts, and associated data by emailing <a href="mailto:support@connecthub.dev" className='text-brand font-medium hover:underline'>support@connecthub.dev</a> with your username. All requests are processed promptly.
            </p>
          </div>

          {/* Terms of Use */}
          <div className='pt-2 border-t border-gray-200/60'>
            <h2 className='text-base font-bold text-gray-900 mb-2'>4. Terms of Use & Community Guidelines</h2>
            <p className='mb-2'>
              ConnectHub is a developer portfolio and educational project. By using this service, you agree to:
            </p>
            <ul className='list-disc pl-5 flex flex-col gap-1.5 text-gray-600'>
              <li>Interact respectfully with other members and avoid harassment, hate speech, or abuse.</li>
              <li>Refrain from spamming, posting deceptive content, or attempting unauthorized access to other user accounts.</li>
              <li>Acknowledge that this is an independent portfolio demonstration without guaranteed 24/7 uptime or enterprise SLAs.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy

