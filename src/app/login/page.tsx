"use client"

import { useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { LoginCard } from '@/components/LoginCard';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios({
          url:'https://book-server-henna.vercel.app/api/login',
          method: "POST",
          data: { email, password},
          withCredentials: true,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      console.log("Response", response)
      setMessage(response.data.message);
      redirect('/')
    } catch (error) {
    }
  };

  return (
    <div className="container mx-auto mb-20 min-h-screen">
        <div className="max-w-sm mx-auto space-y-4 px-2">
            <div className='mt-12'>
            <LoginCard/>
            </div>
        </div>
        
        {/* <h1>Login</h1>
        <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p>{message}</p> */}
    </div>
  );
}
