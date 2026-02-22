import React, { createContext, useContext, useEffect, useState } from 'react'
import { authdatacontext } from './Authcontext'
import axios from 'axios'
 export const userDatacontext=React.createContext()

function UserContext({children}) {
    const [userdata,setuserdata]=useState(null)
    const [edit,setedit]=useState(false)
    const {serverURL}=useContext(authdatacontext)

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
    
    useEffect(() => {
      const fetchUser = async () => {
        if (!userdata) {
          try {
            await getcurrentuser()
          } catch (error) {
            console.log("Could not fetch current user on mount");
          }
        }
      }
      fetchUser()
    }, []);
    const value = {
      userdata,
      setuserdata,
      edit,
      setedit,
    };
    return (
      <userDatacontext.Provider value={value}>
        {children}
      </userDatacontext.Provider>
    );
    
}

export default UserContext
