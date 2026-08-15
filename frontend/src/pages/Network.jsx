import React, { useEffect } from 'react'
import Nav from '../component/Nav'
import axios from 'axios'
import { authdatacontext } from '../context/AuthContext.jsx'
import profile from '../assets/profile.webp'
import { userDatacontext } from '../context/UserContext'
import ConnectionButton from '../component/ConnectionButton'
import { FaUserFriends } from 'react-icons/fa'

function Network() {
  const { serverURL } = React.useContext(authdatacontext)
  const [requests, setRequests] = React.useState([])
  const [suggestedUsers, setSuggestedUsers] = React.useState([])

  const handleGetRequest = async () => {
    try {
      const result = await axios.get(serverURL + `/api/v1/connection/requests`, { withCredentials: true });
      console.log(result.data);
      setRequests(result.data.requests)
    } catch (error) {
      console.log("error in getting request:", error);
    }
  }

  const handleSuggestion = async () => {
    try {
      const result = await axios.get(serverURL + "/api/v1/user/suggestedUsers", { withCredentials: true })
      setSuggestedUsers(result.data.getSuggestedUsers)
    } catch (error) {
      console.log("error in getting suggested users:", error);
    }
  }

  const handleAcceptRequest = async (requestId) => {
    try {
      const result = await axios.put(serverURL + `/api/v1/connection/accept/${requestId}`,{}, { withCredentials: true });
      console.log(result.data);
      setRequests(requests.filter(request=>request._id!==requestId))
    } catch (error) {
      console.log("error in accepting request:", error);
    }
  }

  const handleRejectRequest = async (requestId) => {
    try {
      const result = await axios.put(serverURL + `/api/v1/connection/reject/${requestId}`,{}, { withCredentials: true });
      console.log(result.data);
      setRequests(requests.filter(request=>request._id!==requestId))
    } catch (error) {
      console.log("error in rejecting request:", error);
    }
  }

  useEffect(() => {
    handleGetRequest()
    handleSuggestion()
  }, [])

  const hasContent = requests.length > 0 || suggestedUsers.length > 0

  return (
    <div className='w-screen min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 pt-24 flex flex-col items-center gap-6 px-4 pb-10'>
      <Nav />
      
      {!hasContent ? (
        <div className='w-full max-w-[600px] bg-white/70 backdrop-blur-md shadow-md border border-white/40 rounded-2xl flex flex-col items-center justify-center p-10 text-center gap-4 hover:bg-white/80 transition-all duration-300'>
          <div className='w-16 h-16 rounded-full bg-brand-light flex items-center justify-center text-brand shadow-sm border border-brand-light/50'>
            <FaUserFriends className='w-8 h-8' />
          </div>
          <div>
            <h3 className='text-lg font-bold text-gray-900 mb-1'>Your network is quiet</h3>
            <p className='text-sm text-gray-500 max-w-sm'>
              No connection requests or suggestions available right now. Keep searching to find people you know!
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Requests Section */}
          <div className='w-full max-w-[600px]'>
            <div className='w-full min-h-[70px] bg-white/70 backdrop-blur-md shadow-md border border-white/40 rounded-2xl flex items-center p-6 text-lg font-semibold text-gray-900 mb-4'>
              Requests ({requests.length})
            </div>
            {requests.length > 0 && (
              <div className='w-full flex flex-col gap-4'>
                {requests.map((request) => (
                  <div key={request._id} className='w-full bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4 p-4'>
                    <div className='flex justify-center items-center gap-3 min-w-0'>
                      <div className='w-[60px] h-[60px] rounded-full flex justify-center items-center overflow-hidden cursor-pointer ring-2 ring-gray-100 flex-shrink-0'>
                        <img src={request.sender.profileImage || profile} alt="" className='w-full h-full object-cover' />
                      </div>
                      <div className='text-gray-900 font-semibold text-base truncate'>{`${request?.sender.firstname} ${request?.sender.lastname}`}</div>
                    </div>
                    <div className='flex gap-2 flex-shrink-0'>
                      <button className='min-w-[100px] h-9 px-3 rounded-xl bg-brand text-white shadow-sm hover:bg-brand-dark hover:shadow-md border border-transparent cursor-pointer text-sm font-medium transition-all duration-200' onClick={()=>handleAcceptRequest(request._id)}>Accept</button>
                      <button className='min-w-[100px] h-9 px-3 rounded-xl bg-red-50 text-red-600 border border-red-100 shadow-sm hover:bg-red-100 cursor-pointer text-sm font-medium transition-all duration-200' onClick={()=>handleRejectRequest(request._id)}>Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Suggestions Section */}
          {suggestedUsers.length > 0 && (
            <div className='w-full max-w-[600px] mt-4'>
              <div className='w-full min-h-[70px] bg-white/70 backdrop-blur-md shadow-md border border-white/40 rounded-2xl flex items-center p-6 text-lg font-semibold text-gray-900 mb-4'>
                People you may know
              </div>
              <div className='w-full flex flex-col gap-4'>
                {suggestedUsers.map((user) => (
                  <div key={user._id} className='w-full bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4 p-4'>
                    <div className='flex justify-center items-center gap-3 min-w-0'>
                      <div className='w-[60px] h-[60px] rounded-full flex justify-center items-center overflow-hidden cursor-pointer ring-2 ring-gray-100 flex-shrink-0'>
                        <img src={user.profileImage || profile} alt="" className='w-full h-full object-cover' />
                      </div>
                      <div className='flex flex-col min-w-0'>
                        <div className='text-gray-900 font-semibold text-base truncate'>{`${user?.firstname} ${user?.lastname}`}</div>
                        <div className='text-gray-500 text-sm truncate'>{user?.headline}</div>
                      </div>
                    </div>
                    <div className='flex-shrink-0'>
                      <ConnectionButton userId={user._id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Network
