import React, { useContext, useEffect, useState, useCallback } from 'react'
import { authdatacontext } from '../context/AuthContext'
import axios from 'axios'
import socket from '../socket'
import { userDatacontext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import logger from '../utils/logger'
import { HiUserPlus, HiCheck, HiClock, HiArrowUturnRight } from 'react-icons/hi2'

function ConnectionButton({ userId }) {
  const { serverURL } = useContext(authdatacontext)
  const { userdata } = useContext(userDatacontext)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleGetStatus = useCallback(async () => {
    if (!userId || !userdata?._id) return
    try {
      const result = await axios.get(`${serverURL}/api/v1/connection/getStatus/${userId}`, {
        withCredentials: true
      })
      if (result.data?.status) {
        setStatus(result.data.status)
      }
    } catch (error) {
      logger.error('Error getting connection status:', error)
    }
  }, [serverURL, userId, userdata?._id])

  const handleSendRequest = async () => {
    setLoading(true)
    try {
      await axios.post(`${serverURL}/api/v1/connection/send/${userId}`, {}, { withCredentials: true })
      setStatus('pending')
    } catch (error) {
      logger.error('Error sending connection request:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveConnection = async () => {
    setLoading(true)
    try {
      await axios.delete(`${serverURL}/api/v1/connection/remove/${userId}`, {
        withCredentials: true
      })
      setStatus('connect')
    } catch (error) {
      logger.error('Error removing connection:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetStatus()

    const handleStatusUpdate = (data) => {
      if (data?.updatedUserId === userId && data?.newStatus) {
        setStatus(data.newStatus)
      }
    }

    socket.on('statusUpdate', handleStatusUpdate)
    return () => {
      socket.off('statusUpdate', handleStatusUpdate)
    }
  }, [userId, handleGetStatus])

  const handleClick = async () => {
    if (status === 'disconnect') {
      await handleRemoveConnection()
    } else if (status === 'connect') {
      await handleSendRequest()
    } else if (status === 'received') {
      navigate('/Network')
    }
  }

  if (!status) {
    return <div className="min-w-[100px] h-9 px-3 rounded-xl bg-slate-200/60 dark:bg-slate-800 animate-pulse" />
  }

  const getButtonStyles = () => {
    switch (status) {
      case 'connect':
        return 'bg-brand text-white hover:bg-brand-dark shadow-xs hover:shadow-sm border border-transparent'
      case 'pending':
        return 'bg-slate-100 text-slate-500 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 cursor-not-allowed'
      case 'disconnect':
        return 'bg-white text-slate-700 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
      case 'received':
        return 'bg-accent text-white hover:bg-accent-dark shadow-xs border border-transparent'
      default:
        return 'bg-brand text-white hover:bg-brand-dark'
    }
  }

  const getButtonContent = () => {
    if (loading) {
      return (
        <span className="flex items-center gap-1.5">
          <svg className="animate-spin h-3.5 w-3.5 text-current" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Updating...</span>
        </span>
      )
    }

    switch (status) {
      case 'connect':
        return (
          <>
            <HiUserPlus className="w-4 h-4" />
            <span>Connect</span>
          </>
        )
      case 'pending':
        return (
          <>
            <HiClock className="w-4 h-4 text-slate-400" />
            <span>Pending</span>
          </>
        )
      case 'disconnect':
        return (
          <>
            <HiCheck className="w-4 h-4 text-emerald-500" />
            <span>Connected</span>
          </>
        )
      case 'received':
        return (
          <>
            <HiArrowUturnRight className="w-4 h-4" />
            <span>Respond</span>
          </>
        )
      default:
        return status
    }
  }

  return (
    <button
      type="button"
      className={`min-w-[100px] h-9 px-3.5 rounded-xl flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer select-none disabled:opacity-60 disabled:cursor-not-allowed ${getButtonStyles()}`}
      disabled={status === 'pending' || loading}
      onClick={handleClick}
      title={status === 'disconnect' ? 'Click to disconnect' : undefined}
    >
      {getButtonContent()}
    </button>
  )
}

export default ConnectionButton
