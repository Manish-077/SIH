import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
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
    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      if (res.ok) {
        navigate('/farmers');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Network or other error during signup:', err);
      setError('Could not connect to the server. Please check your network connection or ensure the backend is running.');
    }
  };

  return (
    <div className='signup w-full h-screen justify-center items-center flex'>
      <form className='flex flex-col min-w-1/3 gap-5 p-5 border-2 border-black rounded' onSubmit={handleSubmit}>
        <h3 className='text-2xl font-semibold tracking-tighter'>Create Admin Account</h3>
        <input className='border-2 border-black py-1 px-3 rounded text-lg outline-none' type="text" placeholder='Name' value={username} onChange={e => setUsername(e.target.value)} required />
        <input className='border-2 border-black py-1 px-3 rounded text-lg outline-none' type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
        <input className='border-2 border-black py-1 px-3 rounded text-lg outline-none' type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-900 transition" type='submit'>Create Account</button>
        <Link className="border-2 borderpx-6 py-3 rounded hover:bg-gray-900 hover:text-white transition text-center" to="/login" >Already have an account? Login here</Link>
      </form>
    </div>
  );
};

export default Signup;