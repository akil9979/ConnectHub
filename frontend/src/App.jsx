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
import LoadingScreen from './component/LoadingScreen'
import About from './pages/About'
import Accessibility from './pages/Accessibility'
import Help from './pages/Help'
import Privacy from './pages/Privacy'

function App() {
  const { userdata, authLoading } = useContext(userDatacontext)

  // While authentication is being determined/hydrated from cookies, show loading screen
  // Do NOT render the landing or login page during this period to prevent UI flashing
  if (authLoading) {
    return <LoadingScreen />
  }

  return (
    <Routes>
      {/* Root Route: Shows Home if authenticated, Landing if guest */}
      <Route path='/' element={userdata ? <Home /> : <Landing />} />

      {/* Guest-only routes: Redirect to home if already authenticated */}
      <Route path='/login' element={userdata ? <Navigate to="/" replace /> : <Login />} />
      <Route path='/signUp' element={userdata ? <Navigate to="/" replace /> : <SignUp />} />
      <Route path='/signup' element={userdata ? <Navigate to="/" replace /> : <SignUp />} />

      {/* Informational Routes: Accessible to everyone */}
      <Route path='/about' element={<About />} />
      <Route path='/accessibility' element={<Accessibility />} />
      <Route path='/help' element={<Help />} />
      <Route path='/privacy' element={<Privacy />} />

      {/* Protected Routes: Require authenticated session */}
      <Route path='/Network' element={userdata ? <Network /> : <Navigate to="/login" replace />} />
      <Route path='/network' element={userdata ? <Network /> : <Navigate to="/login" replace />} />
      <Route path='/explore' element={userdata ? <Explore /> : <Navigate to="/login" replace />} />
      <Route path='/profile' element={userdata ? <Profile /> : <Navigate to="/login" replace />} />
      <Route path='/Notification' element={userdata ? <Notification /> : <Navigate to="/login" replace />} />
      <Route path='/notification' element={userdata ? <Notification /> : <Navigate to="/login" replace />} />

      {/* Fallback for unmatched routes */}
      <Route path='*' element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
