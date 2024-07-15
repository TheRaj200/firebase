import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const auth = getAuth();

    try {
      // Register user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const ip = ipResponse.data.ip;
      const signupTime = new Date().toISOString();

      // Save user information to Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: user.email,
        signupTime,
        ip,
      });
      setEmail('');
      setPassword('');
      navigate("/todoList");
      setError('');
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Error registering user: ' + error.message);
      setSuccess('');
    }
  };

  return (
    <div className='bg-[crimson] mt-[15vh] w-[44vh] min-h-[50vh] p-4 flex flex-col gap-4 rounded-xl items-center'>
      <h1 className='text-zinc-950 font-semibold text-2xl'>Register User</h1>
      {error && <p style={{ color: "white" }}>{error}</p>}
      {success && <p className='text-green-500'>{success}</p>}
      <input
        className='pl-4 mt-4 min-h-[5vh] rounded-md border-zinc-600 border-[2px]'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='pl-4 h-[5vh] rounded-md border-zinc-600 border-[2px]'
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='text-zinc-50' onClick={handleRegister}>Register</button>
      <p className='text-zinc-100'>
        You have an account?{' '}
        <a className="text-zinc-950 drop-shadow-xl hover:text-zinc-900" href="/">
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
