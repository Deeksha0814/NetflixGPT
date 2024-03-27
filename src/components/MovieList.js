import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title, movies}) => {
    // console.log(movies)
  return (
    <div className=''>
        <h1 className='text-white font-bold text-xl md:text-3xl pb-5 mt-5 pl-4'>{title}</h1>
      <div className='flex overflow-x-scroll hide-scroll-bar pl-4'>
        <div className='flex '>
            {movies?.map((movie)=><MovieCard key={movie?.id} posterPath={movie?.poster_path} />)}
        </div>
      </div>
    </div>
  )
}

export default MovieList


// <div className='flex overflow-x-scroll pl-4'>s