import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constants";
import { addTrendingMovies } from "../utils/movieSlice";

const useFetchTrendingMovie = () => {
  const trendingMovie = useSelector((store) => store.movie.trending);

  const dispatch = useDispatch();

  const fetchTrendingMovie = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );
    const trendingMovies = await response.json();
    dispatch(addTrendingMovies(trendingMovies));
  };

  useEffect(() => {
    //Doing Memoisation , that is only calling fetchTrendingMovie if trending movie data is not present in store

    if (!trendingMovie) {
      fetchTrendingMovie();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useFetchTrendingMovie;
