import React, { useContext, useEffect, useState, useRef } from 'react'
import { IoSearch } from 'react-icons/io5'
import { IoHomeSharp, IoHomeOutline } from 'react-icons/io5'
import { HiUserGroup, HiOutlineUserGroup } from 'react-icons/hi2'
import { IoIosNotifications, IoIosNotificationsOutline } from 'react-icons/io'
import { MdOutlineExplore, MdExplore } from 'react-icons/md'
import { FiLogOut, FiUser } from 'react-icons/fi'
import profile from '../assets/profile.webp'
import { userDatacontext } from '../context/UserContext'
import { authdatacontext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import logger from '../utils/logger'
import Avatar from './ui/Avatar'

function Nav() {
  const { serverURL } = useContext(authdatacontext)
  const { userdata, handleGetProfile, logout } = useContext(userDatacontext)
  const [showPopup, setshowPopup] = useState(false)
  const [searchQuery, setsearchQuery] = useState('')
  const [searchResults, setsearchResults] = useState([])
  const searchRef = useRef(null)
  const popupRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const currentPath = location.pathname.toLowerCase()

  const handleSignOut = async () => {
    setshowPopup(false)
    await logout()
  }

  const handleSearch = async () => {
    try {
      const result = await axios.get(
        `${serverURL}/api/v1/user/search?query=${encodeURIComponent(searchQuery)}`,
        { withCredentials: true }
      )
      if (result.data?.users) {
        setsearchResults(result.data.users)
      }
    } catch (error) {
      logger.error('Error searching users:', error)
    }
  }

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const timer = setTimeout(() => {
        handleSearch()
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setsearchResults([])
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setsearchResults([])
        setsearchQuery('')
      }
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // Only close if click is not on the avatar button itself
        const avatarBtn = document.getElementById('nav-avatar-btn')
        if (avatarBtn && !avatarBtn.contains(event.target)) {
          setshowPopup(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const navItems = [
    {
      label: 'Home',
      path: '/',
      isActive: currentPath === '/',
      action: () => navigate('/'),
      ActiveIcon: IoHomeSharp,
      InactiveIcon: IoHomeOutline
    },
    {
      label: 'Network',
      path: '/network',
      isActive: currentPath === '/network',
      action: () => navigate('/Network'),
      ActiveIcon: HiUserGroup,
      InactiveIcon: HiOutlineUserGroup
    },
    {
      label: 'Explore',
      path: '/explore',
      isActive: currentPath === '/explore',
      action: () => navigate('/explore'),
      ActiveIcon: MdExplore,
      InactiveIcon: MdOutlineExplore
    },
    {
      label: 'Notifications',
      path: '/notification',
      isActive: currentPath === '/notification',
      action: () => navigate('/Notification'),
      ActiveIcon: IoIosNotifications,
      InactiveIcon: IoIosNotificationsOutline
    }
  ]

  return (
    <>
      {/* Top Navigation Bar */}
      <nav
        aria-label="Main Navigation"
        className="w-full h-16 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs fixed top-0 left-0 z-[80] transition-all duration-200"
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left Brand & Search */}
          <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0 max-w-xl">
            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
              aria-label="ConnectHub home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand to-accent flex items-center justify-center text-white font-extrabold text-lg shadow-sm shadow-brand/30 group-hover:scale-105 transition-transform duration-200">
                C
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display hidden sm:inline">
                Connect<span className="text-brand">Hub</span>
              </span>
            </div>

            {/* Search Box */}
            <div ref={searchRef} className="relative flex-1 min-w-[140px] max-w-sm">
              <div className="relative flex items-center">
                <IoSearch
                  className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Search members..."
                  aria-label="Search members"
                  onChange={(e) => setsearchQuery(e.target.value)}
                  value={searchQuery}
                  className="w-full h-9.5 pl-9.5 pr-4 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-brand focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-brand/20 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none transition-all duration-200"
                />
              </div>

              {/* Search Results Dropdown */}
              {searchResults?.length > 0 && (
                <div className="absolute top-12 left-0 w-full sm:w-[380px] max-h-[420px] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 flex flex-col gap-1 z-[100] animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                    Search Results ({searchResults.length})
                  </div>
                  {searchResults.map((sea) => (
                    <div
                      key={sea._id}
                      onClick={() => {
                        setsearchResults([])
                        setsearchQuery('')
                        handleGetProfile(sea?.username)
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition-colors duration-150 group"
                    >
                      <Avatar
                        src={sea.profileImage || profile}
                        name={`${sea?.firstname || ''} ${sea?.lastname || ''}`}
                        size="md"
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-brand transition-colors">
                          {`${sea?.firstname || ''} ${sea?.lastname || ''}`}
                        </span>
                        <span className="text-xs text-slate-500 truncate">
                          {sea?.headline || `@${sea?.username || 'member'}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Navigation Links & Profile */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const IconComponent = item.isActive ? item.ActiveIcon : item.InactiveIcon
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={`relative flex flex-col items-center justify-center min-w-[64px] lg:min-w-[72px] h-14 px-2 rounded-xl transition-all duration-150 cursor-pointer select-none ${
                      item.isActive
                        ? 'text-brand font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60 font-medium'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 transition-transform duration-150" />
                    <span className="text-[11px] mt-1 leading-none">{item.label}</span>
                    {item.isActive && (
                      <span className="absolute bottom-1 w-5 h-0.5 bg-brand rounded-full" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Mobile Notification Button (Visible on mobile top bar) */}
            <button
              onClick={() => navigate('/Notification')}
              aria-label="Notifications"
              className={`md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-colors cursor-pointer ${
                currentPath === '/notification'
                  ? 'text-brand bg-brand-light dark:bg-blue-950/40'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <IoIosNotifications className="w-6 h-6" />
            </button>

            {/* Profile Avatar Button */}
            <div className="relative">
              <button
                id="nav-avatar-btn"
                type="button"
                onClick={() => setshowPopup((prev) => !prev)}
                aria-label="User account menu"
                aria-expanded={showPopup}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ring-2 ring-transparent hover:ring-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-all duration-150"
              >
                <Avatar
                  src={userdata?.profileImage || profile}
                  name={`${userdata?.firstname || ''} ${userdata?.lastname || ''}`}
                  size="md"
                  ring={true}
                />
              </button>

              {/* Profile Menu Popup */}
              {showPopup && userdata && (
                <div
                  ref={popupRef}
                  className="w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 absolute top-14 right-0 p-4 flex flex-col gap-3.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  {/* User Header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <Avatar
                      src={userdata?.profileImage || profile}
                      name={`${userdata?.firstname || ''} ${userdata?.lastname || ''}`}
                      size="lg"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-slate-900 dark:text-white text-sm truncate">
                        {`${userdata?.firstname || ''} ${userdata?.lastname || ''}`}
                      </span>
                      <span className="text-xs text-slate-500 truncate">
                        {userdata?.headline || `@${userdata?.username || 'member'}`}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    className="w-full h-9 rounded-xl bg-brand text-white text-xs sm:text-sm font-semibold hover:bg-brand-dark transition-all duration-150 shadow-xs cursor-pointer flex items-center justify-center gap-2"
                    onClick={() => {
                      setshowPopup(false)
                      handleGetProfile(userdata?.username)
                    }}
                  >
                    <FiUser className="w-4 h-4" />
                    <span>View Profile</span>
                  </button>

                  <button
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-colors cursor-pointer text-left"
                    onClick={() => {
                      setshowPopup(false)
                      navigate('/Network')
                    }}
                  >
                    <HiUserGroup className="w-4 h-4 text-slate-500" />
                    <span>My Network</span>
                  </button>

                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-0.5" />

                  <button
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs sm:text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors cursor-pointer text-left"
                    onClick={handleSignOut}
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 z-[80] px-2 flex items-center justify-around shadow-lg"
      >
        {navItems.map((item) => {
          const IconComponent = item.isActive ? item.ActiveIcon : item.InactiveIcon
          return (
            <button
              key={item.label}
              onClick={item.action}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 min-w-[48px] tap-target cursor-pointer transition-colors duration-150 ${
                item.isActive
                  ? 'text-brand font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-[10px] mt-1 tracking-tight leading-none">
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}

export default Nav
