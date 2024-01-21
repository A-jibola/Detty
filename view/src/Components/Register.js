import React, { useState } from 'react'
import axios from 'axios'

export default function Register() {
    const [response, SetResponse] = useState('')
    const [responseColor, SetResponseColor] = useState('tag-green')
    const [user, SetUser] = useState({email: '', password: '', confirmPassword: ''})

    const onChangedValue = e =>{
      const {name, value} = e.target
      SetUser({...user, [name]:value})
    }

    const register = async e=>{
      e.preventDefault();
      const res  = await axios.post('/user/register', {
        email: user.email,
        password: user.password
      });
      res.data.responseType === "Success" ? SetResponseColor('tag-green') : SetResponseColor('tag-red');
      SetResponse(res.data.message)
    }

  return (
    <>
        <div className='row flex-align-xy mt-2'>
        <div className='col-lg-4 col-xs-8 col-sm-6 flex-align-xy p-2 fl-column border-grey border-curve'>
            <h1 className='text-center belleza'> Sign Up</h1>
            {response? <span className={responseColor}>{response}</span>: ''}
            <form className='mb-items-1'>
                <input autoComplete="off" name="email" required onChange={onChangedValue} value={user.email} type="email" placeholder='Enter Email'/>
                <input type="password" name="password" required onChange={onChangedValue} value={user.password} placeholder='Enter Password'/>
                <input type="password" name="confirmPassword" required onChange={onChangedValue} value={user.confirmPassword} placeholder='Confirm Password' />
                <div className='text-center'>
                <button onClick={register} className='text-center w-50 button-o-dark'>Sign Up</button>
                </div>
            </form>
            <p> Already have an Account? <a href='/login' className='no-underline bold c-dgrey'>Sign In</a></p>
        </div>
        </div>
    </>
  )
}
