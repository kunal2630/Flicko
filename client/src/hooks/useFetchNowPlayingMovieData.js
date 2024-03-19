import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constants";
import { addNowPlayingMovie } from "../utils/nowPlayingMovieSlice";

const useFetchNowPlayingMovieData = () => {
  const nowPlayingMovie = useSelector(
    (store) => store.nowPlayingMovieData.nowPlayingMovie
  );
  const dispatch = useDispatch();

  const fetchNowPlayingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      options
    );
    const nowPlayingMovies = await response.json();
    dispatch(addNowPlayingMovie(nowPlayingMovies));
  };

  useEffect(() => {
    if (!nowPlayingMovie) {
      fetchNowPlayingMovies();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useFetchNowPlayingMovieData;
