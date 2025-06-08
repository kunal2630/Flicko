// import React from "react";
import Header from "./Header";
import HomepageMainComponent from "./HomepageMainComponent";
import useFetchTrendingMovie from "../hooks/useFetchTrendingMovie";
import useFetchTopRatedMovie from "../hooks/useFetchTopRatedMovie";
import useFetchUpcomingMovie from "../hooks/useFetchUpcomingMovie";
import HomepageSecondaryComponent from "./HomepageSecondaryComponent";
import { useSelector } from "react-redux";
import GptSearch from "./GptSearch";
import Details from "./Details";

const Browse = () => {
  useFetchTrendingMovie();
  useFetchTopRatedMovie();
  useFetchUpcomingMovie();

  const searchValue = useSelector((store) => store?.search?.searchValue);
  const movieId = useSelector((store) => store.movie.movieId);

  return (
    <>
      <Header />

      {searchValue && !movieId && <GptSearch />}
      {movieId && <Details id={movieId} />}
      {!movieId && !searchValue && (
        <>
          <HomepageMainComponent />
          <HomepageSecondaryComponent />
        </>
      )}
    </>
  );
};

export default Browse;
