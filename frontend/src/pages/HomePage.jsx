import React, { useState } from 'react'
import Navbar from '../components/NavBar'
import RateLimitedUI from '../components/RateLimitedUI';


export const HomePage = () => {
  const [isRateLimited, setIsRateLimited]= useState(true);
  return (
    <div className='min-h-screen'>
      <Navbar/>
      {isRateLimited && <RateLimitedUI/>}
    </div>
  )
}


