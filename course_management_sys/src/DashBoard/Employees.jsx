import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { IoMdChatboxes } from "react-icons/io";
import { Link } from 'react-router-dom';
import { instanceAxios } from '../ContextAPI/instanceAxios';


const Employees = () => {

    let [allStudents, setAllStudents] = useState([])

    let fetchAll = async ()=>{
        let response = await instanceAxios.get('/allstudents')
        console.log(response)
        setAllStudents(response.data)

    }
    useEffect(()=>{
        fetchAll()
    },[])
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <h2 className="text-2xl font-semibold mb-6 fixed z-10 p-4 w-[77%] bg-cyan-100 text-gray-700">Student Details</h2>

      <div className="space-y-4 mt-18">
        {allStudents.map((employee) => (
          <div
            key={employee.id}
            className="relative bg-white shadow-md hover:shadow-xl rounded-lg p-4 flex items-center justify-between transition-all duration-300 group hover:bg-gray-50"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {employee.fname +" " + employee.lname}
              </h3>
              <p className="text-sm text-gray-600">{employee.email} | +91  {employee.mobileNumber || 'Nill'} | {employee.address || 'Nill'}</p>
            </div>

            <div className="flex  absolute right-14  space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link to={'/chat'} state={employee} className="text-blue-500 cursor-pointer hover:text-blue-700">
                <IoMdChatboxes />
              </Link>
              
              <button className="text-red-500 cursor-pointer hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;

