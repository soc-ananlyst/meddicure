import React from 'react'
import hero_image from '../assets/banner-doctor.svg'

const Hero = () => {
  return (
    <div className='flex w-full gap-2 items-center justify-center bg-transparent lg:flex  max-sm:flex-col sm:w-full dark:bg-gray-800'>

        <div className='flex flex-col gap-6 bg-white p-6 shadow-lg rounded-2xl max-sm:absolute max-sm:bg-transparent sm:justify-center'>
            <p className='text-3xl font-bold text-slate-400 font-sans sm:text-xl max-sm:text-lg text-center'>Where Your Health Is Our priority</p>
            <p className='text-3xl text-slate-600 font-bold font-sans sm:text-xl max-sm:text-lg text-center'>Services That Expand Horizons</p>
             <p className='text-blue-600 font-medium font-stretch-80% font-sans sm:text-lg max-sm:text-md text-center'></p>
            <p className="typewriter text-blue-600 text-bold">Book your appointment today.</p>
        

           
            <div className='flex gap-5 lg:flex sm:flex-col sm:justify-center items-center max-sm:flex-col max-sm:justify-center'>
                <button className='max-w-[200px] text-sm font-semibold text-slate-600 shadow-[8px_8px_16px] cursor-pointer hover:bg-blue-700 px-6 py-2 rounded-full bg-blue-500 text-white'>Book Now</button>
                <button className='max-w-[200px] text-sm font-semibold text-slate-600 shadow-[8px_8px_16px] cursor-pointer hover:bg-blue-700 px-5 py-2 rounded-full bg-blue-500 text-white'>Learn More</button>
            
            </div>
            
        </div>

        <div className='hidden bg-white shadow p-4 rounded-lg '>
            <p className='font-light'>1000+ happy users</p>

        </div>

        <div className=' '> 
            <img src={hero_image} className='h-[80vh]' alt="" />
            
        </div>
          
    </div>
  )
}

export default Hero