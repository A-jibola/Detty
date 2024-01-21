import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Nav() {

    const [isLoggedIn, SetIsLoggedIn] = useState(false)
    const [navStyle, SetNavStyle] = useState('navbar-collapse nav-all-right m-0 px-2')

    useEffect(()=>{
        if(window.location.pathname !== '/'){ SetNavStyle('navbar-collapse nav-all-right m-0 px-2 border-bottom-light') }
        const checkLoginStatus = async ()=>{
            const token = localStorage.getItem('tokenStore');
            if(token){
                const response  = await axios.get('/user/', {
                    headers:{Authorization:token}
                });
                if(response.data.loggedIn){
                    SetIsLoggedIn(true);
                }
                else{
                    SetIsLoggedIn(false);  
                }
            }
            else{
                SetIsLoggedIn(false);
            }
        }
        checkLoginStatus();
    }, [isLoggedIn])

  return (
    <>
        {isLoggedIn?
            <div className={navStyle}>
                <div className="navbar-head nav-left">
                    <div className="navbar-toogle-button" data-collapse="collapseSidebar"></div>
                    <a href='/' className="navbar-header">
                    <img src="Detty.png" width="91" height="32"/>
                    </a>
                </div>
                <div className="navbar arvo bold c-dark " id="collapseSidebar">
                    <a href='/search' className='belleza no-underline c-dark px-1'>Search</a>
                    <a href='/saves' className='belleza no-underline c-dark px-1'>Saves</a>
                    <a href='/reservations' className='belleza no-underline c-dark px-1'>Reservations</a>
                    <a href='/users' className='belleza no-underline c-dark px-1'>User</a>
                </div>
            </div>
           : <div className={navStyle}>
        <div className="navbar-head nav-left">
            <div className="navbar-toogle-button" data-collapse="collapseSidebar"></div>
            <a href='/' className="navbar-header">
            <img src="Detty.png" width="91" height="32"/>
            </a>
        </div>
        <div className="navbar arvo bold c-dark" id="collapseSidebar">
            <a href='/search' className='belleza no-underline c-dark px-1'>Search Services</a>
            <a href='/login' className='belleza no-underline c-dark px-1'>Login / Register</a>
        </div>
        </div>
        }
    </>
  )
}
