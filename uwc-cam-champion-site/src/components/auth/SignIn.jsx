import React from 'react'

// icons
import { CiMail, CiLock } from "react-icons/ci";

function SignIn({ screen }) {
  return (
    <div className='w-full max-w-sm bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl'>

      <h1 className='text-2xl font-bold tracking-tight'>UWC Champion Portal</h1>
      <p className='text-sm font-medium text-gray-600 max-w-sm mt-2 mb-8'>
        Sign in to access student services, your modules, and champion features
      </p>

      <form className='flex flex-col' onSubmit={(e) => e.preventDefault()}>

        <label htmlFor="identifier" className="text-sm font-semibold mb-1">
          Email or Staff/Student ID
        </label>
        <div className='flex flex-row gap-2 items-center border border-gray-300 rounded-xl mb-5 px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 transition-colors'>
          <CiMail size={20} className='text-gray-500 shrink-0' />
          <input
            id="identifier"
            type="text"
            placeholder='you@uwc.ac.za'
            className='outline-0 w-full bg-transparent text-sm'
          />
        </div>

        <label htmlFor="password" className="text-sm font-semibold mb-1">
          Password
        </label>
        <div className="flex flex-row gap-2 items-center border border-gray-300 rounded-xl mb-2 px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 transition-colors">
          <CiLock size={20} className='text-gray-500 shrink-0' />
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="outline-0 w-full bg-transparent text-sm"
          />
        </div>

        <button
          type="button"
          onClick={() => screen("ForgotPassword")}
          className='self-end text-xs font-semibold text-gray-500 hover:text-blue-700 cursor-pointer mb-6 transition-colors'
        >
          Forgot Password?
        </button>

        <button
          type="submit"
          className='w-full py-2.5 rounded-xl bg-blue-700 text-white font-semibold cursor-pointer hover:bg-blue-800 transition-colors shadow-sm'
        >
          Sign In
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