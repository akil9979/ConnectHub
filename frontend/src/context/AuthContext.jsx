import React from 'react'
export const authdatacontext=React.createContext()
function Authcontext({children}) {
  const value={
 serverURL : "http://localhost:5000"
} 
  return (
    
   
      <authdatacontext.Provider value={value}>
      {children}
      </authdatacontext.Provider>
    
  )
}

export default Authcontext
