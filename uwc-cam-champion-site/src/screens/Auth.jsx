import React from 'react'

// icons and images
import Logo from "../assets/uwcHeaderLogo-transparent.png"
import BackgrondImg1 from "../assets/AI_Background_3.png"
import BackgrondImg2 from "../assets/AI_Background_1.png"

import Authenticator from "../components/auth/Authenticator";
import Typewriternotes from "../components/Typewriternotes";

function Auth() {
  return (
    <div className='h-screen w-full grid md:grid-cols-2 overflow-hidden'>

      {/* authentication view */}
      <div className='flex flex-col items-center justify-between p-4 sm:p-8 bg-cover bg-center bg-no-repeat overflow-y-auto' style={{ backgroundImage: `url(${BackgrondImg1})` }} >
        
        {/* auth component */}
        <div className='flex-1 flex items-center justify-center w-full'>
          <Authenticator />
        </div>
        
        {/*  */}
        <div className='flex flex-row flex-wrap items-center justify-center gap-4 py-3 shrink-0'>
          <button className='text-sm font-semibold cursor-pointer transition-colors duration-00 hover:text-blue-700 hover:underline'>
            Terms of Service
          </button>
          <button className='text-sm font-semibold cursor-pointer transition-colors duration-00 hover:text-blue-700 hover:underline'>
            Privacy Policy
          </button>
          <button className='text-sm font-semibold cursor-pointer transition-colors duration-00 hover:text-blue-700 hover:underline'>
            Accessibility
          </button>
        </div>
        
      </div>

      {/* visual panel */}
      <div className='hidden md:flex flex-col relative bg-cover bg-center bg-no-repeat overflow-y-auto' style={{ backgroundImage: `url(${BackgrondImg2})` }}>

        <div className='absolute inset-0 bg-black/50 pointer-events-none' />

        <div className='relative z-10 flex flex-col h-full w-full p-6 sm:p-10'>

          {/* logo */}
          <div className='mb-18'>
            <img src={Logo} alt="UWC Logo" className='h-20 w-auto' />
          </div>

          <h1 className='text-5xl font-bold text-[#c7c4bd] max-w-md mb-12'>Join X students already tracking their modules</h1>

          <Typewriternotes
              paragraphs={[
                  "Track your target marks and see exactly what you need to score on every remaining assessment.",
                  "Log every assessment result the moment you get it — no spreadsheets, no guesswork.",
                  "Set deadlines for every module and get reminded before it's too late.",
              ]}
              typingDuration={3000}
              pauseDuration={30000}
              erasingDuration={1500}
          />

        </div>
      </div>

    </div>
  )
}

export default Auth