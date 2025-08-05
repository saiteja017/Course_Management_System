import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

let style = `text-white 
            relative text-[15px] font-semibold text-gray-800 
              before:content-[""] before:absolute before:left-0 before:bottom-0 
              before:w-0 before:h-[3px] before:bg-gradient-to-r 
              before:from-blue-400 before:to-purple-500 
              before:transition-all before:duration-300 
              hover:before:w-full`


const NavBar = () => {
  let location = useLocation()
  let navigator = useNavigate()
  let data = localStorage.getItem('userRole')
  console.log("navbar", data)
  
  return (
    <div className='border p-3 flex  justify-between bg-black' >
      <Link to="/"><img src="https://up.yimg.com/ib/th?id=OIP.rv6rEXU2wV2cz2Ls4s9UkAHaHa&pid=Api&rs=1&c=1&qlt=95&w=115&h=115" className='w-10 rounded-2xl' alt="logo" /></Link>
      <div className='flex py-2  border w-90 justify-evenly  '>
        {
          !location.state ?
            <>
              <Link to="/" className={`${style} `} >Home</Link>
              <Link to="/courses" className={`${style} `} >Courses</Link>
              {
                data === "student" && <Link to="/mycourses" className={`${style} `} >MyCourses</Link>
              }
              {
                data && <Link className={`${style}`} to={'/profile'}
               >Profile</Link>
              }
            {data ?
                 <h1 className='text-white px-3 py-0.5 cursor-pointer rounded-full bg-red-500 hover:bg-red-400' 
                    onClick={()=>{ localStorage.removeItem('userRole'); localStorage.removeItem('userData'); navigator('/') }}
                 >Logout</h1>
                :
              <>
              <div className={`${style}   group relative  `} >
                Register
                <ul className='absolute   text-black  pt-4 transition-all gap-1 duration-500  bg-gradient-to-bl hidden group-hover:flex flex-col right-0.5 '>
                  <Link to="/register" state={"student"} className='text-[15px] px-4 py-1 transition-all duration-300 hover:bg-[#383E56] rounded-2xl hover:text-white border border-blue-500'>Student</Link>
                  <Link to="/register" state={"admin"} className='text-[15px] px-4 py-1 transition-all duration-300 hover:bg-[#383E56] rounded-2xl hover:text-white border border-blue-500'>Admin</Link>
                </ul>
              </div>
              <div className={`${style}   group relative  `} >
                Login
                <ul className='absolute   text-black  pt-4 transition-all gap-1 duration-500  bg-gradient-to-bl hidden group-hover:flex flex-col right-0.5'>
                  <Link to="/login" state={"student"} className='text-[15px] px-4 py-1 transition-all duration-300 hover:bg-[#383E56] rounded-2xl hover:text-white border border-blue-500'>Student</Link>
                  <Link to="/login" state={"Admin"} className='text-[15px] px-4 py-1 transition-all duration-300 hover:bg-[#383E56] rounded-2xl hover:text-white border border-blue-500'>Admin</Link>
                </ul>
              </div>
              </>
        
            }
            </>
            : <h1 className='text-white  md:text-sm text-sm '>{`Complete ${location.pathname=='/register'? "Registration": "Login"} as ${location.state}`}</h1>
        }
      </div>



    </div>
  )
}

export default NavBar
