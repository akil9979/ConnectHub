import React from 'react'
export const authdatacontext=React.createContext()
function Authcontext({children}) {
const serverURL = "http://localhost:8000"
 
  return (
    
    <div>
      <authdatacontext.Provider value={serverURL}>
      {children}
      </authdatacontext.Provider>
    </div>
  )
}

export default Authcontext
