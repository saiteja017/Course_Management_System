import { useState } from 'react'
import './App.css'
import Registration from './Authentication/Registration'
import NavBar from './Components/Navbar'
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom'
import Login from './Authentication/Login'
import Profile from './DashBoard/Profile'
import Layout from './Layers/Layout'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <BrowserRouter >
        <Layout />
      </BrowserRouter>
    </>
  )
}

export default App
