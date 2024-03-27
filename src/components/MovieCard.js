import React from 'react'
import {IMG_CDN_URL} from '../utils/constants'

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='w-32 h-40 md:w-44 md:h-52 md:pr-4 pb-4 m-1 md:transition-transform md:hover:scale-110 hover:cursor-pointer '>
      <img alt='Poster' src={IMG_CDN_URL + posterPath} />
    </div>
  )
}

export default MovieCard
