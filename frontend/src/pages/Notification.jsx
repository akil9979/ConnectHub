import React, { useEffect } from 'react'
import Nav from "../component/Nav"
import { authdatacontext } from '../context/AuthContext.jsx'
import axios from 'axios'
import profile from '../assets/profile.webp'
import { RxCross1 } from "react-icons/rx";
import { IoIosNotificationsOff } from "react-icons/io";

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
        <div className='w-screen min-h-[100vh] bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 pt-24 flex flex-col items-center px-4'>
            <Nav />

            
            <div className='w-full max-w-[600px] min-h-[70px] bg-white/70 backdrop-blur-md shadow-md border border-white/40 rounded-2xl flex items-center justify-between mb-6 px-6 py-4 text-lg font-bold text-gray-900'>
                 Notifications ({notificationData?.length})
                 {notificationData?.length > 0 && <button className='flex justify-center items-center min-w-[100px] h-9 px-3 rounded-xl border border-red-200 cursor-pointer text-red-500 shadow-sm hover:bg-red-50 hover:shadow-md text-sm font-medium transition-all duration-200' onClick={()=>handleDeleteAllNotification()}>Clear All</button>}
                 
            </div>

            <div className='w-full max-w-[600px] flex flex-col gap-4 pb-10'>
                {notificationData.length > 0 ? (
                    notificationData.map((noti, index) => (
                        <div key={index} className='w-full flex flex-col items-start justify-center bg-white/70 backdrop-blur-sm hover:bg-white/90 gap-2 p-4 rounded-2xl relative shadow-sm hover:shadow-md border border-white/40 transition-all duration-200'>
                            <RxCross1 className='h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer absolute top-4 right-4 transition-colors duration-200' onClick={()=>handleDeleteNotification(noti._id)} />
                            
                            <div className='flex justify-center items-center gap-3'>
                                <div className='w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer flex-shrink-0 ring-2 ring-gray-100'>
                                    <img src={noti.relatedUser?.profileImage || profile} alt="" className='w-full h-full object-cover' />
                                </div>
                                <div className='text-gray-900 font-semibold text-base'>
                                    {`${noti?.relatedUser?.firstname} ${noti?.relatedUser?.lastname}`}
                                </div>
                            </div>

                            <div className='flex items-center gap-3 pl-1'>
                                {noti.type === "like" && <div className='text-gray-500 text-sm'> liked your post</div>}
                                {noti.type === "comment" && <div className='text-gray-500 text-sm'> commented on your post</div>}
                                {noti.type === "connectionAccepted" && <div className='text-gray-500 text-sm'> accepted your connection request</div>}
                                {noti.relatedPost && (
                                    <img src={noti.relatedPost.image} alt="" className='w-[45px] h-[45px] rounded-xl object-cover border border-gray-200' />
                                )}
                                {noti.relatedPost && (
                                    <div className='text-gray-400 text-sm truncate max-w-[200px]'>{noti.relatedPost.description}</div>
                                )}
                            </div>
                            <div className='absolute right-[10px] top-3 '>
                       
                    </div>
                        </div>
                    ))
                ) : (
                    <div className='w-full bg-white/70 backdrop-blur-md shadow-md border border-white/40 rounded-2xl flex flex-col items-center justify-center p-10 text-center gap-4 hover:bg-white/80 transition-all duration-300 animate-in fade-in zoom-in-95 duration-200'>
                        <div className='w-16 h-16 rounded-full bg-brand-light flex items-center justify-center text-brand shadow-sm border border-brand-light/50'>
                            <IoIosNotificationsOff className='w-8 h-8' />
                        </div>
                        <div>
                            <h3 className='text-lg font-bold text-gray-900 mb-1'>No notifications</h3>
                            <p className='text-sm text-gray-500 max-w-sm'>
                                You're all caught up! When you get notifications, they will appear here.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notification
