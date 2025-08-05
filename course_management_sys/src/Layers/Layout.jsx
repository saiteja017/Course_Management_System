import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import NavBar from '../Components/Navbar'
import Login from '../Authentication/Login'
import Registration from '../Authentication/Registration'
import Profile from '../DashBoard/Profile'
import DeleteAcc from '../DashBoard/DeleteAcc'
import { Outlet } from 'react-router-dom'; //Without <Outlet /> in Profile, the nested components (Update, Delete) won't render even if routing is configured correctly.
import UpdateProfile from '../DashBoard/UpdateProfile'
import Employees from '../DashBoard/Employees'
import Chat from '../Features/Chat'
import GetAdmin from '../DashBoard/GetAdmin'
import Home from '../Components/Home'
import Courses from '../DashBoard/Courses'
import MyCourses from '../DashBoard/MyCourses'

const Layout = () => {
    let location = useLocation()
//   let hideNavbar = location.pathname === '/profile';
  let hideNavbar = location.pathname.startsWith('/profile') || location.pathname.startsWith('/chat'); {/* for both update and delete */}
 
  return (
    <>
     {!hideNavbar &&  <NavBar/>}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/mycourses' element={<MyCourses />} />
          <Route path='/profile/*' element={<Profile />} >
             <Route path="update" element={<UpdateProfile/>} />
             <Route path="delete" element={<DeleteAcc/>} />
             <Route path="students" element={<Employees/>} />
             <Route path="admindetails" element={<GetAdmin/>} />
          </Route>
        </Routes>
    </>
  )
}

export default Layout
