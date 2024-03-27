import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const nowPlaying = useSelector((store) => store.movies?.nowPlayingMovies);
  const popular = useSelector((store) => store.movies?.popularMovies);
  const topRated = useSelector(store=>store.movies?.topRatedMovies);
  const upcoming = useSelector(store=>store.movies?.upcomingMovies);

  return (
    <div className="bg-black">
      <div className="relative z-10 -mt-5 md:-mt-64 md:pl-6">
        <MovieList title={"Now Playing"} movies={nowPlaying} />
        <MovieList title={"Top Rated"} movies={topRated} />
        <MovieList title={"Upcoming"} movies={upcoming} />
        <MovieList title={"Popular"} movies={popular} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
