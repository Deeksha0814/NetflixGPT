import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constants'
import {addGptMovieResult } from '../utils/gptSlice'

const GptSearchBar = () => {

  const dispatch = useDispatch();
  const langKey = useSelector(store => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async(movie) => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&page=1", API_OPTIONS);
    const json = await data.json();
    return json.results;
  }

  const handleGptSearchClick = async() => {
    // console.log(searchText.current.value)
    // Make an API call to GPT API and get movie results...

    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query : " +
    searchText.current.value +
    ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";


    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    
    // console.log(gptResults.choices);

    if(!gptResults.choices){
      //ERROR
    }

    // Result of (funny indian retro movies) =>   // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(", ");

    // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]
    // For each movie I will search TMDB API

    const promiseArray = gptMovies?.map(movie => searchMovieTMDB());
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(addGptMovieResult({movieNames: gptResults ,movieResults: tmdbResults}));

  }

  return (
    <div className='pt-[50%] md:pt-40 flex justify-center'>
      <form onSubmit={e=>e.preventDefault()} className='bg-white w-full md:w-1/2 md:h-12 md:flex md:justify-between'>
        <input ref={searchText} type='text' placeholder={lang[langKey].gptSearchPlaceholder} className='w-full md:w-3/4 p-2 md:p-3' />
        <button onClick={handleGptSearchClick} className='w-full md:w-1/4 bg-red-700 text-white text-center font-bold text-xl p-[6px] hover:bg-red-600'>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar;
