import React, { useEffect, useState } from 'react';
import AddUpdtCourse from './AddUpdtCourse';
import { instanceAxios } from '../ContextAPI/instanceAxios';

const Courses = ({ role }) => {
  const [courses, setCourses] = useState([]);
  const [addUpdtCourse, setAddUdtCourse] = useState({
    message:"",
    flag: false
  })

  let userRole = localStorage.getItem('userRole')
  console.log(userRole)
  const headerBgColors = [
    'bg-red-400',
    'bg-blue-400',
    'bg-green-400'
  ];

  useEffect(() => {
    fetch('http://localhost:8080/getallcourses')
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, [addUpdtCourse]);

  const deleteCourse = async (cid) => {
    console.log("Delete course:", cid);
    let res = await instanceAxios.delete(`deletecourse/${JSON.parse(localStorage.getItem('userData')).aid}/${cid}`)
    console.log(res)
    if(res.status === 200)
      location.reload()
  };
  
  
  
  const addCourseToStudent = async (cid) => {
    console.log("Add course to student:", cid);
    let studentCoursesRes = await instanceAxios.get(`fetchcourses/${JSON.parse(localStorage.getItem('userData')).id}`)
    let studentCourses = studentCoursesRes.data.data.map((item)=>item.cid)
    console.log(studentCourses)

    if(!studentCourses.includes(cid))
      await instanceAxios.put(`addcourse/${JSON.parse(localStorage.getItem('userData')).id}/${cid}`)
    else
      alert("Course Already Added")
    
  };

  return (
    <>
     {
      userRole==="admin" && !addUpdtCourse.flag && 
       <button className="ml-6 mt-6 px-5 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 shadow-md"
        onClick={()=> setAddUdtCourse({message:'Add Course', flag:true})}
       >
        Add Course
      </button>
     }
    <div className="flex flex-wrap gap-6 justify-center p-6">


      {
        addUpdtCourse.flag && <AddUpdtCourse addUpdtCourse= {addUpdtCourse} setAddUdtCourse = {setAddUdtCourse} />
      }

      {courses.map((course, index) => (
        <div
          key={course.cid}
          className="w-[250px] shadow-lg border border-gray-300 rounded-md overflow-hidden bg-white"
        >
          <div className={`p-4 text-white text-center ${headerBgColors[index % headerBgColors.length]}`}>
            <i className="bx bx-news text-4xl"></i>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-1">{course.name}</h2>
            <p className="text-sm text-gray-600">Duration: {course.duration} months</p>
            <h3 className="text-md font-bold text-gray-700">Rs: {course.cost}</h3>

            <div className="mt-4 flex gap-2 flex-wrap">
              {userRole==='admin' ? (
                <>
                  <button
                    onClick={() => deleteCourse(course.cid)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>  setAddUdtCourse({ message: 'Update', flag:true, course})}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                </>
              ) : (
                userRole && <button
                  onClick={() => addCourseToStudent(course.cid)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Courses;
