import React from "react";
import Moviesection from "./Moviesection";
import { useSelector } from "react-redux";

const HomepageSecondaryComponent = () => {
  const trendingMovies = useSelector((store) => store.movie.trending);
  const topRatedMovies = useSelector((store) => store.movie.topRated);
  const upcomingMovies = useSelector((store) => store.movie.upcoming);
 
  const nowPlayingMovie = useSelector(
    (store) => store.nowPlayingMovieData.nowPlayingMovie
  );


  return (
    <div className="bg-[#141414] bg-gradient-to-b from-black via-[#141414] to-[#141414]  ">
      <div className="-mt-24  xl:-mt-44 z-10 ">

      <Moviesection
          sliderId="nowPlayingMoviesSlider"
          title="Now Playing"
          data={nowPlayingMovie}
        />

        <Moviesection
          sliderId="upcomingMoviesSlider"
          title="Upcoming "
          data={upcomingMovies}
        />

        <Moviesection
          sliderId="trendingSlider"
          title="Trending Movies "
          data={trendingMovies}
        />

        <Moviesection
          sliderId="topRatedMoviesSlider"
          title="Top Rated Movies"
          data={topRatedMovies}
        />
        
      </div>
    </div>
  );
};

export default HomepageSecondaryComponent;
