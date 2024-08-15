import React from 'react'
import useSignUp from '../../hooks/useSignUp'
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';


const SignUp = () => {
    const {formData, errors, requestSent, handleChange, handleSubmit} = useSignUp();
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
      <form onSubmit={handleSubmit}
      className='flex flex-col gap-5 bg-white px-5 py-[30px] border border-grey-400 rounded-[20px] drop-shadow-lg'>
        
        <h1 className='text-xl text-center text-gray-700 font-medium'>Sign up</h1>
      
        <div className='flex-col '>

        <TextInput 
        label='Fullname'
        type = 'text'
        placeholder=''
        name='fullname'
        value={formData.fullname}
        className=''
        error = {errors?.noFullname}
        onChange={handleChange}
        />

        <TextInput 
        label='Username'
        type = 'text'
        placeholder=''
        name='username'
        value={formData.username}
        className=''
        error = {errors?.noUsername}
        onChange={handleChange}
        />
  
        <TextInput 
        label='Password'
        type='password'
        placeholder='' 
        name='password'
        value={formData.password}
        className=''
        error = {errors?.noPassword}
        onChange={handleChange}
        />

        <TextInput 
        label='Confirm Password'
        type='password'
        placeholder='' 
        name='confirmPassword'
        value={formData.confirmPassword}
        className=''
        error = {errors?.noConfirmPassword || errors?.noMatchingPasswords}
        onChange={handleChange}
        />

        
        <div >
          <label className='text-xs text-gray-600 font-medium'>Gender</label><br/>
        <select name="gender" 
        onChange={handleChange}
        className='mt-1 outline-none border text-xs font-regular text-gray-700 px-[7px] py-[5px] rounded min-w-[230px]'>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        </div>


        </div>

        <div>
            <Button btnType='primary' type='submit' size='lg' width='w-full' text='Submit' disabled={requestSent}/>
            <Link to='/signin' className='text-[10px] text-blue-500 hover:underline'>Already have an account</Link>
        </div>
      </form>
      </div>
  )
}

export default SignUp