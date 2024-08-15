import React from 'react'
import { RiErrorWarningFill } from "react-icons/ri";

const TextInput = (
    {
        label = null,
        type = 'text',
        inputId, 
        name, 
        onChange, 
        value = "", 
        placeholder,
        disabled = false,
        className = '',
        error = '',
    }) => {

  return (
    <div className='flex-col '>
        <div className='mb-1'>
        {
            label && <label className='text-xs text-gray-700 font-medium'> { label } </label>
        }
        </div>
        
        <div className={`${error ? 'border border-red-500':'border border-grey-500'} mb-2 px-[7px] py-[5px] flex items-center gap-1 rounded min-w-[230px]`}>
        <input 
        type={type}
        className={`${className}  outline-none text-xs font-regular text-gray-600 w-full`}
        id={inputId} 
        name={name} 
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled = {disabled}
        />
        {error && <RiErrorWarningFill className='text-red-500' title={error}/>}
        </div>
    </div>
  )
}

export default TextInput