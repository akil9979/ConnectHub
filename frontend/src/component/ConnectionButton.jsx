import React from 'react'
import { authdatacontext } from '../context/AuthContext'
import axios from 'axios'
import socket from '../socket'
import { userDatacontext } from '../context/UserContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ConnectionButton({userId}) {
    const {serverURL}=React.useContext(authdatacontext)
    const {userdata}=React.useContext(userDatacontext)
    const [Status,setStatus]=React.useState("")
    const navigate=useNavigate()
    const handleSendRequest=async()=>{
        try {
            const result = await axios.post(serverURL+`/api/v1/connection/send/${userId}`,{},{ withCredentials: true });
            console.log(result);
            
        } catch (error) {
            console.log("error in sending request:", error.response?.data?.message);
        }
    }

    const handleRemoveConnection=async()=>{
        try {
          const result=  await axios.delete(`${serverURL}/api/v1/connection/remove/${userId}`, { withCredentials: true });
            console.log(result);
            
        } catch (error) {
            console.log("error in sending request:",error);
        }
    }

    const handleGetStatus=async()=>{
        try {
            const result = await axios.get(serverURL+`/api/v1/connection/getStatus/${userId}`,{ withCredentials: true });
            // console.log(result);
            setStatus(result.data.status)
        } catch (error) {
            console.log("error in sending request:",error);
        }
    }   

    useEffect(()=>{
        socket.emit("register",userdata._id)
        handleGetStatus()
        socket.on("statusUpdate",(data)=>{
            if(data.updatedUserId===userId){
                setStatus(data.newStatus)
            }
        })

        return()=>{
            socket.off("statusUpdate")
        }

    },[userId])

    const handleClick=async () => {
        if (Status==="disconnect") {
            await handleRemoveConnection()
        }else if (Status==="connect") {
            await handleSendRequest()
        }
        else if (Status==="received") {
            navigate("/Network")
        }
    }

    return (
    
      <button className='min-w-[120px] h-9 px-4 rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 cursor-pointer flex justify-center items-center gap-2 text-[14px] font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed capitalize' disabled={Status=="pending"} onClick={()=>handleClick()} >{Status}  </button>

    
  )
}

export default ConnectionButton
