import React, { useState } from 'react'
import CustomField from "../CustomField";

// icons
import { CiMail, CiUser, CiAt, CiLock } from "react-icons/ci";

function SignUp({ screen }) {
  
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (!email || !firstname || !lastname || !username || !password) {
      alert("Form not complete, ensure you have filled all the fields");
      return;
    }

    const payload = { firstname, lastname, username, email, password};
    console.log(payload);

  }

  return (
    <div className='w-full max-w-sm bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl'>

      <h1 className='text-2xl font-bold tracking-tight'>Create Your Account</h1>
      <p className='text-sm font-medium text-gray-600 max-w-sm mt-2 mb-8'>
        Sign up to access student services, your modules, and champion features
      </p>

      <form className='flex flex-col' onSubmit={(e) => {
        e.preventDefault();
        handleSignUp()
      }}>

        <label htmlFor="email" className="text-sm font-semibold mb-1">Email</label>
        <CustomField icon={CiMail} id={"email"} type={"text"} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Student email i.e.you@myuwc.ac.za"}/>
        

        <div className='grid grid-cols-2 gap-3 mb-2'>
          <div className='flex flex-col'>
            <label htmlFor="firstName" className="text-sm font-semibold mb-1">First Name</label>
            <CustomField icon={CiUser} id={"firstname"} type={"text"} value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder={"First name"}/>
          </div>

          <div className='flex flex-col'>
            <label htmlFor="lastName" className="text-sm font-semibold mb-1">Last Name</label>
            <CustomField icon={CiMail} id={"lastname"} type={"text"} value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder={"Last name"}/>
          </div>
        </div>

        <label htmlFor="username" className="text-sm font-semibold mb-1">Username</label>
        <CustomField icon={CiAt} id={"username"} type={"text"} value={username} onChange={(e) => setUsername(e.target.value)} placeholder={"Username"}/>

        <label htmlFor="password" className="text-sm font-semibold mb-1">Password</label>
        <CustomField icon={CiLock} id={"password"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"Password"}/>
        

        <button
          type="submit"
          className='w-full py-2.5 rounded-xl bg-blue-700 text-white font-semibold cursor-pointer hover:bg-blue-800 transition-colors shadow-sm'
        >Sign Up</button>

        <p className='text-center text-sm font-medium text-gray-600 mt-5'>
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => screen("SignIn")}
            className='text-blue-700 font-semibold hover:underline cursor-pointer'
          >
            Sign In
          </button>
        </p>

      </form>
    </div>
  )
}

export default SignUp