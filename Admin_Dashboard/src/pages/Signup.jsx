import React from 'react'
import { Link } from 'react-router-dom'

const signup = () => {
  return (
    <div className='signup w-full h-screen justify-center items-center flex'>
        <form className='flex flex-col min-w-1/3 gap-5 p-5 border-2 border-black rounded' action="/farmers" method='POST'>
            <h3 className='text-2xl font-semibold tracking-tighter'>Create Admin Account</h3>
            <input className='border-2 border-black py-1 px-3 rounded text-lg outline-none' type="text" placeholder='Username' name='username' required />
            <input className='border-2 border-black py-1 px-3 rounded text-lg outline-none' type="email" placeholder='email' name='email' required />
            <input className='border-2 border-black py-1 px-3 rounded text-lg outline-none' type="password" placeholder='Password' name='password' required />
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-900 transition" type='submit'>Create Account</button>
            <Link className="border-2 borderpx-6 py-3 rounded hover:bg-gray-900 hover:text-white transition text-center" to="/Login" >Already has account, login here</Link>
        </form>
    </div>
  )
}

export default signup