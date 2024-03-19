import React, { useEffect, useState } from "react";
import useFetchNowPlayingMovieTeaser from "../hooks/useFetchNowPlayingMovieTeaser";
import useFetchNowPlayingMovieData from "../hooks/useFetchNowPlayingMovieData";
import { useSelector } from "react-redux";
const HomepageMainComponent = () => {
  useFetchNowPlayingMovieData();

  const nowPlayingMovieData = useSelector((store) => store.nowPlayingMovieData);

  const [movieInfo, setMovieInfo] = useState({
    id: null,
    title: "",
    description: "",
  });

  useEffect(() => {
    const results = nowPlayingMovieData?.nowPlayingMovie?.results;
    if (results && results.length > 0) {
      const { id, title, overview: description } = results[0];
      setMovieInfo({ id, title, description });
    }
  }, [nowPlayingMovieData]);

  useFetchNowPlayingMovieTeaser(movieInfo.id);

  const movieTeaserData = useSelector(
    (store) => store.nowPlayingMovieData.trailerData
  );

  const movieTeaserId = movieTeaserData?.key;

  return (
    <div className=" ">
      <div className="absolute w-1/2 top-[25%]  lg:top-[25%] xl:top-[35%]   left-7 lg:left-12 z-20 text-white brightness-200	 ">
        <p className="hidden sm:flex  text-3xl md:text-4xl font-extrabold  tracking-widest mb-4 ">
          {movieInfo.title}
        </p>
        <p className="hidden lg:flex text-sm lg:text-lg  font-mono  font-medium tracking-tighter   text-white">
          {movieInfo.description}
        </p>
        
      </div>
      <div className=" relative -mt-12 lg:-mt-[100px] ">
        <div className="">
          <iframe
            className="flex w-[100%] aspect-video  "
            src={`https://www.youtube.com/embed/${movieTeaserId}?playlist=${movieTeaserId}&loop=1&autoplay=1&mute=1&rel=0&controls=0`}
            title="YouTube video player"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default HomepageMainComponent;
