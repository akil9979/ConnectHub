import React, { useEffect, useState, useContext } from 'react'
import Nav from '../component/Nav'
import { authdatacontext } from '../context/AuthContext.jsx'
import axios from 'axios'
import profile from '../assets/profile.webp'
import { RxCross1 } from 'react-icons/rx'
import { IoIosNotificationsOff } from 'react-icons/io'
import { AiFillLike } from 'react-icons/ai'
import { FaCommentDots, FaUserCheck } from 'react-icons/fa'
import logger from '../utils/logger'
import Avatar from '../component/ui/Avatar'
import Button from '../component/ui/Button'
import EmptyState from '../component/ui/EmptyState'

function Notification() {
  const { serverURL } = useContext(authdatacontext)
  const [notificationData, setnotificationData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleGetNotification = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await axios.get(`${serverURL}/api/v1/notification/get`, {
        withCredentials: true
      })
      if (result.data?.notification) {
        setnotificationData(result.data.notification)
      }
    } catch (err) {
      setError('Unable to load notifications.')
      logger.error('Error fetching notifications:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteNotification = async (id) => {
    // Optimistic UI update
    setnotificationData((prev) => prev.filter((noti) => noti._id !== id))
    try {
      await axios.delete(`${serverURL}/api/v1/notification/delete/${id}`, {
        withCredentials: true
      })
    } catch (err) {
      logger.error('Error deleting notification:', err)
      handleGetNotification()
    }
  }

  const handleDeleteAllNotification = async () => {
    // Optimistic UI update
    setnotificationData([])
    try {
      await axios.delete(`${serverURL}/api/v1/notification/`, { withCredentials: true })
    } catch (err) {
      logger.error('Error clearing all notifications:', err)
      handleGetNotification()
    }
  }

  useEffect(() => {
    handleGetNotification()
  }, [])

  const getTypeBadge = (type) => {
    switch (type) {
      case 'like':
        return (
          <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
            <AiFillLike className="w-3 h-3" />
          </span>
        )
      case 'comment':
        return (
          <span className="w-5 h-5 rounded-full bg-brand-light text-brand flex items-center justify-center flex-shrink-0">
            <FaCommentDots className="w-2.5 h-2.5" />
          </span>
        )
      case 'connectionAccepted':
        return (
          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <FaUserCheck className="w-2.5 h-2.5" />
          </span>
        )
      default:
        return null
    }
  }

  const getTypeDescription = (type) => {
    switch (type) {
      case 'like':
        return 'liked your post'
      case 'comment':
        return 'commented on your post'
      case 'connectionAccepted':
        return 'accepted your connection request'
      default:
        return 'interacted with your profile'
    }
  }

  return (
    <div className="w-full min-h-screen pt-20 pb-20 px-4 sm:px-6 flex flex-col items-center">
      <Nav />

      {/* Main Container */}
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {/* Header Bar */}
        <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl flex items-center justify-between p-4 sm:px-6">
          <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
            Notifications ({loading ? '...' : notificationData?.length || 0})
          </h1>
          {!loading && notificationData?.length > 0 && (
            <Button
              variant="dangerOutline"
              size="sm"
              onClick={handleDeleteAllNotification}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="flex flex-col gap-3 animate-pulse">
            <div className="w-full h-20 bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-slate-200/60 dark:border-slate-800" />
            <div className="w-full h-20 bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-slate-200/60 dark:border-slate-800" />
            <div className="w-full h-20 bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-slate-200/60 dark:border-slate-800" />
          </div>
        ) : error ? (
          /* Error State */
          <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-sm text-rose-600 font-medium">{error}</p>
            <Button variant="primary" size="sm" onClick={handleGetNotification}>
              Retry
            </Button>
          </div>
        ) : notificationData.length > 0 ? (
          /* Notifications List */
          <div className="flex flex-col gap-3">
            {notificationData.map((noti, index) => (
              <div
                key={noti._id || index}
                className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 hover:shadow-md rounded-2xl p-4 flex items-start sm:items-center justify-between gap-3.5 transition-all duration-150 relative group"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                  {/* Avatar with Type Badge Overlay */}
                  <div className="relative flex-shrink-0">
                    <Avatar
                      src={noti.relatedUser?.profileImage || profile}
                      name={`${noti?.relatedUser?.firstname || ''} ${noti?.relatedUser?.lastname || ''}`}
                      size="md"
                    />
                    <div className="absolute -bottom-1 -right-1">
                      {getTypeBadge(noti.type)}
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="flex flex-col min-w-0 flex-1 text-xs sm:text-sm">
                    <div className="leading-snug">
                      <span className="font-bold text-slate-900 dark:text-white mr-1.5">
                        {`${noti?.relatedUser?.firstname || ''} ${noti?.relatedUser?.lastname || ''}`}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {getTypeDescription(noti.type)}
                      </span>
                    </div>

                    {/* Attached Post preview */}
                    {noti.relatedPost && (
                      <div className="flex items-center gap-2 mt-2 p-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 max-w-md">
                        {noti.relatedPost.image && (
                          <img
                            src={noti.relatedPost.image}
                            alt="Post thumbnail"
                            className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <span className="text-xs text-slate-500 truncate">
                          {noti.relatedPost.description}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleDeleteNotification(noti._id)}
                  aria-label="Delete notification"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors flex-shrink-0"
                >
                  <RxCross1 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <EmptyState
            icon={IoIosNotificationsOff}
            title="All caught up!"
            description="You don't have any notifications right now. When peers interact with you or your posts, alerts will appear here."
          />
        )}
      </div>
    </div>
  )
}

export default Notification
