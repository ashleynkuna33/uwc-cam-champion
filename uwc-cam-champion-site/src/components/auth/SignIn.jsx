import React, { useState } from 'react'
import CustomField from '../CustomField';
import { useUser } from '../../context/UserContext';

// icons
import { CiMail, CiLock } from "react-icons/ci";

function SignIn({ screen }) {

  const { login } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Username and password required");
      return;
    }

    setError("");
    setSubmitting(true);

    const payload = { username, password };

    try {
      await login(payload);
      // navigate or switch screen on success, e.g.:
      // screen("Dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className='w-full max-w-sm bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl'>

      <h1 className='text-2xl font-bold tracking-tight'>UWC Champion Portal</h1>
      <p className='text-sm font-medium text-gray-600 max-w-sm mt-2 mb-8'>
        Sign in to access student services, your modules, and champion features
      </p>

      {error && (
        <p className="text-sm font-medium text-red-600 mb-4">{error}</p>
      )}

      <form className='flex flex-col' onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}>

        <label htmlFor="identifier" className="text-sm font-semibold mb-1">Email or Staff/Student ID</label>
        <CustomField icon={CiMail} id={"identifier"} type={"text"} value={username} onChange={(e) => setUsername(e.target.value)} placeholder={"you@myuwc.ac.za"}/>

        <label htmlFor="password" className="text-sm font-semibold mb-1">Password</label>
        <CustomField icon={CiLock} id={"password"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"Password"}/>
        
        <button type="button" onClick={() => screen("ForgotPassword")} className='self-end text-xs font-semibold text-gray-500 hover:text-blue-700 cursor-pointer mb-6 transition-colors'>Forgot Password?</button>

        <button type="submit" disabled={submitting} className='w-full py-2.5 rounded-xl bg-blue-700 text-white font-semibold cursor-pointer hover:bg-blue-800 transition-color shadow-sm disabled:opacity-60 disabled:cursor-not-allowed'>
          {submitting ? "Signing in..." : "Sign In"}
        </button>

        <p className='text-center text-sm font-medium text-gray-600 mt-5'>
          Need an account?{' '}
          <button
            type="button"
            onClick={() => screen("SignUp")}
            className='text-blue-700 font-semibold hover:underline cursor-pointer'
          >
            Sign Up
          </button>
        </p>

      </form>
    </div>
  )
}

export default SignIn