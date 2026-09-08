import React, { useContext, useEffect, useState, useCallback } from 'react'
import { authdatacontext } from '../context/AuthContext'
import axios from 'axios'
import socket from '../socket'
import { userDatacontext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import logger from '../utils/logger'

function ConnectionButton({ userId }) {
  const { serverURL } = useContext(authdatacontext)
  const { userdata } = useContext(userDatacontext)
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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

  const handleSendRequest = async () => {
    setLoading(true)
    try {
      await axios.post(`${serverURL}/api/v1/connection/send/${userId}`, {}, { withCredentials: true })
      setStatus("pending")
    } catch (error) {
      logger.error("Error sending connection request:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveConnection = async () => {
    setLoading(true)
    try {
      await axios.delete(`${serverURL}/api/v1/connection/remove/${userId}`, { withCredentials: true })
      setStatus("connect")
    } catch (error) {
      logger.error("Error removing connection:", error)
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

  const handleClick = async () => {
    if (status === "disconnect") {
      await handleRemoveConnection()
    } else if (status === "connect") {
      await handleSendRequest()
    } else if (status === "received") {
      navigate("/Network")
    }
  }

  if (!status) {
    return (
      <div className='min-w-[120px] h-9 px-4 rounded-lg bg-gray-100 animate-pulse'></div>
    )
  }

  return (
    <button 
      className='min-w-[120px] h-9 px-4 rounded-lg bg-brand text-white shadow-sm hover:bg-brand-dark cursor-pointer flex justify-center items-center gap-2 text-[14px] font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed capitalize' 
      disabled={status === "pending" || loading} 
      onClick={handleClick}
    >
      {loading ? "..." : status}
    </button>
  )
}

export default ConnectionButton
