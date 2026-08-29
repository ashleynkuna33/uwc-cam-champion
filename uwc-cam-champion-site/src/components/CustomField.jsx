import React from 'react'

function CustomField({ icon: Icon, id, type, value, onChange, placeholder }) {
  return (
    <div className='flex flex-row gap-2 items-center border border-gray-300 rounded-xl mb-5 px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 transition-colors'>
      <Icon size={20} className='text-gray-500 shrink-0' />
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='outline-0 w-full bg-transparent text-sm'
      />
    </div>
  )
}

export default CustomField