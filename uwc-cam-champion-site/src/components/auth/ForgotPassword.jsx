import React from 'react'

// icons
import { CiMail } from "react-icons/ci";

function ForgotPassword({ screen }) {
  return (
    <div className='w-full max-w-sm bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl'>

      <h1 className='text-2xl font-bold tracking-tight'>Reset Your Password</h1>
      <p className='text-sm font-medium text-gray-600 max-w-sm mt-2 mb-8'>
        Enter your email or Staff/Student ID and we'll send you a link to reset your password
      </p>

      <form className='flex flex-col' onSubmit={(e) => e.preventDefault()}>

        <label htmlFor="identifier" className="text-sm font-semibold mb-1">
          Email or Staff/Student ID
        </label>
        <div className='flex flex-row gap-2 items-center border border-gray-300 rounded-xl mb-6 px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 transition-colors'>
          <CiMail size={20} className='text-gray-500 shrink-0' />
          <input
            id="identifier"
            type="text"
            placeholder='you@uwc.ac.za'
            className='outline-0 w-full bg-transparent text-sm'
          />
        </div>

        <button
          type="submit"
          className='w-full py-2.5 rounded-xl bg-blue-700 text-white font-semibold cursor-pointer hover:bg-blue-800 transition-colors shadow-sm'
        >
          Send Reset Link
        </button>

        <p className='text-center text-sm font-medium text-gray-600 mt-5'>
          Remembered your password?{' '}
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

export default ForgotPassword