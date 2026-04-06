import React, { useEffect } from 'react'
import Nav from "../component/Nav"
import { authdatacontext } from '../context/Authcontext'
import axios from 'axios'
import profile from '../assets/profile.webp'
import { RxCross1 } from "react-icons/rx";

function Notification() {
    const { serverURL } = React.useContext(authdatacontext)
    let [notificationData, setnotificationData] = React.useState([])

    const handleGetNotification = async () => {
        try {
            const result = await axios.get(serverURL + "/api/v1/notification/get", { withCredentials: true })
            setnotificationData(result.data.notification)
           
        } catch (error) {
            console.log(error);
        }
    }
    const handleDeleteNotification = async (id) => {
        try {
          const result=  await axios.delete(serverURL+`/api/v1/notification/delete/${id}`,{withCredentials:true})
          
            await handleGetNotification()
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteAllNotification = async (id) => {
        try {
          const result=  await axios.delete(serverURL+`/api/v1/notification/`,{withCredentials:true})
          
            await handleGetNotification()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleGetNotification()
    }, [])

    return (
        <div className='w-screen min-h-[100vh] bg-[#f0efe7] pt-[100px] flex flex-col items-center'>
            <Nav />

            
            <div className='w-[90%] max-w-[600px] h-[70px] bg-white shadow rounded-xl flex items-center justify-between mb-[20px] px-[20px] text-[20px] font-semibold text-gray-600'>
                 Notifications ({notificationData?.length})
                 {notificationData?.length > 0 && <button className=' flex justify-center items-center w-[100px] h-[30px] rounded-full border-2 border-red-400 cursor-pointer text-red-400 mr-2' onClick={()=>handleDeleteAllNotification()}>Clear All</button>}
                 
            </div>

            <div className='w-[90%] max-w-[600px] flex flex-col gap-[12px] pb-[40px]  '>
                {notificationData.map((noti, index) => (
                    <div key={index} className='w-full flex flex-col items-start  justify-center bg-white gap-[8px] p-[16px] rounded-xl relative shadow-sm'>
                        <RxCross1 className='h-[20px] w-[20px] text-gray-400 cursor-pointer absolute top-[14px] right-[14px] ' onClick={()=>handleDeleteNotification(noti._id)} />
                        
                        <div className='flex justify-center items-center gap-[10px]'>
                            <div className='w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer flex-shrink-0'>
                                <img src={noti.relatedUser.profileImage || profile} alt="" className='w-full h-full ' />
                            </div>
                            <div className='text-gray-700 font-semibold text-[16px]'>
                                {`${noti?.relatedUser.firstname} ${noti?.relatedUser.lastname}`}
                            </div>
                        </div>

                        <div className='flex items-center gap-[10px] pl-[4px]'>
                            {noti.type === "like" && <div className='text-gray-500 text-[15px]'> liked your post</div>}
                            {noti.type === "comment" && <div className='text-gray-500 text-[15px]'> commented on your post</div>}
                            {noti.type === "connectionAccepted" && <div className='text-gray-500 text-[15px]'> accepted your connection request</div>}
                            {noti.relatedPost && (
                                <img src={noti.relatedPost.image} alt="" className='w-[45px] h-[45px] rounded-lg object-cover border border-gray-200' />
                            )}
                            {noti.relatedPost && (
                                <div className='text-gray-400 text-[14px] truncate max-w-[200px]'>{noti.relatedPost.description}</div>
                            )}
                        </div>
                        <div className='absolute right-[10px] top-3 '>
                   
                </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notification