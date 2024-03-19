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

const Details = ({ id }) => {
  useFetchNowPlayingMovieTeaser(id);

  const movieTeaserData = useSelector(
    (store) => store.nowPlayingMovieData.trailerData
  );

  const movieTeaserId = movieTeaserData?.key;

  const [playTrailer, setPlayTrailer] = useState(false);

  useFetchMovieDetails(id);

  const movieIdDetails = useSelector((store) => store.movie.movieDetailsFromId);


  const castDetails = useSelector(
    (store) => store.movie.movieCastDetailsFromId
  );
  const moviePosterId = movieIdDetails?.poster_path;
  const movieName = movieIdDetails?.title;
  const movieRating=movieIdDetails?.vote_average?.toFixed(1);


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
        className={`relative  ${
          playTrailer ? "filter grayscale pointer-events-none" : ""
        } `}
      >
        
        {!movieIdDetails && <div></div>}
        {movieIdDetails && (
          <div className="flex -z-10 w-full py-10 px-12 mt-16 bg-slate-200 gap-6 shadow-2xl ">
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

                {movieRating>0 && <div className="w-[80px] shadow-xl text-lg font-bold px-4 py-2 bg-gradient-to-r from-slate-300  rounded-md">


                    <div className="flex    text-orange-600">

                      
                      <div>  <p>{movieRating}  </p></div>
                      <div><IoMdStar/></div>
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
                <div
                  className="outline-none mt-2 md:mt-0 "
                  onClick={() => {
                    setPlayTrailer(!playTrailer);
                  }}
                >
                  <button className="flex   outline-none  hover:bg-[#1414] py-1 px-2 text-md font-bold justify-center items-center  rounded-md gap-1">
                    <div className="flex">
                      <FaPlay />
                    </div>
                    <div>Play Trailer</div>
                  </button>
                </div>
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

        {castDetails?.cast && castDetails?.cast?.length > 0  && (
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
            className=" scrollbar-hide mb-12 overflow-x-scroll flex pl-12 scroll-smooth"
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

      {/* Play Trailer */}

      {playTrailer && (
        <div className="w-10/12  fixed top-0  left-[8%]  z-40  ">
          <div className="z-50 absolute bg-black top-0 w-full h-14 flex items-center justify-between px-4">
            <div>
              <p className="font-bold text-md sm:text-lg md:text-xl lg:text-2xl text-white">{movieName}</p>
            </div>
            <div
              className="absolut right-4 text-white hover:cursor-pointer"
              onClick={() => {
                setPlayTrailer(!playTrailer);
              }}
            >
              <IoClose size={35} />
            </div>
          </div>
          <div className="">
            <iframe
              className="w-[100%] h-[99vh]   "
              src={`https://www.youtube.com/embed/${movieTeaserId}?rel=0&controls=1`}
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
