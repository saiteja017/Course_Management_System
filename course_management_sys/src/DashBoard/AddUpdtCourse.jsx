import React, { useState } from 'react'
import { instanceAxios } from '../ContextAPI/instanceAxios';

const AddUpdtCourse = ({addUpdtCourse, setAddUdtCourse}) => { 
    let [course, setCourse] = useState(addUpdtCourse.course? addUpdtCourse.course: {name:"", cost:"", duration:''})
    let adminUser = JSON.parse(localStorage.getItem('userData'))
    // console.log(typeof adminUser.aid, adminUser)
    
    // console.log(course)
    // console.log(addUpdtCourse)

     const updateCourse = async() => {
        let res = await instanceAxios.put(`updatecourse/${adminUser.aid}`,course)
        
        console.log(res)
        if(res.status == 200){
            setAddUdtCourse({message:"", flag:false})
        }
    };
    
    const addCourseToAdmin= async()=>{
        let res = await instanceAxios.post(`createcourse/${adminUser.aid}`,course)
        if(res.status == 200){
            setAddUdtCourse({message:"", flag:false})
        }

    }

    const hadleSubmit =(e)=>{
        console.log(e.target.innerText)
        if(e.target.innerText === "Update")
            updateCourse()
        else
            addCourseToAdmin()
    }
  return (
    <div>
      <div
      id="add-one-course"
      className="absolute top-1/6 left-2/6 w-2/6  bg-white/30 backdrop-blur-sm z-20  flex-col items-center justify-center"
    >
      <form className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col items-center gap-6 relative">
        <div className="w-[90%] flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-lg text-gray-700">Course Name</label>
            <input
              type="text"
              name="name"
              required
              value={course.name}
              onChange={(e)=> setCourse({...course, [e.target.name]: e.target.value})}
              placeholder="Enter Course Name"
              className="h-10 px-3 border border-gray-300 rounded-md border-b-4 text-[17px] focus:outline-none focus:border-purple-500 valid:border-purple-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg text-gray-700">Cost</label>
            <input
              type="number"
              name="cost"
              value={course.cost}
              onChange={(e)=> setCourse({...course, [e.target.name]: e.target.value})}
              required
              placeholder="Enter Cost"
              className="h-10 px-3 border border-gray-300 rounded-md border-b-4 text-[17px] focus:outline-none focus:border-purple-500 valid:border-purple-500"
              />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg text-gray-700">Duration</label>
            <input
              type="text"
              name="duration"
              required
              value={course.duration}
              onChange={(e)=> setCourse({...course, [e.target.name]: e.target.value})}
              placeholder="Enter Duration"
              className="h-10 px-3 border border-gray-300 rounded-md border-b-4 text-[17px] focus:outline-none focus:border-purple-500 valid:border-purple-500"
            />
          </div>
        </div>

        <div>
          <span
            id="addto"
            className="cursor-pointer text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            onClick={hadleSubmit}
          >
            {addUpdtCourse.message}
          </span>
        </div>

        <i
          className="bx bx-x absolute top-2 right-2 text-xl bg-white hover:bg-blue-900 hover:text-white cursor-pointer rounded-full p-1"
          id="no-course"
          onClick={()=> setAddUdtCourse({message:'', flag: false})}
        ></i>
      </form>
    </div>
    </div>
  )
}

export default AddUpdtCourse
