import React, { useContext, useEffect, useState, useCallback } from 'react'
import { authdatacontext } from '../context/AuthContext'
import axios from 'axios'
import socket from '../socket'
import { userDatacontext } from '../context/UserContext'
import logger from '../utils/logger'
import { HiXMark } from 'react-icons/hi2'

function WithdrawConnectionButton({ userId }) {
  const { serverURL } = useContext(authdatacontext)
  const { userdata } = useContext(userDatacontext)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

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

  const handleWithdrawRequest = async () => {
    setLoading(true)
    try {
      await axios.delete(`${serverURL}/api/v1/connection/withdraw/${userId}`, {
        withCredentials: true
      })
      setStatus('connect')
    } catch (error) {
      logger.error('Error withdrawing connection request:', error)
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

  if (status !== 'pending') {
    return null
  }

  return (
    <button
      type="button"
      className="min-w-[90px] h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 cursor-pointer flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold transition-all duration-150 shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed select-none"
      disabled={loading}
      onClick={handleWithdrawRequest}
      aria-label="Withdraw invitation"
    >
      {loading ? (
        <span className="flex items-center gap-1">
          <svg className="animate-spin h-3 w-3 text-current" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>...</span>
        </span>
      ) : (
        <>
          <HiXMark className="w-4 h-4" />
          <span>Withdraw</span>
        </>
      )}
    </button>
  )
}

export default WithdrawConnectionButton
