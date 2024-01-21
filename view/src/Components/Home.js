import React, {useState} from 'react'
import Nav from './Nav'

export default function Home() {
    const [category, SetCategory] = useState('')
    const [name, setName] = useState('')
    
  return (
    <>
        <div className='home-bgd'> 
            <Nav />
            <div className="full-hero">
                <p className="hero-header belleza_font">HOLIDAY RESERVATIONS MADE EASY</p>
                <div className='mt-1'>
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
            </div>
            
            <div className='my-4 mx-2 px-1 py-4 row flex-align-xy medium c-light'>
                <div className='col-lg-3 col-md-6 col-sm-8 home-text-box mb-3'>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_5_50)">
                <path d="M60 10C50.111 10 40.444 12.9324 32.2215 18.4265C23.9991 23.9206 17.5904 31.7295 13.806 40.8658C10.0217 50.0021 9.0315 60.0555 10.9608 69.7545C12.89 79.4536 17.6521 88.3627 24.6447 95.3553C31.6373 102.348 40.5465 107.11 50.2455 109.039C59.9446 110.969 69.9979 109.978 79.1342 106.194C88.2705 102.41 96.0794 96.001 101.573 87.7785C107.068 79.5561 110 69.8891 110 60C110 53.4339 108.707 46.9321 106.194 40.8658C103.681 34.7995 99.9983 29.2876 95.3554 24.6447C90.7124 20.0017 85.2005 16.3188 79.1342 13.806C73.0679 11.2933 66.5661 10 60 10ZM90 59C90.0778 59.8641 89.9042 60.7323 89.5 61.5L79 86C78.4524 87.249 77.5367 88.3012 76.3753 89.016C75.2138 89.7308 73.8618 90.074 72.5 90H45C42.3479 90 39.8043 88.9464 37.929 87.0711C36.0536 85.1957 35 82.6522 35 80V55C34.9501 54.0713 35.1031 53.1429 35.4485 52.2794C35.7939 51.4159 36.3234 50.6381 37 50L60 25L63.45 28.45C64.3584 29.3958 64.8916 30.6399 64.95 31.95V32.95L62.05 50H85C86.3261 50 87.5979 50.5268 88.5356 51.4645C89.4732 52.4021 90 53.6739 90 55V59Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_5_50">
                <rect width="120" height="120" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                <p className='light'>Find the best deals for your holiday activities</p>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-8 home-text-box mb-3'>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_5_49)">
                <path d="M84.2105 13.0909H80V4.36365H71.5789V13.0909H29.4737V4.36365H21.0526V13.0909H16.8421C12.2105 13.0909 8.42105 17.0182 8.42105 21.8182V91.6364C8.42105 96.4364 12.2105 100.364 16.8421 100.364H84.2105C88.8421 100.364 92.6316 96.4364 92.6316 91.6364V21.8182C92.6316 17.0182 88.8421 13.0909 84.2105 13.0909ZM84.2105 91.6364H16.8421V34.9091H84.2105V91.6364Z" fill="white"/>
                </g>
                <g clip-path="url(#clip1_5_49)">
                <path d="M104.211 51.2727H91.0105C89.6842 47.4763 86.2105 44.7272 82.1053 44.7272C78 44.7272 74.5263 47.4763 73.2 51.2727H60C56.5263 51.2727 53.6842 54.2181 53.6842 57.8181V103.636C53.6842 107.236 56.5263 110.182 60 110.182H104.211C107.684 110.182 110.526 107.236 110.526 103.636V57.8181C110.526 54.2181 107.684 51.2727 104.211 51.2727ZM82.1053 51.2727C83.8421 51.2727 85.2632 52.7454 85.2632 54.5454C85.2632 56.3454 83.8421 57.8181 82.1053 57.8181C80.3684 57.8181 78.9474 56.3454 78.9474 54.5454C78.9474 52.7454 80.3684 51.2727 82.1053 51.2727ZM88.4211 97.0909H66.3158V90.5454H88.4211V97.0909ZM97.8947 84H66.3158V77.4545H97.8947V84ZM97.8947 70.9091H66.3158V64.3636H97.8947V70.9091Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_5_49">
                <rect width="101.053" height="104.727" fill="white"/>
                </clipPath>
                <clipPath id="clip1_5_49">
                <rect width="75.7895" height="78.5455" fill="white" transform="translate(44.2105 41.4545)"/>
                </clipPath>
                </defs>
                </svg>
                <p className='light'>Plan all your activities with ease</p>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-8 home-text-box mb-3'>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_5_27)">
                <path d="M81.95 45H38.05C35.9 45 34 46.4 33.3 48.4L25 73.4V107.45C25 108.9 26.15 110 27.5 110H32.5C33.9 110 35 108.9 35 107.5V100H85V107.5C85 108.9 86.1 110 87.5 110H92.5C93.9 110 95 108.9 95 107.5V73.45L86.7 48.45C86 46.4 84.1 45 81.95 45ZM38.9 90C35.5 90 32.8 87.3 32.8 83.9C32.8 80.5 35.5 77.8 38.9 77.8C42.3 77.8 45 80.55 45 83.9C45 87.25 42.3 90 38.9 90ZM81.1 90C77.75 90 75 87.3 75 83.9C75 80.5 77.7 77.8 81.1 77.8C84.5 77.8 87.2 80.5 87.2 83.9C87.2 87.3 84.5 90 81.1 90ZM31.45 70L38.1 50H82L88.65 70H31.45Z" fill="white"/>
                <path d="M54.15 15C52.05 9.15 46.5 5 40 5C31.7 5 25 11.7 25 20C25 28.25 31.7 35 40 35C46.5 35 52.05 30.8 54.15 25H80V35H90V25H95V15H54.15ZM40 25C37.25 25 35 22.75 35 20C35 17.25 37.25 15 40 15C42.75 15 45 17.25 45 20C45 22.75 42.75 25 40 25Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_5_27">
                <rect width="120" height="120" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                <p className='light'>Schedule a safe and secure driver for the holiday season</p>
                </div>
            </div>
        </div>
    </>
  )
}
