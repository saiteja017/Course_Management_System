import React, { useEffect, useState } from 'react'
import { instanceAxios } from '../ContextAPI/instanceAxios';

const MyCourses = () => {
    const [courses, setCourses] = useState([]);


    let userData = JSON.parse(localStorage.getItem('userData'))
    console.log(userData)
    const headerBgColors = [
        'bg-red-400',
        'bg-blue-400',
        'bg-green-400'
    ];

    useEffect(() => {
        fetch(`http://localhost:8080/fetchcourses/${userData.id}`)
            .then((res) => res.json())
            .then((data) => setCourses(data.data))
            .catch((err) => console.error("Error fetching courses:", err));
    }, [courses]);


    let deleteCourseToStudent=async(cid)=>{
        console.log(cid)
         let res = await instanceAxios.delete(`deletcourse/${userData.id}/${cid}`)
         console.log(res)
         if(res.status === 200)
            setCourses([])
    }

    return (
        <div className='flex items-center justify-center flex-wrap gap-4 p-5'>

            {courses.length == 0 && <h2>No Courses Added to PlayList</h2>}
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
                            <button
                                onClick={() => deleteCourseToStudent(course.cid)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyCourses
