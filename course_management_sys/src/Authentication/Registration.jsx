import React, { useState } from 'react'
import regis_ban from '../assets/register_ban.png'
import regis_bg from '../assets/register_bg.png'
import { instanceAxios } from '../ContextAPI/instanceAxios'
import { useLocation, useNavigate } from 'react-router-dom'
const Registration = () => {
    let navigator = useNavigate()
    let location = useLocation()
    console.log(location)
    let [userData, setUserData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        email: "",
        address: "",
        mobileNumber: ""
    })

    let [passIcon, setPassIcon] = useState(false)
    let [passVerify, setPassVerify] = useState({
        message: "",
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

    let handleSubmit = async event => {
        event.preventDefault()
        setPassVerify(verifyPassword(userData.password))
        console.log(passVerify)
        if (userData.fname && userData.lname && userData.email && passVerify.message == "") {
           
                let response = await instanceAxios.post(location.state === 'student'? '/savestudent':'/saveadmin', userData)
                console.log('inner fetch')
                if (response.status == 201) {
                    navigator('/login', {state: location.state})
                    // console.log("data success")
                }
            
        }else{
            alert("enter required fields")
        }

    }
    return (
        <div className='pt-3 h-screen pb-3'
            style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.6) 70%) ,url(${regis_bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >
            <div className=' w-[50%] border p-1  rounded-xl m-auto'
                style={{
                    background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.9)'
                }}
            >
                <div
                    className=" h-[230px] pb-14 pl-5  bg-cover bg-no-repeat bg-center flex flex-col justify-end "
                    style={{ backgroundImage: `url(${regis_ban})` }}
                >
                    <h1 className='text-2xl text-slate-700 relative before:content-[""]  before:bg-gradient-to-r before:from-cyan-400 before:to-pink-600 before:w-24 before:h-0.5 before:bottom-0  before:absolute'>Registration Form</h1>
                    <p className='text-gray-500 text-xs'>Please Fill the Form Below</p>
                </div>
                <form action="">
                    <div className='flex flex-col p-1 pr-5 pl-5 pb-5 justify-between '>
                        <h1 className='text-xl mb-3'>Full Name</h1>
                        <div className=' flex  justify-between'>
                            <div className='flex flex-col  w-[calc(50%-20px)]' >
                                <input type="text" value={userData.fname}
                                    onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                    name='fname'
                                    className=' focus:outline-none  pl-1.5 border-b-2 border-gray-500 focus:border-r-2 focus:border-[#9b59b6] rounded border h-[40px]' />
                                <label htmlFor="" className='after:content-["*"] after:text-red-500'>First Name</label>
                            </div>
                            <div className='flex flex-col w-[calc(50%)]' >
                                <input type="text" value={userData.lname}
                                    onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                    name='lname'
                                    className='  focus:outline-none border-gray-500  pl-1.5 border-b-2 focus:border-r-2 focus:border-[#9b59b6] rounded border h-[40px]' />
                                <label htmlFor="" className='after:content-["*"] after:text-red-500'>Last Name</label>
                            </div>
                        </div>
                        <div className=' flex mt-5  justify-between'>
                            <div className='flex flex-col  w-[calc(50%-20px)]' >
                                <input type="text" value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                    name='email'
                                    className='  focus:outline-none  border-gray-500 pl-1.5 border-b-2 focus:border-r-2 focus:border-[#9b59b6] rounded border h-[40px]' />
                                <label htmlFor="" className='after:content-["*"] after:text-red-500'>Email</label>
                            </div>
                            <div className='relative  flex flex-col w-[calc(50%)]' >
                                <input type={passIcon ? 'text' : 'password'} value={userData.password}
                                    onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                    name='password'
                                    className={`  focus:outline-none ${passVerify.flag ? 'border-red-500' : 'border-gray-500'} pl-1.5 border-b-2 focus:border-r-2 focus:border-[#9b59b6] rounded border  h-[40px]`} />
                                <i onMouseEnter={() => setPassIcon(true)} onMouseLeave={() => setPassIcon(false)} className={`fa-solid ${!passIcon ? "fa-eye-slash" : "fa-eye"} text-sm right-2 top-3.5 absolute bg-white`}></i>
                                <label htmlFor="" className='after:content-["*"] after:text-red-500'>Password</label>
                                {passVerify.flag && <p className=' absolute top-[-15px] pl-1 bg-transparent text-red-400 text-[12px]'><i class="fa-solid fa-triangle-exclamation"></i>{passVerify.message}</p>}
                            </div>
                        </div>
                        <div className=' flex mt-5  justify-between'>
                            <div className='flex flex-col  w-[calc(50%-20px)]' >
                                <input type="text" value={userData.mobileNumber}
                                    onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                    name='mobileNumber'
                                    className='  focus:outline-none  border-gray-500 pl-1.5 border-b-2 focus:border-r-2 focus:border-[#9b59b6] rounded border h-[40px]' />
                                <label htmlFor="">Mobile Number</label>
                            </div>
                            <div className='flex  flex-col w-[calc(50%)]' >
                                <input type="text" value={userData.address}
                                    onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                    name='address'
                                    className='  focus:outline-none border-gray-500 pl-1.5 border-b-2 focus:border-r-2 focus:border-[#9b59b6] rounded border h-[40px]' />
                                <label htmlFor="">Address</label>
                            </div>

                        </div>
                        <div className=' flex mt-5 justify-center'>
                            <div className='flex flex-col w-[50%] outline-none ' >
                                <button onClick={(e) => handleSubmit(e)} className='border  h-[40px] cursor-pointer transition-all duration-75 text-white bg-gradient-to-l from-[#71b7e6] to-[#595bb6] hover:to-[#71b7e6] hover:from-[#9b59b6] rounded '>Register</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration

