import React, { use } from 'react'
import Nav from '../component/Nav'
import axios from 'axios'
import { authdatacontext } from '../context/AuthContext.jsx'
import { useEffect } from 'react'
import profile from '../assets/profile.webp'
import { userDatacontext } from '../context/UserContext'
function Network() {
  const { serverURL } = React.useContext(authdatacontext)
  const [requests, setRequests] = React.useState([])
  // const { userdata } = React.useContext(userDatacontext)
  const handleGetRequest = async () => {
    try {
      const result = await axios.get(serverURL + `/api/v1/connection/requests`, { withCredentials: true });
      console.log(result.data);
      setRequests(result.data.requests)
    } catch (error) {
      console.log("error in getting request:", error);
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
        console.log("error in accepting request:", error);
        
      }
    }

  useEffect(() => {
    handleGetRequest()
  }, [])

  return (
    <div className='w-screen min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 pt-24 flex flex-col items-center gap-6 px-4 pb-10'>
      <Nav />
      <div className='w-full max-w-[600px] min-h-[70px] bg-white/70 backdrop-blur-md shadow-md border border-white/40 rounded-2xl flex items-center p-6 text-lg font-semibold text-gray-900 mb-2'>
        Request {requests.length}
      </div>
      {requests.length>0 &&   <div className='w-full max-w-[600px] flex flex-col gap-4'>
        {requests.map((request, index) => (
          <div className='w-full bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4 p-4'>
            <div className='flex justify-center items-center gap-3 min-w-0'>
            <div className='w-[60px] h-[60px] rounded-full flex justify-center items-center overflow-hidden cursor-pointer ring-2 ring-gray-100 flex-shrink-0'>
              <img src={request.sender.profileImage || profile} alt="" className='w-full h-full object-cover' />
            </div>
            
            <div className='text-gray-900 font-semibold text-base truncate'>{`${request?.sender.firstname} ${request?.sender.lastname}`}</div>
            </div>
            <div className='flex gap-2 flex-shrink-0'>
              <button className='min-w-[100px] h-9 px-3 rounded-xl bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md border border-transparent cursor-pointer text-sm font-medium transition-all duration-200' onClick={()=>handleAcceptRequest(request._id)}>Accept</button>
              <button className='min-w-[100px] h-9 px-3 rounded-xl bg-red-50 text-red-600 border border-red-100 shadow-sm hover:bg-red-100 cursor-pointer text-sm font-medium transition-all duration-200' onClick={()=>handleRejectRequest(request._id)}>Reject</button>
            </div>
          </div>
        ))}
      </div>}
    
    </div>
  )
}

export default Network
