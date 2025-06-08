import React, { useState } from "react";
import useFetchMovieDetails from "../hooks/useFetchMovieDetails";
import { useSelector } from "react-redux";
import { IMG_URL } from "../utils/constants";
import { FaPlay } from "react-icons/fa";
import MovieCast from "./MovieCast";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import useFetchNowPlayingMovieTeaser from "../hooks/useFetchNowPlayingMovieTeaser";
import { IoMdStar } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const Details = ({ id }) => {
  useFetchNowPlayingMovieTeaser(id);

  const movieTeaserData = useSelector(
    (store) => store.nowPlayingMovieData.trailerData
  );

  const movieTeaserId = movieTeaserData?.key;

  const [playTrailer, setPlayTrailer] = useState(false);

  useFetchMovieDetails(id);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const handlePlayTrailer = () => {
    setPlayTrailer(true);
    setIsVideoLoading(true);
  };


  const handleCloseTrailer = () => {
    setPlayTrailer(false);
    setIsVideoReady(false);
  };
  const movieIdDetails = useSelector((store) => store.movie.movieDetailsFromId);


  const castDetails = useSelector(
    (store) => store.movie.movieCastDetailsFromId
  );
  const moviePosterId = movieIdDetails?.poster_path;
  const movieName = movieIdDetails?.title;
  const movieRating = movieIdDetails?.vote_average?.toFixed(1);


  const adultMovie = movieIdDetails?.adult;
  const releaseDate = movieIdDetails?.release_date
    .split("-")
    .reverse()
    .join("/");
  const genres = movieIdDetails?.genres.map((genres) => genres.name).join(", ");
  const runtime = movieIdDetails?.runtime;
  const tagLine = movieIdDetails?.tagline;
  const overView = movieIdDetails?.overview;
  const director = castDetails?.crew?.filter(
    (crew) => crew.known_for_department === "Directing"
  );
  const producer = castDetails?.crew?.filter(
    (crew) => crew.known_for_department === "Production"
  );
  const crew = castDetails?.crew?.filter(
    (crew) => crew.known_for_department === "Crew"
  );
  const writer = castDetails?.crew?.filter(
    (crew) => crew.known_for_department === "Writing"
  );
  const acting = castDetails?.crew?.filter(
    (crew) => crew.known_for_department === "Acting"
  );
  const sound = castDetails?.crew?.filter(
    (crew) => crew.known_for_department === "Sound"
  );

  const [slider, setSliderValue] = useState(false);

  const slideImageLeft = () => {
    const slider = document.getElementById("castSlider");
    if (slider) {
      slider.scrollLeft -= 1200;
    }
  };
  const slideImageRight = () => {
    const slider = document.getElementById("castSlider");

    if (slider) {
      slider.scrollLeft += 1200;
    }
  };

  return (
    <>
      <div
        className={`relative  ${playTrailer ? "filter grayscale pointer-events-none" : ""
          } `}
      >

        {!movieIdDetails && <div></div>}
        {movieIdDetails && (
          <div className="flex -z-10 w-full py-10 px-12 mt-16 backdrop-blur-md bg-white/5 gap-6 shadow-2xl ">
            {moviePosterId && (
              <div className="hidden lg:flex w-3/12 hover:scale-105 ease-in-out duration-300">
                <img
                  src={IMG_URL + moviePosterId}
                  className="rounded-lg object-cover"
                  alt="movieposter"
                />
              </div>
            )}
            <div className="w-full lg:w-9/12">
              <div className="flex  items-center gap-10 ">
                <div className="inline  ">
                  {movieName && (
                    <div className="mb-1.5">
                      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#000] ">
                        {movieName}
                      </h1>
                    </div>
                  )}

                  <div className="flex gap-4 text-md font-medium text-[#000] mb-3">
                    <div className=" flex  shrink-0 border-[0.5px] rounded-md  items-center justify-center border-[#333] px-1    ">
                      <p className="text-slate-700 font-medium">
                        {adultMovie ? "PG -18" : "PG -13"}
                      </p>
                    </div>

                    {releaseDate && (
                      <div className="hidden md:inline-flex items-center justify-center">
                        <p className="">{releaseDate}</p>
                      </div>
                    )}
                    {genres && (
                      <div className="hidden  shrink-0 md:flex items-center justify-center gap-2">
                        <p className=" ">• {genres} •</p>
                      </div>
                    )}
                    {runtime && (
                      <div className="flex  shrink-0 items-center justify-center">
                        <p className="">
                          {parseInt(runtime / 60)}h {runtime % 60}m
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {movieRating > 0 && <div className="w-[80px] shadow-xl text-lg font-bold px-4 py-2 bg-gradient-to-r from-slate-300  rounded-md">


                  <div className="flex    text-orange-600">


                    <div>  <p>{movieRating}  </p></div>
                    <div><IoMdStar /></div>
                  </div>

                  <div className="flex item-center  ">
                    <div className="border-b-[0.1px] border-dotted border-[#7e808c]  w-16 "></div></div>

                  <div className="flex  items-center text-2xl text-orange-600 "><p>10</p></div>

                </div>}
              </div>

              <div className=" w-full flex my-3 sm:gap-6  md:gap-14 items-center  ">
                {tagLine && (
                  <div className=" hidden sm:flex max-w-[60%]">
                    <p className="text-slate-700 font-lg font-medium">
                      {tagLine}
                    </p>
                  </div>
                )}
                <motion.div
                  onClick={handlePlayTrailer}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md">
                    <FaPlay />
                    Play Trailer
                  </button>
                </motion.div>
              </div>

              {overView && (
                <div className="mb-10">
                  <p className="text-xl font-bold text-[#000] mb-3">Overview</p>
                  <p className="text-justify font-medium">{overView}</p>
                </div>
              )}

              <div className="w-full ">
                <div className="flex w-full mb-4">
                  {director && director.length > 0 && (
                    <div className="flex-col w-4/12">
                      <p className="text-[#000] font-bold text-md">
                        {director[0].name}
                      </p>

                      <p>Director, Story</p>
                    </div>
                  )}
                  {producer && producer.length > 0 && (
                    <div className="flex-col w-4/12">
                      <p className="text-[#000] font-bold text-md">
                        {producer[0].name}
                      </p>

                      <p>Screenplay, Story</p>
                    </div>
                  )}
                  {sound && sound.length > 0 && (
                    <div className="flex-col w-4/12">
                      <p className="text-[#000] font-bold text-md">
                        {sound[0].name}
                      </p>

                      <p>Sound</p>
                    </div>
                  )}
                </div>
                <div className="flex w-full">
                  {writer && writer.length > 0 && (
                    <div className="flex-col w-4/12">
                      <p className="text-[#000] font-bold text-md">
                        {writer[0].name}
                      </p>

                      <p>Writer</p>
                    </div>
                  )}
                  {crew && crew.length > 0 && (
                    <div className="flex-col w-4/12">
                      <p className="text-[#000] font-bold text-md">
                        {crew[0].name}
                      </p>

                      <p>Crew</p>
                    </div>
                  )}
                  {acting && acting.length > 0 && (
                    <div className="flex-col w-4/12">
                      <p className="text-[#000] font-bold text-md">
                        {acting[0].name}
                      </p>

                      <p>Acting</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {castDetails?.cast && castDetails?.cast?.length > 0 && (
          <div className=" px-12 mt-5">
            <div className="mb-6">
              <p className="text-black font-bold text-2xl">Top Billed Cast</p>
            </div>
          </div>
        )}

        <div
          className="relative  "
          onMouseOver={() => setSliderValue(true)}
          onMouseOut={() => setSliderValue(false)}
        >
          {slider && (
            <div
              className=" realtive  hover:cursor-pointer"
              onClick={slideImageLeft}
            >
              <MdChevronLeft
                className="absolute  hover:bg-white rounded-full z-20 top-20 left-12 "
                size={55}
                color="black"
              />
            </div>
          )}

          <div
            id="castSlider"
            className=" scrollbar-hide mb-4 overflow-x-scroll flex pl-12 scroll-smooth"
          >
            {castDetails?.cast &&
              castDetails?.cast?.length > 0 &&
              castDetails.cast.map(
                (it) =>
                  it.profile_path && (
                    <MovieCast
                      key={it.profile_path}
                      profilePath={it.profile_path}
                      name={it.name}
                      character={it.character}
                    />
                  )
              )}
          </div>

          {slider && (
            <div
              className=" realtive hover:cursor-pointer"
              onClick={slideImageRight}
            >
              <MdChevronRight
                className="absolute   hover:bg-white z-20 top-20   rounded-full right-2"
                size={55}
                color="black"
              />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {playTrailer && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-full max-w-4xl relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="absolute right-0 lg:-top-5 lg:-right-16 z-10 group">
                <motion.button
                  onClick={handleCloseTrailer}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white text-6xl focus:outline-none"
                  aria-label="Close trailer"
                >
                  <IoClose />
                </motion.button>


              </div>

              <div className="aspect-video bg-black flex items-center justify-center">
                {(isVideoLoading || !isVideoReady) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white text-center absolute"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="text-4xl mb-2"
                    >
                      <FaSpinner />
                    </motion.div>
                    <p>Loading trailer...</p>
                  </motion.div>
                )}

                {movieTeaserId && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVideoReady ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${movieTeaserId}?autoplay=1`}
                      title="Trailer"
                      onLoad={() => {
                        setIsVideoLoading(false);
                        setIsVideoReady(true);
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </motion.div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Details;
