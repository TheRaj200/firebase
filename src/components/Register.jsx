import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const ip = ipResponse.data.ip;
      const signupTime = new Date().toISOString();

      await addDoc(collection(db, 'users'), {
        email,
        password,
        signupTime,
        ip,
      });

      setEmail('');
      setPassword('');
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
      <div className='bg-[crimson] mt-[15vh] w-[44vh] h-[45vh]  p-4 flex flex-col gap-4 rounded-xl items-center '>
    
      <h1 className='text-zinc-950 font-semibold text-2xl'>Register User</h1>
      <input
       className='pl-4  mt-4 min-h-[5vh] rounded-md border-zinc-600 border-[2px]'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
      className='pl-4  h-[5vh] rounded-md border-zinc-600 border-[2px]'
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='text-zinc-50' onClick={handleRegister}>Register</button>
      <p className='text-zinc-100'>You have an account? <a className="text-zinc-950 drop-shadow-xl hover:text-zinc-900 " href="/">Login</a></p>
      
      </div>
   
  );
};

export default Register;
