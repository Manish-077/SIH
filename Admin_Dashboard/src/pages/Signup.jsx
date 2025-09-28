import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerAdmin } from '../services/apiService';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerAdmin({ name: username, email, password });
      navigate('/farmers');
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <div className='signup w-full h-screen justify-center items-center flex'>
      <form className='flex flex-col min-w-1/3 gap-5 p-5 border-2 border-black rounded' onSubmit={handleSubmit}>
        <h3 className='text-2xl font-semibold tracking-tighter'>Create Admin Account</h3>
        <input className='border-2 border-black py-1 px-3 rounded text-lg outline-none' type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} required />
        <input className='border-2 border-black py-1 px-3 rounded text-lg outline-none' type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
        <input className='border-2 border-black py-1 px-3 rounded text-lg outline-none' type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-900 transition" type='submit'>Create Account</button>
        <Link className="border-2 borderpx-6 py-3 rounded hover:bg-gray-900 hover:text-white transition text-center" to="/login" >Already have an account? Login here</Link>
      </form>
    </div>
  );
};

export default Signup;