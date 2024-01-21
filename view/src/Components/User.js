import React, { useState, useEffect } from 'react'
import { IconContext } from "react-icons";
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios'

export default function User() {
    const [email, setEmail] = useState('')

    const logout = () =>{
        localStorage.removeItem('tokenStore')
        window.location.pathname = '/login'
    }

    const deleteAccount = async () =>{
        const token = localStorage.getItem('tokenStore');
        if(token){
            await axios.delete('/user/editUser', {
                headers:{Authorization:token}
            });
            window.location.pathname = '/login'
        }
    }

    const closePopup = (id) =>{
        document.getElementById(id).classList.remove('d-block');
        document.getElementById(id).classList.remove('openPopup');
    }

    useEffect(()=>{
        const checkLoginStatus = async ()=>{
          const token = localStorage.getItem('tokenStore');
          if(token){
              const response  = await axios.get('/user/', {
                  headers:{Authorization:token}
              });
              setEmail(response.data.userEmail)
            }
        }
        checkLoginStatus();
      })

  return (
    <>
    <div className='hero'>
        <IconContext.Provider value={{size: 100}}>
        <FaUserCircle />
        </IconContext.Provider>
        <div className='mt-2 pb-4 mx-4'>
            <h1 className='belleza text-center'>Account Details</h1>
            <form className='m-0 mb-1'>
                <span className='medium'> Email: </span>
                <input type="text" name="fname" value={email} placeholder={email} disabled/>
            </form>
            <div className='pb-4'>
                <a href="/change" className="button button-o-dark"> Edit Account</a>
                <button className="button-dgrey popup-trigger" data-modalid="logout"> Sign out</button>
                <button className="button-o-red popup-trigger" data-modalid="delete"> Delete Account</button>
            </div>
        </div>
    </div>

    <div className="popup-overlay" id="logout">
        <div className='flex-align-xy'>
            <div className="popup fl-column text-center p-1">
            <div className="popup-title px-2">
            <span className="close-popup" data-modalid="logout"></span>
            <span className='px-2'>Are you sure you want to logout?</span> </div>
            <div className="popup-footer">
            <button className="button-dark" onClick={()=> closePopup('logout')}> No </button>
            <button className="button-red" onClick={logout}> Sign out</button>
            </div>
            </div>
        </div>
    </div>

    <div className="popup-overlay" id="delete">
        <div className='flex-align-xy'>
            <div className="popup fl-column text-center p-1">
            <div className="popup-title px-2">
            <span className="close-popup" data-modalid="delete"></span>
            <span className='px-2'>Are you sure you want to Delete your account?</span> 
            <p className='smaller-text c-red mb-0 thin'>This is not reversable</p>
            </div>
            <div className="popup-footer">
            <button className="button-dark" onClick={()=> closePopup('delete')}> No </button>
            <button className="button-red" onClick={deleteAccount}> Sign out</button>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}
