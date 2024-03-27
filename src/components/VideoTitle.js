import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='pt-[140px] md:pt-[220px] md:px-20 absolute text-white w-screen aspect-video bg-gradient-to-r to from-black'>
      <h1 className='text-lg ml-5 md:ml-0 md:text-6xl md:font-bold'>{title}</h1>
      <p className='hidden md:inline-block py-10 w-1/3'>{overview}</p>
      <div>
        <button className='bg-white ml-5 md:ml-0 bg-opacity-85 md:font-bold text-black py-1 md:py-4 w-16 md:w-28 rounded-lg hover:bg-opacity-95 mr-2 md:mr-5'>Play</button>
        <button className='bg-gray-600 bg-opacity-40 md:font-bold text-white py-1 md:py-4 md:w-28 w-24 rounded-lg hover:bg-opacity-55 '>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
