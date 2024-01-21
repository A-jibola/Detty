import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { TiMediaPlayOutline, TiMediaPlayReverseOutline } from "react-icons/ti";


export default function Service () {

    const [imagesList, setImagesList] = useState({})
    const [date, SetDate] = useState('')
    const [startDate, SetStartDate] = useState('')
    const [endDate, SetEndDate] = useState('')
    const [Currentimage, setCurrentImage] = useState('')
    const [imageIndex, SetImageIndex] = useState(0)
    const {id} = useParams()
    const [service, SetService] = useState({features:[], terms:[], contactInfo:[]})


    const SingleDatePicker = e=>{
        SetDate(e.target.value)
    }

    const StartDatePicker = e=>{
        SetStartDate(e.target.value)
    }

    const EndDatePicker = e=>{
        SetEndDate(e.target.value)
    }



    const goLeft = ()=>{
        imageIndex >0 ? SetImageIndex(imageIndex - 1): SetImageIndex(0)
    }

    const goRight = ()=>{
        imageIndex < imagesList.length -1 ? SetImageIndex(imageIndex + 1): SetImageIndex(0)
    }

    const Reserve = async(e,id) =>{
        try{
        e.preventDefault();
        const token = localStorage.getItem('tokenStore');
            if(token){
                if(date){
                    const response  = await axios.post(`/reservation/`, {
                        serviceId:id, singleDateBooked: date
                    }, { headers:{Authorization:token} }
                    );
                    if(response.data.reservation){
                        window.location.pathname = "/reservations"
                    }
                }
                if(startDate){
                    const response  = await axios.post(`/reservation/`, {
                        serviceId:id, durationBooked: { startDate: startDate, endDate: endDate}}, 
                        { headers:{Authorization:token} }
                    );
                    if(response.data.reservation){
                        window.location.pathname = "/reservations"
                    }
                }
                
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const start = () =>{
        setCurrentImage(imagesList[imageIndex])
    };

    useEffect(()=>{

        const checkServices = async ()=>{
            try{
                const response  = await axios.get(`/service/${id}`);
                if(response.data.service){
                    SetService(response.data.service);
                    setImagesList(response.data.service.images)
                    start();
                }
            }
            catch(error){
                console.log(error);
            }
        }
        checkServices();
    }, [imagesList, imageIndex, Currentimage])

  return (
    <div className='mx-3 mt-2 pb-4'>
        <div className='row'>
            <div className='col-lg-5 col-sm-10 col-xs-10 mt-1'>
                <span className='medium tag-green'> Category: <span className='bold'>{service.category}</span></span>
                <p className='bold mt-2 mb-0'>Name: </p>
                <h1 className='mb-2 mt-0'> {service.name}</h1>

                <p className='bold mb-0'>Description: </p>
                <p className='mb-2 mt-0 mr-2'> {service.description}</p>

                <p className='bold mb-0'>Price: </p>
                <p className='mb-2 mt-0'> {service.price}</p>

                <div className='mt-0 mb-2 px-1 border-curve text-center border-light max-content'>
                    <p>Reservation Duration</p>
                    {(service.category === "Shortlets" || service.category === "Ride Service") ?
                    <><input onChange={StartDatePicker} value={startDate} type="datetime-local" />
                     <p className='text-center m-0 p-0 light c-dgrey'>to</p>
                      <input onChange={EndDatePicker} value={endDate} type="datetime-local" /></>
                    :<input onChange={SingleDatePicker} value={date} type="datetime-local" />}
                    <br />
                    <button onClick={e=>Reserve(e,id)} className="my-1 button button-green bold"> Make Reservation </button>
                </div>
            </div>
            <div className='col-lg-5 col-sm-10 col-xs-10'>
                <div className='image-container w-100'>
                    <TiMediaPlayReverseOutline className='left-overlay cursor-point' onClick={goLeft} />
                    <div className='w-99 text-center border-curve border-grey d-inline'>
                    <img alt='service Banner' src={`/ServiceImage/${Currentimage}`} className='w-max-100 h-max-100'/>
                    </div>
                    <TiMediaPlayOutline className='right-overlay cursor-point' onClick={goRight} />
                </div>
            </div>
        </div>
        <div className='my-3'>
            <h3>FEATURES :</h3>
            <ul className='p-items-1'>
            {
                service.features.map((feature, index)=>{
                    return (
                        <li key={index}>{feature}</li>
                    )
                })
            }
            </ul>

            <h3>TERMS AND CONDITION :</h3>
            <ul className='p-items-1'>
            {
                service.terms.map((term, index)=>{
                    return (
                        <li key={index}>{term}</li>
                    )
                })
            }
            </ul>

            <h3>CONTACT INFORMATION :</h3>
            <ul className='p-items-1'>
            {
                service.contactInfo.map((contactInfo, index)=>{
                    return (
                        <li key={index}>{contactInfo}</li>
                    )
                })
            }
            </ul>

        </div>
    </div>
  )
}
