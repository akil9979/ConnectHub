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
    <div className='w-screen h-[100vh] bg-[#F3F4F6] pt-[100px] flex flex-col items-center  gap-[40px]'>
      <Nav />
      <div className='w-[90%] max-w-[600px] h-[70px] bg-[white] shadow-lg rounded-lg flex items-center p-[10px] text-[22px] text-gray-600'>
        Request {requests.length}
      </div>
      {requests.length>0 &&   <div className='min-h-[70px] w-[90%] max-w-[600px] shadow-lg rounded-lg flex flex-col gap-[20px] bg-white'>
        {requests.map((request, index) => (
          <div className='w-full min flex items-center justify-between gap-[10px] p-[20px]'>
            <div className='flex justify-center items-center gap-[10px]'>
            <div className='w-[60px] h-[60px] rounded-full flex justify-center items-center overflow-hidden  cursor-pointer'>
              <img src={request.sender.profileImage || profile} alt="" className='w-full  h-full' />
            </div>
            
            <div className='text-gray-600 font-semibold text-[19px]'>{`${request?.sender.firstname} ${request?.sender.lastname}`}</div>
            </div>
            <div>
              <button className='w-[100px] h-[35px] rounded-full border-2 border-[#2dc0ff] cursor-pointer text-[#2dc0ff] mr-2' onClick={()=>handleAcceptRequest(request._id)}>Accept</button>
              <button className='w-[100px] h-[35px] rounded-full border-2 border-red-400 cursor-pointer text-red-400'onClick={()=>handleRejectRequest(request._id)}>Reject</button>
            </div>
          </div>
        ))}
      </div>}
    
    </div>
  )
}

export default Network
