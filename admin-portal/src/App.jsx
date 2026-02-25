import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import Footer from './components/Footer'
import { Routes, useLocation } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Login from './pages/Login'
import SuperAdminDashboard from './pages/SuperAdminDashboard'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import CreateAdmin from './pages/CreateAdmin'
import CreateUser from './pages/CreateUser'
import CreateNotifications from './pages/CreateNotifications'
import Faculty from './pages/Faculty'
import HelpRequests from './pages/HelpRequests'
import { authContext } from './context/AuthContext'

const App = () => {
  const location=useLocation()
  const {user}=useContext(authContext)
  console.log(user)
  
  return (
    <div className='bg-red-400'>
      {location.pathname !== "/login" && <Navbar/>}
      {location.pathname !== "/login" && <SideBar/>}
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/super-admin-dashboard' element={<SuperAdminDashboard/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/user-dashboard' element={<UserDashboard/>}/>
        <Route path='/create-admin' element={<CreateAdmin/>}/>
        <Route path='/create-user' element={<CreateUser/>}/>
        <Route path='/create-notifications' element={<CreateNotifications/>}/>
        <Route path='/faculty' element={<Faculty/>}/>
        <Route path='/help-requests' element={<HelpRequests/>}/>
      </Routes>
      {location.pathname !== "/login" && <Footer/>}
    </div>
  )
}

export default App