import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constants";
import { addUpcomingMovies } from "../utils/movieSlice";

const useFetchUpcomingMovie = () => {
  const upcomingMovie = useSelector((store) => store.movie.upcoming);

  const dispatch = useDispatch();

  const fetchUpcomingMovie = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    );
    const upcomingMovie = await response.json();
    dispatch(addUpcomingMovies(upcomingMovie));
  };

  useEffect(() => {
    if (!upcomingMovie) {
      fetchUpcomingMovie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useFetchUpcomingMovie;
