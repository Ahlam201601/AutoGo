import React from 'react'
import Navbar from '../Components/Navbar'

export default function Home() {
  return (
     <>
     <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <h1 className="text-5xl font-bold text-blue-800">Home</h1>
    </div>
    </>
  )
}
