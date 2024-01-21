import React, {useState} from 'react'

export default function Footer({style}) {

    const [category, SetCategory] = useState('')
    const [name, setName] = useState('')
  
  return (
    <div className={style}>
        <div className='row p-4'>
            <div className='col-lg-6 col-md-9 mb-3'>
                <h3 className='bold italic pb-0 mb-0'>Detty</h3>
                <p className='mt-0 mb-2'>@Copyright 2024</p>
                <input type="text" onChange={e=>setName(e.target.value)} name="fname" />
                 <select id="services" onChange={e=> SetCategory(e.target.value)} name="services">
                        <option>All</option>
                        <option value="Shortlets">Shortlets</option>
                        <option value="Ride Service">Ride Service</option>
                        <option value="Resturants">Resturants</option>
                        <option value="Events">Events</option>
                        <option value="Others">Others</option>
                  </select>
                <a href={`/search/${category}/${name}`} className="button button-dark"> Search </a>
            </div>
            <div className='col-lg-4 col-md-9'>
                <h3 className='bold italic'>Contact Us</h3>
                <p className='mb-0'>Phone Numbers: </p>
                <ul className='mt-0'>
                    <li>1234567-90</li>
                    <li>8642002-46</li>
                </ul>
                <p className='mb-0'>Email: </p>
                <ul className='mt-0'>
                    <li>dettyDecem@gmail.com</li>
                </ul>
                <p className='mb-0'>Office Address: </p>
                <ul className='mt-0'>
                    <li>No 7 French Firose, Maple Quarter, WestWood Hills.</li>
                </ul>
            </div>
        </div>
    </div>
  )
}
