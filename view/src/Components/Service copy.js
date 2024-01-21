import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { TiMediaPlayOutline, TiMediaPlayReverseOutline } from "react-icons/ti";


export default function Service () {

    const [imagesList, setImagesList] = useState({})
    const [Currentimage, setCurrentImage] = useState('')
    const [imageIndex, SetImageIndex] = useState(0)
    const {id} = useParams()
    const [service, SetService] = useState({features:[], terms:[], contactInfo:[]})

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
                const response  = await axios.post(`/reservation/`, {
                    serviceId:id, singleDateBooked: new Date(Date.now())
                }, { headers:{Authorization:token} }
                );
                console.log(response)
                if(response.data.paymentDetail){
                    window.location.pathname = "/reservations"
                }
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const start = () =>{
        setImagesList(['/logo512.png', '/logo192.png']);
        setCurrentImage(imagesList[imageIndex])
    };

    useEffect(()=>{

        const checkServices = async ()=>{
            try{
                const response  = await axios.get(`/service/${id}`);
                if(response.data.service){
                    SetService(response.data.service);
                    start();
                }
            }
            catch(error){
                console.log(error);
            }
        }
        checkServices();
    }, [setImagesList, imageIndex, setCurrentImage, Currentimage])

  return (
    <div className='mx-3 pb-4'>
        <div className='mx-3'>
            <h3 className='medium'> NAME: {service.name}</h3>
            <h3 className='medium'> CATEGORY: {service.category}</h3>
            <h3 className='medium'> PRICE: {service.price}</h3>
            <div className='text-right mt-0 mb-2 position-sticky'>
                <button onClick={e=>Reserve(e,id)} className="button button-o-green bold px-4"> RESERVE </button>
            </div>

            <div className='image-container w-100'>
                <TiMediaPlayReverseOutline className='left-overlay' onClick={goLeft} />
                <div className='w-99 text-center border-curve border-grey d-inline'>
                <img src={Currentimage} className='w-max-100'/>
                </div>
                <TiMediaPlayOutline className='right-overlay' onClick={goRight} />
            </div>

            <h3>FEATURES :</h3>
            <ul>
            {
                service.features.map((feature, index)=>{
                    return (
                        <li key={index}>{feature}</li>
                    )
                })
            }
            </ul>

            <h3>TERMS AND CONDITION :</h3>
            <ul>
            {
                service.terms.map((term, index)=>{
                    return (
                        <li key={index}>{term}</li>
                    )
                })
            }
            </ul>

            <h3>CONTACT INFORMATION :</h3>
            <ul>
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
