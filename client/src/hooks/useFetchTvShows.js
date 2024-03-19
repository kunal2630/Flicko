import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constants";
import {
  addOnAirShows,
  addTrendingShows,
  addTopRatedShows,
} from "../utils/tvShowsSlice";
const useFetchTvShows = () => {
  const dispatch = useDispatch();
  const onAir = useSelector((store) => store.tvShows.onAir);
  const trending = useSelector((store) => store.tvShows.trending);
  const topRated = useSelector((store) => store.tvShows.topRated);

  const fetchOnAirTvShows = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
      options
    );
    const onAirShows = await response.json();
    dispatch(addOnAirShows(onAirShows));
  };

  useEffect(() => {
    if (!onAir) {
      fetchOnAirTvShows();
    }
  }, []);

  const fetchTrendingTvShows = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      options
    );
    const trendingShows = await response.json();
    dispatch(addTrendingShows(trendingShows));
  };

  useEffect(() => {
    if (!trending) {
      fetchTrendingTvShows();
    }
  }, []);

  const fetchTopRatedTvShows = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1'",
      options
    );
    const topRatedShows = await response.json();
    dispatch(addTopRatedShows(topRatedShows));
  };

  useEffect(() => {
    if (!topRated) {
      fetchTopRatedTvShows();
    }
  }, []);
};

export default useFetchTvShows;
