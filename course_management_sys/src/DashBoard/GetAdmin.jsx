import React, { useState } from 'react';
import { instanceAxios } from '../ContextAPI/instanceAxios';
import { useNavigate } from 'react-router-dom';

const GetAdmin = () => {
  const [email, setEmail] = useState('');
  let navigator = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Submitted Email:', email);
    try {
        let response = await instanceAxios.get('/getadminbyemail/'+email)
    console.log("fetching...")
    if(response.status == 200){
        navigator('/chat', {state: response.data.data})
    }
    } catch (error) {
            alert("Enter Correct Email")
        
    }
    // else{
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md border-t-4 border-indigo-400">
        <h2 className="text-2xl font-bold text-indigo-600 text-center ">Chat With Admin</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="text"
              id="email"
              required
              placeholder="Enter Admin Email to see Chat"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-indigo-500 outline-none transition duration-200 text-gray-800 bg-transparent placeholder-gray-400"
            />
          </div>

          <button type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-400 transition duration-300 text-white font-medium py-2 rounded-full shadow"
          >Submit</button>
        </form>
      </div>
    </div>
  );
};

export default GetAdmin;

