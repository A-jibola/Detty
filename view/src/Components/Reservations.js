import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Reservations() {

    const [category, SetCategory] = useState('')
    const [displayOption, setDisplayOption] = useState('details')
    const [reservations, SetReservations] = useState([])
    const [filter, SetFilter] = useState('')

    const CancelReservation = async (e, id)=>{
        try{
            e.preventDefault();
            const token = localStorage.getItem('tokenStore');
            if(token){
                const response  = await axios.delete(`/reservation/${id}`, {
                    headers:{Authorization:token}
                });
                if(response.data.responseType){
                    window.location.reload()
                }
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const MakePayment = async (e, id)=>{
        try{
            e.preventDefault()
            const token = localStorage.getItem('tokenStore');
            if(token){
                const response  = await axios.post(`/reservation/receipt/${id}`, null, {
                    headers:{Authorization:token}
                });
                if(response.data.paymentDetail){
                    window.location.replace(response.data.paymentDetail.data.authorization_url);
                }
            }
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        const checkRegistration = async ()=>{
            try{

                if(window.innerWidth <= 500){
                    setDisplayOption("cards")
                }
                else{
                    setDisplayOption("details")
                }                

                const token = localStorage.getItem('tokenStore');
                if(token){
                    if(category !== ''){
                        const response  = await axios.get(`/reservation/all/${category}`, {
                            headers:{Authorization:token}
                        });
                        if(response.data.reservation){
                            if(filter!== ''){
                                filter === "past" ? SetReservations(response.data.reservation.filter(x=> new Date(x.dateCreated) <= new Date()))
                                : SetReservations(response.data.reservation.filter(x=> new Date(x.dateCreated) >= new Date()))
                            }
                            else{
                                SetReservations(response.data.reservation);
                            }
                        }
                    }
                    else{
                        const response  = await axios.get('/reservation/', {
                            headers:{Authorization:token}
                        });
                        if(response.data.reservation){
                            if(filter!== ''){
                                filter === "past" ? SetReservations(response.data.reservation.filter(x=> new Date(x.dateCreated) <= new Date()))
                                : SetReservations(response.data.reservation.filter(x=> new Date(x.dateCreated) >= new Date()))
                            }
                            else{
                                SetReservations(response.data.reservation);
                            }
                        }
                    }
                }
            }
            catch(error){
                console.log(error);
            }
        }
        checkRegistration();
    }, [reservations, SetReservations, filter, category])

  return (
    <>
        <div className='mx-3 pb-4'>
            <h1 className='text-center mb-1 belleza'> RESERVATIONS</h1>

            <div className='m-items-1 flex-align-xy d-flex'>
                <p onClick={()=>SetFilter('')} className='cursor-point p-button'>All</p>
                <p onClick={()=>SetFilter('active')} className='cursor-point p-button'>Active</p>
                <p onClick={()=>SetFilter('past')} className='cursor-point p-button'>Past</p>
                <select onChange={e=> SetCategory(e.target.value)} className='w-max-50 w-100' name="cars">
                    <option value=''>All</option>
                    <option value="Payment Complete">Payment Complete</option>
                    <option value="Payment Failed">Payment Failed</option>
                    <option value="Payment Pending">Payment Pending</option>
                </select>
            </div>

            {
        displayOption === "details"?
        <div className='row fl-column pt-1'>
            {
                reservations.map((reservation, index)=>{
                    return (
                        <div key={index} className="col-10 details px-0">
                            <img alt='service Banner' src={`/ServiceImage/${reservation.image}`} className="details-img mx-1"/>
                            <div className="details-left p-items-0  pr-1">
                                <p><span className='bold'>Name: </span> {reservation.serviceName}</p>
                                <p><span className='bold'>Date Created:</span> {new Date(reservation.dateCreated).toLocaleString()}</p>
                                <p><span className='bold'>Payment Status:</span> {reservation.paymentStatus} </p>
                            </div>
                            <div className="details-right pr-1">
                                <p><span className='bold text-center'>Price:</span> ₦{reservation.price} </p>
                                { reservation.paymentStatus === "Payment Complete"?
                                <a download='receipt.pdf' href={`data:application/pdf;base64,${reservation.receipt}`} className='text-center button button-o-dark'>Download Receipt</a>
                                :
                                <>
                                <button onClick={e=>CancelReservation(e, reservation._id)} className='text-center button button-o-dark'>Cancel Reservation</button>
                                <button onClick={e=>MakePayment(e, reservation._id)} className='text-center button button-o-dark'>Make Payment</button>
                                </>
                                }
                            </div>
                        </div>
                )
                
                })
            }
        </div>
        :
        <div className='row pt-3 flex-align-xy'>
        {
            reservations.map((reservation, index)=>{
                return(
                    <div key={index} className='col-lg-3 col-sm-5 col-xs-10'>
                        <div className="card">
                            <p className='p-0 m-0 card-intro-info '>
                            <span className='medium tag-green'> Category: <span className='bold'>{reservation.category}</span></span>
                            </p>
                            <div className='text-center'>
                            <img alt='service Banner' src={`/ServiceImage/${reservation.image}`} className="mt-1 w-max-100 h-max-50"/>
                            </div>
                            <div className="card-title"> <span className='bold'>Name: </span> {reservation.serviceName} </div>
                            <div className="card-body">
                                <p><span className='bold'>Date Created:</span> {new Date(reservation.dateCreated).toLocaleString()}</p>
                                <p><span className='bold'>Payment Status:</span> {reservation.paymentStatus}</p>
                                <p><span className='bold text-center'>Price:</span> ₦{reservation.price} </p>
                            </div>
                            <div className="card-footer text-center py-1 row"> 
                            { reservation.paymentStatus === "Payment Complete"?
                                <a download='receipt.pdf' href={`data:application/pdf;base64,${reservation.receipt}`} className='col my-0 text-center button button-o-dark'>Download Receipt</a>
                                :
                                <>
                                <button onClick={e=>CancelReservation(e, reservation._id)} className='col my-0 text-center button button-o-dark'>Cancel Reservation</button>
                                <button onClick={e=>MakePayment(e, reservation._id)} className='col my-0 text-center button button-o-dark'>Make Payment</button>
                                </>
                            }
                            </div>
                            </div>
                    </div>  
                )
            })
        }

        </div>
    }

        </div>
    </>
  )
}
