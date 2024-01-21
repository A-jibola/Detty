import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Confirm() {
    const {id} = useParams()

    useEffect(()=>{
        const checkPayment = async ()=>{
            try{
                const token = localStorage.getItem('tokenStore');
                const response  = await axios.get(`/reservation/confirm/${id}`, {
                    headers:{Authorization:token}
                });
                console.log(response);
                if(response.data.paymentstatus){
                    window.location.pathname = "/reservations"
                }
            }
            catch(error){
                console.log(error);
            }
        }
        checkPayment();
    })

  return (
    <div className='hero'>
        <p className='hero-text'> Confirming payment... </p>
    </div>
  )
}
