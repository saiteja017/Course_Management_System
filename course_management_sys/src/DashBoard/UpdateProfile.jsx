import React, { useState } from 'react';
import { instanceAxios } from '../ContextAPI/instanceAxios';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('userData')));
  let navigator = useNavigate()

  let [passIcon, setPassIcon] = useState(false)
  let [passVerify, setPassVerify] = useState({
          message: "kk",
          flag: false
      })

  let verifyPassword = (password) => {
        const hasUpperCase = /[A-Z]/;
        const hasLowerCase = /[a-z]/;
        const hasDigit = /\d/;
        const hasSpecialChar = /[@$!%*?#&]/;

        let message = ""
        if (password === "") {
            message = "this field is required"
        } else if (!hasLowerCase.test(password)) {
            message = "at least one lowercase letter"
        } else if (!hasUpperCase.test(password)) {
            message = "at least one uppercase letter"
        } else if (!hasDigit.test(password)) {
            message = "at least one digit"
        } else if (!hasSpecialChar.test(password)) {
            message = "at least one special character"
        }
        else {
            return {
                message: "",
                flag: false
            }
        }

        return {
            message,
            flag: true
        }
    }

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setPassVerify(verifyPassword(formData.password))
    if(passVerify.message == ""){
      console.log(formData)
      let response = await instanceAxios.put(formData.aid ? 'updateadmin': 'updatestudent', formData)
      console.log(response)
      if(response.status == 200){
        localStorage.setItem('userData', JSON.stringify(response.data.data))
        navigator('/profile')
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-3">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-lg shadow-lg p-5 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Update Your Details
        </h2>

        <div className="space-y-2">
          <div>
            <label className="block text-sm text-gray-600 mb-1">First Name</label>
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter First Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter Last Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-2 bg-gray-100 text-gray-500 rounded-md border border-gray-300 cursor-not-allowed"
              placeholder="Email"
            />
          </div>

          <div className='relative'>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type={passIcon?'text': 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter New Password"
              required
            />
            {passVerify.flag && <p className=' absolute bottom-[-12px] pl-1 bg-transparent text-red-400 text-[12px]'><i class="fa-solid fa-triangle-exclamation"></i> {passVerify.message}</p>}
            <i onMouseEnter={() => setPassIcon(true)} onMouseLeave={() => setPassIcon(false)} className={`fa-solid ${!passIcon ? "fa-eye-slash" : "fa-eye"} text-sm right-2 top-10 absolute bg-white`}></i>

          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              maxLength={10}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter Mobile Number"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter Address"
            />
          </div>
          
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-2  cursor-pointer transition-all duration-300 text-white bg-gradient-to-l from-[#71b7e6] to-[#595bb6] hover:to-[#71b7e6] hover:from-[#595bb6] rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
