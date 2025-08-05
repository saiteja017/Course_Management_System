
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { instanceAxios } from "../ContextAPI/instanceAxios";
const Login = () => {
  const [userData, setUserData] = useState({
    email:"",
    password:""
  });

  let [passIcon, setPassIcon] = useState(false)
  
  let navigator = useNavigate()
  let location = useLocation()
  console.log(location)

  
  const handleLogin =async (e) => {
    e.preventDefault();
    console.log(userData);
    if(userData.email && userData.password){
      let response = await instanceAxios.post(location.state === 'Admin'? '/loginadmin': 'login', userData)
      console.log(response)
      if(response.status == 200){
        localStorage.setItem('userData', JSON.stringify(response.data.data))
        localStorage.setItem('userRole', response.data.data.id ? 'student': 'admin')
        navigator('/')
      }
    }else{
      alert('enter required fields')
    }
  };

  return (
    <div className="flex h-[89vh] items-center justify-center h-[89
    vh] bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg bg-white rounded-lg overflow-hidden">

        <div className="w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="Login visual"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-700">
            Welcome to <span className="font-bold text-black">StudentHub</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Please log in to manage student records, courses, and performance insights.
          </p>

          <form className="mt-6" onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-600">Email</label>
              <input
                type="text"
                placeholder="Enter email"
                value={userData.email}
                name="email"
                onChange={(e) => setUserData({...userData, [e.target.name]:e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
                required
              />
            </div>

            <div className="mb-6 relative ">
              <label className="block mb-1 text-sm text-gray-600">Password</label>
              <input
                type={passIcon ? 'text': 'password'}
                placeholder="Enter password"
                value={userData.password}
                onChange={(e) =>{setUserData({...userData, [e.target.name]:e.target.value})} }
                name="password"
                className="w-full px-4 py-2  border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
                required
              />
              
               <i onMouseEnter={() => setPassIcon(true)} onMouseLeave={() => setPassIcon(false)} className={`fa-solid ${!passIcon ? "fa-eye-slash" : "fa-eye"} text-sm right-2 top-10 absolute bg-white`}></i>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-500 text-white py-2 rounded-full hover:bg-violet-600 transition duration-200"
            >
              Log in
            </button>
          </form>

          <div className="mt-4 text-right">
            <Link to={'/register'} state={location.state} className="text-sm text-gray-500 hover:underline" >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

