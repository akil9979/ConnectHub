import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { authdatacontext } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logger from '../utils/logger'
import { connectSocket, disconnectSocket } from '../socket'

export const userDatacontext = React.createContext()

function UserContext({ children }) {
  const [userdata, setuserdata] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [edit, setedit] = useState(false)
  const { serverURL } = useContext(authdatacontext)
  const [postdata, setpostdata] = useState([])
  const [profiledata, setprofiledata] = useState([])
  const navigate = useNavigate()

  const getcurrentuser = useCallback(async () => {
    try {
      const result = await axios.get(`${serverURL}/api/v1/user/currentuser`, { withCredentials: true })
      if (result.data?.currentuser) {
        setuserdata(result.data.currentuser)
        return result.data.currentuser
      } else {
        setuserdata(null)
        return null
      }
    } catch (error) {
      // 401 is expected if user is not logged in / has no active session cookie
      if (error.response?.status === 401) {
        logger.log("User session is unauthenticated (guest)")
      } else {
        logger.error("Error checking current user session:", error)
      }
      setuserdata(null)
      return null
    } finally {
      setAuthLoading(false)
    }
  }, [serverURL])

  const getPost = useCallback(async () => {
    try {
      const result = await axios.get(`${serverURL}/api/v1/post/getPost`, { withCredentials: true })
      if (result.data?.post) {
        setpostdata(result.data.post)
      }
    } catch (error) {
      logger.error("Error fetching posts:", error)
    }
  }, [serverURL])

  // Hydrate auth on application start
  useEffect(() => {
    getcurrentuser()
  }, [getcurrentuser])

  // Manage authenticated post fetching and socket connection lifecycle
  useEffect(() => {
    if (userdata?._id) {
      connectSocket(userdata._id)
      getPost()
    } else {
      disconnectSocket()
    }

    return () => {
      if (!userdata) {
        disconnectSocket()
      }
    }
  }, [userdata, getPost])

  const handleGetProfile = async (username) => {
    try {
      const result = await axios.get(`${serverURL}/api/v1/user/getprofile/${username}`, { withCredentials: true })
      if (result.data?.user) {
        setprofiledata(result.data.user)
        navigate("/profile")
      }
    } catch (error) {
      logger.error("Error fetching profile:", error)
    }
  }

  const logout = async () => {
    try {
      await axios.post(`${serverURL}/api/v1/auth/logout`, {}, { withCredentials: true })
    } catch (error) {
      logger.error("Error logging out from server:", error)
    } finally {
      disconnectSocket()
      setuserdata(null)
      setpostdata([])
      setprofiledata([])
      navigate("/login")
    }
  }

  const value = {
    userdata,
    setuserdata,
    authLoading,
    edit,
    setedit,
    postdata,
    setpostdata,
    getPost,
    profiledata,
    setprofiledata,
    handleGetProfile,
    getcurrentuser,
    logout,
  }

  return (
    <userDatacontext.Provider value={value}>
      {children}
    </userDatacontext.Provider>
  )
}

export default UserContext
