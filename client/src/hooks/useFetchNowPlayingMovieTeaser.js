import { useEffect } from "react";
import { options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerData } from "../utils/nowPlayingMovieSlice";

const useFetchNowPlayingMovieTeaser = (id) => {
  const dispatch = useDispatch();

  const fetchTrailerInfo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    );
    const data = await response.json();
    const filterData = await data?.results?.filter(
      (it) => it.type === "Trailer"
    );
    if (filterData?.length > 0) {
      dispatch(addTrailerData(filterData[0]));
    }
  };

  useEffect(() => {
    fetchTrailerInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
};

export default useFetchNowPlayingMovieTeaser;
