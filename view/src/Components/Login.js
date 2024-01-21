import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {
    const [response, SetResponse] = useState('')
    const [user, SetUser] = useState({email: '', password: ''})

    const onChangedValue = e =>{
      const {name, value} = e.target
      SetUser({...user, [name]:value})
    }

    const login = async e=>{
      e.preventDefault();
      const res  = await axios.post('/user/login', {
        email: user.email,
        password: user.password
      });
      if(res.data.responseType === "Success"){
        localStorage.setItem('tokenStore', res.data.token)
        window.location.pathname = '/';
      }
      else{
      SetResponse(res.data.message)
      }
    }

  return (
    <>
        <div className='row flex-align-xy mt-2'>
        <div className='col-lg-4 col-xs-8 col-sm-6 flex-align-xy fl-column border-grey p-2 border-curve'>
            <h1 className='text-center belleza'> Login</h1>
            {response? <span className='tag-red'>{response}</span>: ''}
            <form className='mb-items-1'>
                <input type="email" required name="email" onChange={onChangedValue} value={user.email} placeholder='Enter Email' />
                <input type="password" required name="password" onChange={onChangedValue} value={user.password} placeholder='Enter Password'/>
                <div className='text-center'>
                <button onClick={login} className='text-center w-50 button-o-dark'>Login</button>
                </div>
            </form>
            <p className='text-center'> Don't have an Account? <a href='/register' className='no-underline c-dgrey bold'>Sign Up</a></p>
        </div>
        </div>
    </>
  )
}
