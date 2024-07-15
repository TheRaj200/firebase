// src/components/Login.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(""); // Clear error on successful login
      navigate("/todolist");
    } catch (error) {
      setError(error.message);
    }
  };

  return (

   <div className='bg-[crimson] mt-[15vh]  w-[45vh] min-h-[40vh] p-4 flex flex-col gap-4 rounded-xl items-center '>
      <h2  className='text-zinc-950 font-semibold text-2xl'>Login</h2>
      {error && <p style={{ color: "white" }}>{error}</p>}
      <input
            className='pl-4   rounded-md border-zinc-600 border-[2px]'

        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
             className='pl-4   rounded-md border-zinc-600 border-[2px]'

        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button  className="mx-6"  onClick={handleLogin}>Login</button>
      <p className='text-zinc-100'>Don't have an account? <a className="text-zinc-950 drop-shadow-xl hover:text-zinc-900 " href="/signup">Register</a></p>
    </div>
  );
};

export default Login;
