import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaThList } from "react-icons/fa";
import { BsBoxFill } from "react-icons/bs";


export default function Search() {

    const [displayOption, setDisplayOption] = useState('details')
    const [services, SetServices] = useState([])
    const [saves, SetSaves] = useState([])
    const {category, nn} = useParams()
    const [filter, SetFilter] = useState({'category': category, 'name': nn})

    const arrangeFilters = e =>{
        const {name, value} = e.target;
        if(value){
            SetFilter({...filter, [name]:value});
        }
    }

    const cardList = ()=>{
        setDisplayOption("cards")
    }

    const detailsList = ()=>{
        setDisplayOption("details")
    }

    const hideFilters = e=>{
        e.preventDefault();
        document.getElementById("filterList").classList.toggle("d-none");
    }

    const checkSave = (saveId)=>{
        if(saves.find(s=> s._id === saveId) === undefined){
            return true
        }
        else{
            return false
        };
    }

    const AddSave = async (e, saveId) =>{
        try{
            if(saves.find(s=> s._id === saveId) === undefined){ 
                const token = localStorage.getItem('tokenStore');
                if(token){
                    const response  = await axios.post(`/user/editSaves/${saveId}`, null ,{
                        headers:{Authorization:token}
                    });
                    if(response.data.saves){
                        SetSaves(response.data.saves)
                    }
                }  
            }
            else{
                const token = localStorage.getItem('tokenStore');
                if(token){
                    const response  = await axios.post(`/user/removeSave/${saveId}`, null ,{
                        headers:{Authorization:token}
                    });
                    if(response.data.saves){
                        SetSaves(response.data.saves)
                    }
                }
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const SearchServices = async e =>{
        e.preventDefault()
        try{
            const response  = await axios.post('/service/', {filter: filter});
            if(response.data.services){
                SetServices(response.data.services);
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        const checkServices = async ()=>{
            try{

                if(window.innerWidth <= 500){
                    setDisplayOption("cards")
                }

                if(filter){
                    const response  = await axios.post('/service/', {filter: filter});
                    if(response.data.services){
                        SetServices(response.data.services);
                    }
                }
                else{
                    const response  = await axios.get('/service/');
                    if(response.data.services){
                        SetServices(response.data.services);
                    }
                }
                const token = localStorage.getItem('tokenStore');
                if(token){
                    const res  = await axios.get('/user/getSaves', {
                        headers:{Authorization:token}
                    });
                    if(res.data.saveService){
                        SetSaves(res.data.saveService);
                    }
                }
            }
            catch(error){
                console.log(error);
            }
        }
        checkServices();
    }, [saves, services, filter])

  return (
    <>
    <div className='flex-align-xy fl-column px-2'>
        <form className='fl-row flex-align-xy w-100 mt-2 mb-0'>
            <button onClick={hideFilters} className="button button-o-grey bold"> Show Filters </button>
            <input name='name' onChange={arrangeFilters} type="text" className='w-50'/>
            <select name="category" onChange={arrangeFilters} className='w-20'>
                <option >All</option>
                <option value="Shortlets">Shortlets</option>
                <option value="Ride Service">Ride Service</option>
                <option value="Resturants">Resturants</option>
                <option value="Events">Events</option>
                <option value="Others">Others</option>
            </select>
            <button onClick={SearchServices} className="button button-dark"> Search </button>
        </form>
        <form id="filterList" className='d-none fl-row flex-align-xy mt-0 width-100'>
            <select onChange={arrangeFilters} name="location" className='w-20'>
                <option value="">Location</option>
                <option value="Lagos Island">Lagos Island</option>
                <option value="Mainland">Mainland</option>
                <option value="Outside Lagos">Outside Lagos</option>
            </select>
            <select id="cars" className='w-20'>
                <option value="">Cost</option>
                <option value="saab">₦</option>
                <option value="fiat">₦₦</option>
                <option value="audi">₦₦₦</option>
            </select>
            <select id="cars" className='w-20'>
                <option value="">Rating</option>
                <option value="5Star">★★★★★</option>
                <option value="4Star">★★★★</option>
                <option value="3Star">★★★</option>
                <option value="2Star">★★</option>
                <option value="1Star">★</option>
            </select>
            <select name="isAvailable" onChange={arrangeFilters} className='w-20'>
                <option>Availability</option>
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
            </select>        
        </form>
    </div>

    <div className='text-right mt-2 mr-4 pr-1'>
    <p className='mt-0' id='sizeIndicator'> Showing 11 / 11 Results:  </p>
    <span className='mr-1 cursor-point' onClick={detailsList}><FaThList /> </span>
     <span className='cursor-point' onClick={cardList}><BsBoxFill /> </span>
    </div>

    {
        displayOption === "details"?
        <div className='row fl-column pt-1 px-4'>
        {
            services.map((service, index)=>{
                return (
                    <div key={index} className="col-10 details px-0">
                        <img alt='service' src={`/ServiceImage/${service.images[0]}`} className="details-img mx-1"/>
                        <div className="details-left m-items-0 p-items-0 pr-1">
                            <p><span className='bold'>Name: </span> {service.name}</p>
                            <p><span className='bold'>Category: </span> {service.category}</p>
                            <p><span className='bold'>Description: </span> {service.description}</p>
                            <p><span className='bold'>Price: </span> ₦ {service.price}</p>
                        </div>
                        <div className="details-right pr-1">
                            {/* <button onClick={e=>Reserve(e, service._id)} className=' text-center button button-o-green bold'>Reserve</button> */}
                            <span  className='p-0 m-0 p-items-0 m-items-0'>
                                {checkSave(service._id)? 
                                <svg className='cursor-point' onClick={e=>AddSave(e, service._id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"/></svg> 
                                : <svg className='cursor-point' onClick={e=>AddSave(e, service._id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"/></svg>
                                }
                            </span>
                            <a href={`/services/${service._id}`} className='text-center mb-0 mt-2 button button-o-dark'>View More</a>
                        </div>
                    </div>
                )
            })
        }


        </div>
        :
        <div className='row pt-3 px-4 flex-align-xy'>
        {
            services.map((service, index)=>{
                return(
                    <div key={index} className='col-lg-3 col-sm-5 col-xs-10'>
                        <div className="card">
                            <p className='p-0 m-0 card-intro-info '>
                            <span className='medium tag-green'> Category: <span className='bold'>{service.category}</span></span>
                                {checkSave(service._id)? 
                                <svg className='cursor-point p-0 m-0' onClick={e=>AddSave(e, service._id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"/></svg> 
                                : <svg className='cursor-point p-0 m-0' onClick={e=>AddSave(e, service._id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"/></svg>
                                }
                            </p>
                            <div className='text-center'>
                            <img alt='service Banner' src={`/ServiceImage/${service.images[0]}`} className="mt-1 w-max-100 h-max-50"/>
                            </div>
                            <div className="card-title"> <span className='bold'>Name: </span> {service.name} </div>
                            <div className="card-body">
                                <p><span className='bold'>Description: </span> {service.description}</p>
                                <p><span className='bold'>Price: </span> ₦ {service.price}</p>
                            </div>
                            <div className="card-footer text-center py-1 row"> 
                            <a href={`/services/${service._id}`} className='col my-0 text-center button button-o-dark'>View More</a>
                            </div>
                            </div>
                    </div>  
                )
            })
        }

        </div>
    }

            
    <div className='text-center mt-2'>
        <span className='button p-1 belleza border-round border-grey'>1</span>
    </div>

    </>
  )
}
