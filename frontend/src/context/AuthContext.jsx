import React from 'react'
export const authdatacontext=React.createContext()
function Authcontext({children}) {
  const value={
 serverURL : "https://connecthub-backend-wweb.onrender.com"
} 
  return (
    
   
      <authdatacontext.Provider value={value}>
      {children}
      </authdatacontext.Provider>
    
  )
}

export default Authcontext
