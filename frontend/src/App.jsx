import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/signUp'
import Login from './pages/login'
import Home from './pages/Home'

function App() {
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<SignUp/>}/>
   </Routes>  
  )
}

export default App
