import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaUserFriends, FaRegPaperPlane } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { HiOutlineSparkles, HiArrowRight } from 'react-icons/hi2'
import Button from '../component/ui/Button'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-12rem] left-[-10rem] w-[32rem] h-[32rem] bg-brand-light/70 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10rem] right-[-10rem] w-[32rem] h-[32rem] bg-accent-light/70 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center z-10 pt-8 sm:pt-14">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light/90 border border-brand/20 text-brand text-xs font-semibold mb-6 shadow-2xs">
          <HiOutlineSparkles className="w-4 h-4" />
          <span>The Developer & Engineer Community</span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand to-accent flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-brand/25 mb-6 transform hover:rotate-6 transition-transform duration-300">
            C
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display leading-[1.15]">
            Connect, share, and grow your{' '}
            <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
              professional network
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            ConnectHub provides a focused, real-time environment for tech professionals to exchange ideas, publish insights, and collaborate.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/login')}
              className="text-base px-8 h-12 shadow-lg shadow-brand/20 hover:scale-[1.02]"
            >
              Sign In
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/signUp')}
              className="text-base px-8 h-12 hover:scale-[1.02]"
            >
              <span>Create Account</span>
              <HiArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Visual CSS / SVG Graphic: Modern Network Flow & Feed Simulation */}
        <div className="w-full max-w-3xl mt-14 p-6 sm:p-8 rounded-3xl bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Mock Network Nodes SVG */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            {/* Mock Profile 1 */}
            <div className="flex items-center gap-3.5 bg-white/90 dark:bg-slate-800/90 p-3.5 pr-6 rounded-2xl border border-slate-200/70 dark:border-slate-700 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand to-cyan-500 flex items-center justify-center text-white font-bold text-base shadow-xs">
                JD
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Jane Doe</div>
                <div className="text-xs text-slate-500">Full Stack Engineer</div>
              </div>
            </div>

            {/* Connecting Visual Pulse */}
            <div className="flex items-center gap-2 text-brand font-semibold text-xs py-1 px-3 bg-brand-light dark:bg-blue-950/60 rounded-full border border-brand/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Real-Time Connected</span>
            </div>

            {/* Mock Profile 2 */}
            <div className="flex items-center gap-3.5 bg-white/90 dark:bg-slate-800/90 p-3.5 pr-6 rounded-2xl border border-slate-200/70 dark:border-slate-700 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent to-purple-500 flex items-center justify-center text-white font-bold text-base shadow-xs">
                AK
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Alex Kim</div>
                <div className="text-xs text-slate-500">Cloud Architect</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand" /> Instant peer-to-peer notifications
            </span>
            <span>Active Community Feed</span>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12 mb-16">
          {/* Feature 1 */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-slate-200/70 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center">
            <div className="w-13 h-13 rounded-2xl bg-brand-light flex items-center justify-center text-brand mb-4 shadow-xs border border-brand/10">
              <FaUserFriends className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Meaningful Networking
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Build authentic professional connections, view detailed developer profiles, and discover opportunities to expand your sphere.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-slate-200/70 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center">
            <div className="w-13 h-13 rounded-2xl bg-brand-light flex items-center justify-center text-brand mb-4 shadow-xs border border-brand/10">
              <FaRegPaperPlane className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Share Updates & Insights
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Post technical write-ups, architecture diagrams, and milestone updates. Comment and like community posts with instant feedback.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-slate-200/70 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center">
            <div className="w-13 h-13 rounded-2xl bg-brand-light flex items-center justify-center text-brand mb-4 shadow-xs border border-brand/10">
              <IoIosNotifications className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Real-Time Notifications
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Stay in sync with instant live updates when other engineers send connection requests, accept invites, or interact with your posts.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Linking Informational Pages */}
      <footer className="w-full max-w-6xl mx-auto pt-8 border-t border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 z-10 pb-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-slate-300">ConnectHub</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium">
          <Link to="/about" className="hover:text-brand transition-colors">
            About
          </Link>
          <Link to="/accessibility" className="hover:text-brand transition-colors">
            Accessibility
          </Link>
          <Link to="/help" className="hover:text-brand transition-colors">
            Help Center
          </Link>
          <Link to="/privacy" className="hover:text-brand transition-colors">
            Privacy & Terms
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Landing
