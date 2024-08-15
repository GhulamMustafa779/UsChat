import React from 'react'
import useSignin from '../../hooks/useSignin'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'
import {Link} from 'react-router-dom';

const SignIn = () => {
    const {formData, errors, handleChange, handleSubmit} = useSignin();

    return (
      <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
      <form onSubmit={handleSubmit}
      className='flex flex-col gap-5 bg-white px-5 py-[30px] border border-grey-400 rounded-[20px] drop-shadow-lg'>
        
        <h1 className='text-xl text-center text-gray-700 font-medium'>Sign in</h1>
      
        <div className='flex-col '>
        <TextInput 
        label='Username'
        type = 'text'
        placeholder=''
        name='username'
        value={formData.username}
        className=''
        error={errors?.noUsername}
        onChange={handleChange}
        />
  
        <TextInput 
        label='Password'
        type='password'
        placeholder='' 
        name='password'
        value={formData.password}
        className=''
        error={errors?.noPassword}
        onChange={handleChange}
        />

        </div>
  
        <div>
        <Button btnType='primary' type='submit' size='lg' width='w-full' text='Submit'/>
        <Link to='/register' className='text-[10px] text-blue-500 hover:underline'>Create a new account</Link>
        </div>
      </form>
      </div>
  )
}

export default SignIn