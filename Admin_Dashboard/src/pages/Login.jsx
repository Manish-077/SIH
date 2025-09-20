import React from 'react'
import { Link } from 'react-router-dom'

const login = () => {
  return (
    <div className='login w-full h-screen justify-center items-center flex'>
        <form className='flex flex-col min-w-1/3 gap-5 p-5 border-2 border-black rounded' action="/farmers" method='POST'>
            <h3 className='text-2xl font-semibold tracking-tighter'>Admin Login</h3>
            <input className='border-2 border-black py-1 px-3 rounded text-lg outline-none' type="text" placeholder='Username' name='username' required />
            <input className='border-2 border-black py-1 px-3 rounded text-lg outline-none' type="password" placeholder='Password' name='password' required />
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-900 transition" type='submit'>Login</button>
            <Link className="border-2 borderpx-6 py-3 rounded hover:bg-gray-900 hover:text-white transition text-center" to="/signup" >Create new account</Link>
        </form>
    </div>
  )
}

export default login