import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { instanceAxios } from '../ContextAPI/instanceAxios'

const Chat = () => {
  let [messages, setmessages] = useState([])
  let [message, setmessage] = useState("")
  

  let location = useLocation().state
  let userData = JSON.parse(localStorage.getItem('userData'))
  let userRole = localStorage.getItem('userRole')

  let fetchMessages = async _ => {
    let data = {
      "senderId": userData.fname + userData.email,
      "receiverId": location.fname + location.email,
      "msg": "ok bye"
    }
    let response = await instanceAxios.post('allmessages', data)

    console.log(response.data)
    if (response.status == 200) {
      setmessages(response.data)
    }
  }
  useEffect(() => {
    fetchMessages()
  }, [])

  let handleSend = async () => {
    if (message) {
      let response = await instanceAxios.post('/sendmessage', {
        "senderId": userData.fname + userData.email,
      "receiverId": location.fname + location.email,
        "msg": message
      })
      if(response.status==200){
        console.log("sended")
        setmessages(prev => [...prev, response.data])
        console.log(messages)
      }
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-100">

      <div className="w-1/4  bg-blue-200 shadow-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 underline">{userRole === 'student' ? 'Admin' : 'Student'} Info</h2>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-800 capitalize">{location.fname + " " + location.lname}</p>
          <p className="text-sm text-gray-600">Address : {location.address || 'Nill'}</p>
        </div>
        <hr />
        <div className="mt-4 text-sm text-gray-600">
          <p>Email: {location.email}</p>
          <p>Mobile: {location.mobileNumber || 'nill'}</p>
        </div>
      </div>


      <div className="w-full   flex flex-col">
        <div className="p-4  border-b  shadow text-gray-700 font-semibold capitalize text-lg">Chat With {location.fname + " " + location.lname}</div>

        <div id='chathidescroll' className='flex-1 overflow-y-auto px-4 py-4 bg-gray-50 border-x-4 border-gray-300 space-y-3'>
          {
            messages.map((msg) => {
              return (
                <div key={msg.id} className=' bg-gray-50   b px-5 '>
                  {msg.receiverId != location.fname+location.email ?
                  <>
                    <h1 className="text-start bg-blue-100 w-fit px-4 py-2 rounded shadow">
                      {msg.msg}
                    </h1>
                    <p className='text-gray-400 font-extralight' style={{fontSize:'10px'}}>{msg.timeStamp}</p>
                  </>
                    :
                    
                    <div className="flex flex-col items-end">
                      <h1 className="bg-red-200 px-4  py-2 rounded shadow w-fit">
                        {msg.msg}
                      </h1>
                      <p className='text-gray-400 font-extralight' style={{fontSize:'10px'}}>{msg.timeStamp}</p>
                    </div>
                  }
                </div>
              )
            })
          }
        </div>





        <div className=' py-4 flex justify-center gap-1 items-center '>
          <input type="text"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            className='border h-10 pl-4 rounded-full border-gray-500 focus:border-gray-400 border-b-2 border-r-2 outline-none w-[80%]'
            placeholder='Send Message' />
          <button className=' px-5 rounded bg-green-400 hover:bg-green-300 py-1.5'
            onClick={handleSend}
          >Send</button>
        </div>
      </div>
    </div>
  );

}

export default Chat
