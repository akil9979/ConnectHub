import React, { useContext, useEffect, useState, useCallback } from 'react'
import { authdatacontext } from '../context/AuthContext'
import axios from 'axios'
import socket from '../socket'
import { userDatacontext } from '../context/UserContext'
import logger from '../utils/logger'

function WithdrawConnectionButton({ userId }) {
  const { serverURL } = useContext(authdatacontext)
  const { userdata } = useContext(userDatacontext)
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGetStatus = useCallback(async () => {
    if (!userId || !userdata?._id) return
    try {
      const result = await axios.get(`${serverURL}/api/v1/connection/getStatus/${userId}`, { withCredentials: true })
      if (result.data?.status) {
        setStatus(result.data.status)
      }
    } catch (error) {
      logger.error("Error getting connection status:", error)
    }
  }, [serverURL, userId, userdata?._id])

  const handleWithdrawRequest = async () => {
    setLoading(true)
    try {
      await axios.delete(`${serverURL}/api/v1/connection/withdraw/${userId}`, { withCredentials: true })
      setStatus("connect")
    } catch (error) {
      logger.error("Error withdrawing connection request:", error)
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

    socket.on("statusUpdate", handleStatusUpdate)
    return () => {
      socket.off("statusUpdate", handleStatusUpdate)
    }
  }, [userId, handleGetStatus])

  if (status !== "pending") {
    return null
  }

  return (
    <button
      className='min-w-[90px] h-9 px-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900 cursor-pointer flex justify-center items-center text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
      disabled={loading}
      onClick={handleWithdrawRequest}
    >
      {loading ? "..." : "Withdraw"}
    </button>
  )
}

export default WithdrawConnectionButton

