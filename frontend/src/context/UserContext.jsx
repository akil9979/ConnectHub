import React, { createContext, useContext, useEffect, useState } from 'react'
import { authdatacontext } from './Authcontext'
import axios from 'axios'
 export const userDatacontext=React.createContext()

function UserContext({children}) {
    const [userdata,setuserdata]=useState(null)
    const [edit,setedit]=useState(false)
    const {serverURL}=useContext(authdatacontext)
    const [postdata,setpostdata]=useState([])

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
        console.log(result);
        setpostdata(result.data.post)
      } catch (error) {
        console.log(error);
        
      }
    }
    useEffect(() => {
      
           getcurrentuser()
           getPost()
        
    }, []);
    const value = {
      userdata,
      setuserdata,
      edit,
      setedit,
      postdata,setpostdata
    };
    return (
      <userDatacontext.Provider value={value}>
        {children}
      </userDatacontext.Provider>
    );
    
}

export default UserContext
