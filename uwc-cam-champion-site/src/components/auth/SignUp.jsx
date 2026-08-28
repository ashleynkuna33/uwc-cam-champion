import React from 'react'

// icons
import { CiMail, CiUser, CiAt } from "react-icons/ci";

function SignUp({ screen }) {
  return (
    <div className='w-full max-w-sm bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl'>

      <h1 className='text-2xl font-bold tracking-tight'>Create Your Account</h1>
      <p className='text-sm font-medium text-gray-600 max-w-sm mt-2 mb-8'>
        Sign up to access student services, your modules, and champion features
      </p>

      <form className='flex flex-col' onSubmit={(e) => e.preventDefault()}>

        <label htmlFor="email" className="text-sm font-semibold mb-1">
          Email
        </label>
        <div className='flex flex-row gap-2 items-center border border-gray-300 rounded-xl mb-5 px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 transition-colors'>
          <CiMail size={20} className='text-gray-500 shrink-0' />
          <input
            id="email"
            type="email"
            placeholder='you@uwc.ac.za'
            className='outline-0 w-full bg-transparent text-sm'
          />
        </div>

        <div className='grid grid-cols-2 gap-3 mb-5'>
          <div className='flex flex-col'>
            <label htmlFor="firstName" className="text-sm font-semibold mb-1">
              First Name
            </label>
            <div className='flex flex-row gap-2 items-center border border-gray-300 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 transition-colors'>
              <CiUser size={20} className='text-gray-500 shrink-0' />
              <input
                id="firstName"
                type="text"
                placeholder='First name'
                className='outline-0 w-full bg-transparent text-sm'
              />
            </div>
          </div>

          <div className='flex flex-col'>
            <label htmlFor="lastName" className="text-sm font-semibold mb-1">
              Last Name
            </label>
            <div className='flex flex-row gap-2 items-center border border-gray-300 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 transition-colors'>
              <CiUser size={20} className='text-gray-500 shrink-0' />
              <input
                id="lastName"
                type="text"
                placeholder='Last name'
                className='outline-0 w-full bg-transparent text-sm'
              />
            </div>
          </div>
        </div>

        <label htmlFor="username" className="text-sm font-semibold mb-1">
          Username
        </label>
        <div className='flex flex-row gap-1 items-center border border-gray-300 rounded-xl mb-6 px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 transition-colors'>
          <CiAt size={16} className='text-gray-500 shrink-0' />
          <input
            id="username"
            type="text"
            placeholder='Choose a username'
            className='outline-0 w-full bg-transparent text-sm'
          />
        </div>

        <button
          type="submit"
          className='w-full py-2.5 rounded-xl bg-blue-700 text-white font-semibold cursor-pointer hover:bg-blue-800 transition-colors shadow-sm'
        >
          Sign Up
        </button>

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