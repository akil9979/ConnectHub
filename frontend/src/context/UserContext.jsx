import React, { createContext, useContext, useEffect, useState } from 'react'
import { authdatacontext } from './Authcontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
 export const userDatacontext=React.createContext()

function UserContext({children}) {
    const [userdata,setuserdata]=useState(null)
    const [edit,setedit]=useState(false)
    const {serverURL}=useContext(authdatacontext)
    const [postdata,setpostdata]=useState([])
    const [profiledata,setprofiledata]=useState([])
    const navigate=useNavigate()


    const getcurrentuser= async () => {
       try {
         const result = await axios.get(serverURL+"/api/v1/user/currentuser",{withCredentials:true})
         setuserdata(result.data.currentuser)
         return result.data.currentuser
       } catch (error) {
        if (error.response?.status === 401) {
          console.log("Auth not ready yet");
        } else {
          console.error(error);
        }
      }
    }
    const getPost=async () => {
      try {
        const result =await axios.get(serverURL+"/api/v1/post/getPost",{withCredentials:true})
       
        setpostdata(result.data.post)
      } catch (error) {
        console.log(error);
        
      }
    }
    useEffect(() => {
      
           getcurrentuser()
    }, []);

    useEffect(()=>{
        if (userdata) {
          getPost()
        }
    },[userdata])

    const handleGetProfile=async(username)=>{
      try {
        const result = await axios.get(serverURL+`/api/v1/user/getprofile/${username}`,{withCredentials:true})
        setprofiledata(result.data.user)
       
        navigate("/profile")
      } catch (error) {
        console.log(error);
        
      }
    }
    
    const value = {
      userdata,
      setuserdata,
      edit,
      setedit,
      postdata,setpostdata,getPost,profiledata,setprofiledata,handleGetProfile
    };
    return (
      <userDatacontext.Provider value={value}>
        {children}
      </userDatacontext.Provider>
    );
    
}

export default UserContext
