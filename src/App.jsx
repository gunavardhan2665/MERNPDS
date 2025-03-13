import { useState } from 'react'
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import MyPosts from './components/MyPosts'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path="/Myposts" element={<MyPosts/>}/>
      </Routes>
    </>
  )
}

export default App
