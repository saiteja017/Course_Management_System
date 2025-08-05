import React, { useEffect } from 'react'
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { instanceAxios } from '../ContextAPI/instanceAxios'

const Profile = () => {
  let hideProfile = useLocation().pathname === '/profile'
  let localUserData = JSON.parse(localStorage.getItem('userData'))
  let userRole = localStorage.getItem('userRole')
  

  let fetchImage= async()=>{
    console.log(localUserData.id)
      let response = await fetch(`http://localhost:8080/fetchimg/${localUserData.id}`)
      .then(res => res.blob())
    let imageUrl = URL.createObjectURL(response)
    document.getElementById('setImg').src = imageUrl
  }
  useEffect(()=>{
    fetchImage()
  },[]);
  
  let uploadImage = async ()=>{
    let input = document.getElementById('uploadImage')
    let formData = new FormData()
    formData.append('file', input.files[0])
    let response = await instanceAxios.put(`/uploadimage/${localUserData.id}`, formData)
    if(response.status != 202){
      alert("Please Try again")
    }else{
      fetchImage()
    }
    document.getElementById('img').innerText = 'Select Image'
  }
  return (
    <>
      <div className='flex h-screen '>
        <div className='bg-slate-300 pl-2 pr-2 shadow-2xl'>
          <Link to="/"><img src="https://up.yimg.com/ib/th?id=OIP.rv6rEXU2wV2cz2Ls4s9UkAHaHa&pid=Api&rs=1&c=1&qlt=95&w=115&h=115" className='w-14 rounded-full mt-3 ml-3' alt="logo" /></Link>
          <div className='w-3xs  mt-6 flex gap-2 flex-col items-center'>
            <Link to={'/profile'} className='pt-1 pb-1 pr-7 pl-7 w-full border border-slate-400 hover:text-white transition-all ease-in-out duration-300 hover:bg-slate-400 rounded-full  '  >Profile Details</Link>
            {userRole ==='student' ? 
            <Link to={'/profile/admindetails'} className='pt-1 pb-1 pr-7 pl-7 w-full border border-slate-400 hover:text-white transition-all ease-in-out duration-300 hover:bg-slate-400 rounded-full '  >Chat With Admin</Link>
            : 
            <Link to={'/profile/students'} className='pt-1 pb-1 pr-7 pl-7 w-full border border-slate-400 hover:text-white transition-all ease-in-out duration-300 hover:bg-slate-400 rounded-full '  >Student Details</Link>}  {/*  absolute path -- if not given multiple times added update when we click mutiple times */}
            <Link to={'/profile/update'} className='pt-1 pb-1 pr-7 pl-7 w-full border border-slate-400 hover:text-white transition-all ease-in-out duration-300 hover:bg-slate-400 rounded-full '  >Update Profile</Link>  
            <Link to={'/profile/delete'} className='pt-1 pb-1 pr-7 w-full pl-7 border border-slate-400 hover:text-white transition-all ease-in-out duration-300 hover:bg-red-400 rounded-full '  >Delete Account</Link>
          </div>
        </div>
        
        <div id='scr' className="bg-gray-100 overflow-scroll  w-full">

          { hideProfile && 
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-4xl p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">

                <div className="relative">
                  <img 
                    id='setImg'
                    src={"https://tse4.mm.bing.net/th?id=OIP.4YJoKm_Gv95Iivwhou6GQwHaFj&pid=Api&P=0&h=180"}
                    alt="Profile"
                    className="w-40 h-40 rounded-full shadow-md"
                  />

                  <div>
                    <label htmlFor="uploadImage" id='img'  className='bg-blue-400 text-white px-2 py-1 rounded-2xl'>Select Image</label>
                    <input type="file" id='uploadImage'
                      onChange={(event)=>{
                        let img = (event.target.value +"").split('\\')
                        console.log(img[img.length-1])
                        if(img.length > 0){
                          document.getElementById('img').innerText= img[img.length-1].length>12 ? img[img.length-1].slice(0,12)+"...": img[img.length-1]
                        }
                      }}
                      className='hidden'   /> <button onClick={uploadImage} className='rounded bg-cyan-400 py-1 px-2 hover:bg-cyan-300'>Upload</button>
                  </div>
                </div>


                <div className="flex-1">
                  <h1 className="text-3xl font-semibold text-gray-800 capitalize">
                    {localUserData.fname} {localUserData.lname}
                  </h1>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-lg font-medium text-gray-700">{localUserData.email}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Mobile Number</p>
                      <p className="text-lg font-medium text-gray-700">{localUserData.mobileNumber}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-lg font-medium text-gray-700">{localUserData.address}</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          }

          <Outlet />
        </div>
      </div>

      {/* <h1>hello from profile</h1> */}

    </>
  );
}

export default Profile


/**





 */