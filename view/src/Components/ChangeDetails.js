import React, { useState } from 'react'
import axios from 'axios';

export default function ChangeDetails() {
    const [response, SetResponse] = useState('')
    const [responseColor, SetResponseColor] = useState('tag-green')
    const [user, SetUser] = useState({email: '', password: '', confirmPassword: '', oldPassword: ''})

    const onChangedValue = e =>{
      const {name, value} = e.target
      SetUser({...user, [name]:value})
    }

    const saveChanges = async e=>{
      e.preventDefault();
      const token = localStorage.getItem('tokenStore');
      if(user.password === user.confirmPassword){
        const res  = await axios.post('/user/editUser', {
          email: user.email,
          password: user.password,
          oldPassword: user.oldPassword
        }, {headers: {Authorization: token}});
        if(res.data.responseType !== "Error"){
            SetResponseColor("tag-green") 
            localStorage.removeItem('tokenStore')
        }
        SetResponseColor("tag-red")
        SetResponse(res.data.message)
        // SetUser({email: '', password: '', confirmPassword: '', oldPassword: ''})
      } else{
        SetResponseColor("tag-red")
        SetResponse("Passwords don't Match")
      }
    }

  return (
    <>
        <div className='row flex-align-xy mt-2'>
        <div className='col-lg-4 col-xs-8 col-sm-6 flex-align-xy p-2 fl-column border-grey border-curve'>
            <h1 className='text-center belleza'> Update Details</h1>
            {response? <span className={responseColor}>{response}</span>: ''}
            <form className='mb-items-1' method='POST'>
                <input name="email" onChange={onChangedValue} value={user.email} type="email"  placeholder='Enter Email'/>
                <input name="oldPassword" onChange={onChangedValue} value={user.oldPassword} type="password" placeholder='Enter Old Password'/>
                <input name="password" onChange={onChangedValue} value={user.password} type="password" placeholder='Enter New Password' />
                <input name="confirmPassword" onChange={onChangedValue} value={user.confirmPassword} type="password" placeholder='Confirm New Password' />
                <div className='text-center'>
                <button onClick={saveChanges} className='text-center w-50 button-o-dark'>Save Changes</button>
                </div>
            </form>
        </div>
        </div>
    </>
  )
}
