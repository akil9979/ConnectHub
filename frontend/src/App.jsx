import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Explore from './pages/Explore'
import { userDatacontext } from './context/UserContext'
import Network from './pages/Network'
import Profile from './pages/Profile'
import Notification from './pages/Notification'

function App() {
  const { userdata,setuserdata } = useContext(userDatacontext);


  return (
   <Routes>
    <Route path='/' element={userdata?<Home/>:<Landing/>}/>
    <Route path='/login' element={userdata?<Navigate to="/"/>:<Login/>}/>
    <Route path='/signUp' element={userdata?<Navigate to="/"/>:<SignUp/>}/>
    <Route path='/Network' element={userdata?<Network/>:<Navigate to="/login"/>}/>
    <Route path='/explore' element={userdata?<Explore/>:<Navigate to="/login"/>}/>
    <Route path='/profile' element={userdata?<Profile/>:<Navigate to="/login"/>}/>
    <Route path='/Notification' element={userdata?<Notification/>:<Navigate to="/login"/>}/>
   </Routes>  
   
  )
}

export default App
