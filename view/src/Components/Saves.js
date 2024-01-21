import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaThList } from "react-icons/fa";
import { BsBoxFill } from "react-icons/bs";


export default function Saves() {

    const [displayOption, setDisplayOption] = useState('details')
    const [saves, SetSaves] = useState([])

    const cardList = ()=>{
        setDisplayOption("cards")
    }
    const detailsList = ()=>{
        setDisplayOption("details")
    }

    const RemoveSaved = async (e, saveId)=>{
        try{
            e.preventDefault();
            const token = localStorage.getItem('tokenStore');
            if(token){
                const response  = await axios.post(`/user/removeSave/${saveId}`, null, {
                    headers:{Authorization:token}
                });
                console.log(response)
                if(response.data.saves){
                    SetSaves(response.data.saves);
                }
            }
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        const checkSaves = async ()=>{
            try{

                if(window.innerWidth <= 500){
                    setDisplayOption("cards")
                }

                const token = localStorage.getItem('tokenStore');
                if(token){
                    const response  = await axios.get('/user/getSaves', {
                        headers:{Authorization:token}
                    });
                    if(response.data.saveService){
                        SetSaves(response.data.saveService);
                    }
                }
            }
            catch(error){
                console.log(error);
            }
        }
        checkSaves();
    }, [saves, SetSaves])

  return (
    <>
    <h1 className='text-center mb-0 belleza'> SAVES </h1>
    <div className='flex-align-xy fl-column px-2'>
        <form className='fl-row flex-align-xy w-100 mt-2 mb-0'>
            <input type="text" className='w-50'/>
            <select id="services" className='w-20'>
                <option value="Shortlets">Shortlets</option>
                <option value="Ride Service">Ride Service</option>
                <option value="Resturants">Resturants</option>
                <option value="Events">Events</option>
                <option value="Others">Others</option>
            </select>
            <button className="button button-dark"> Search </button>
        </form>
    </div>
:
    <div className='text-right mr-4 pr-4'>
    <p className='mt-0'> Showing Results:  </p>
    <span className='mr-1 cursor-point' onClick={detailsList}><FaThList /> </span>
     <span className='cursor-point' onClick={cardList}><BsBoxFill /> </span>
    </div>

    {
        displayOption === "details"?
        <div className='row fl-column pt-1 px-4'>
        {
            saves.map((save, index)=>{
                return (
                        <div key={index} className="col-10 details px-0">
                        <img alt='service' src={`/ServiceImage/${save.images[0]}`} className="details-img mx-1"/>
                            <div className="details-left m-items-0 p-items-0 pr-1">
                                <p><span className='bold'>Name: </span> {save.name}</p>
                                <p><span className='bold'>Category: </span> {save.category}</p>
                                <p><span className='bold'>Description: </span> {save.description} </p>
                                <p><span className='bold'>Price: </span> {save.price} </p>
                            </div>
                            <div className="details-right pr-1">
                                <span className='p-0 m-0 p-items-0 m-items-0'>
                                <svg className='cursor-point text-right' onClick={e=>RemoveSaved(e, save._id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"/></svg> 
                                </span>
                                <a href={`/services/${save._id}`} className='mt-2 mb-0 text-center button button-o-dark'>View More</a>
                            </div>
                        </div>
                )
            })
        }
        </div>

        :
        <div className='row pt-3 px-4 space-btw'>
        {
            saves.map((save, index)=>{
                return (
                    <div key={index} className='col-lg-3 col-sm-5 col-xs-10'>
                        <div className="card">
                            <p className='p-0 m-0 card-intro-info'>
                                <span className='medium tag-green'> Category: <span className='bold'>{save.category}</span></span>
                                <svg className='m-0 p-0 cursor-point text-right' onClick={e=>RemoveSaved(e, save._id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"/></svg> 
                            </p>
                            <div className='text-center'>
                            {saves.images? <img alt="service Banner" src={`/ServiceImage/${save.images[0]}`} className="mt-1 w-max-100"/>
                            : ""}
                            </div>
                            <div className="card-title"> <span className='bold'>Name: </span> {save.name} </div>
                            <div className="card-body">
                                <p><span className='bold'>Description: </span> {save.description} </p>
                                <p><span className='bold'>Price: </span> ₦ {save.price} </p>
                            </div>
                            <div className="card-footer text-center row"> 
                            <a href={`/services/${save._id}`} className='text-center mb-0 col button button-o-dark'>View More</a> 
                            </div>
                        </div>
                    </div> 
                )
            })
        }
        </div>

    }


    </>
  )
}
