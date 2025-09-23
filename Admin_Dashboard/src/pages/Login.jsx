import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/apiService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    try {
      const data = await loginAdmin({ email, password });
      localStorage.setItem('token', data.token);
      navigate('/farmers');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='login w-full h-screen justify-center items-center flex'>
      <form className='flex flex-col min-w-1/3 gap-5 p-5 border-2 border-black rounded' onSubmit={handleSubmit}>
        <h3 className='text-2xl font-semibold tracking-tighter'>Admin Login</h3>
        <input className='border-2 border-black py-1 px-3 rounded text-lg outline-none' type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
        <input className='border-2 border-black py-1 px-3 rounded text-lg outline-none' type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-900 transition" type='submit'>Login</button>
        <Link className="border-2 borderpx-6 py-3 rounded hover:bg-gray-900 hover:text-white transition text-center" to="/signup" >Create new account</Link>
      </form>
    </div>
  );
};

export default Login;