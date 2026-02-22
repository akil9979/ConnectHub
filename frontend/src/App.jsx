import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import { userDatacontext } from './context/UserContext'
function App() {
  const { userdata,setuserdata } = useContext(userDatacontext);


  return (
   <Routes>
    <Route path='/' element={userdata?<Home/>:<Navigate to="/login"/>}/>
    <Route path='/login' element={userdata?<Navigate to="/"/>:<Login/>}/>
    <Route path='/signUp' element={userdata?<Navigate to="/"/>:<SignUp/>}/>
   </Routes>  
   
  )
}

export default App
