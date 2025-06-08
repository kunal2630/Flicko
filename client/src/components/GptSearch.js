import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import openai from "../utils/openAI";
import { BG_IMG_URL, options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addGptSuggestedMovies,
  addGptSuggestedMoviesName,
  removeGptSuggestedMovies,
} from "../utils/nowPlayingMovieSlice";
import Moviesection from "./Moviesection";

const GptSearch = () => {
  const [gptErrorState, setGptErrorState] = useState(false);
  const [searchingState, setSearchingState] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false);

  const searchValue = useRef(null);

  const gptSearchMovies = useSelector(
    (store) => store.nowPlayingMovieData.gptSuggestedMovies
  );
  const gptSearchMoviesName = useSelector(
    (store) => store.nowPlayingMovieData.gptSuggestedMoviesName
  );

  const dispatch = useDispatch();

  const fetchSearchMovie = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
      movie +
      "&include_adult=false&language=en-US&page=1",
      options
    );

    const fdata = data.json();

    return fdata;
  };

  const handleGptSearch = async () => {
    dispatch(removeGptSuggestedMovies());

    if (!searchValue?.current?.value) {
      setEmptySearch(true);
      return;
    }

    setSearchingState(true);

    const GptSearchQuery =
      "Act as a movie recommendation system and suggest some movies/webseries for the query" +
      searchValue?.current?.value +
      ".only give me names of 5 movies/webseries comma separatd like the example result given ahead .Example result : Gadar,Captain America: Civil War,Iron Man 3,Watchmen,Hacked ";

    const GptSearchResponse = await openai.chat.completions.create({
      messages: [{ role: "user", content: GptSearchQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!GptSearchResponse?.choices) {
      setGptErrorState(true);
    } else {
      setGptErrorState(false);
    }
    const GptResponseMovies = GptSearchResponse?.choices[0]?.message?.content;

    const GptResponseMoviesList = GptResponseMovies.split(",");

    dispatch(addGptSuggestedMoviesName(GptResponseMoviesList));

    const tmdbPromiseArray = GptResponseMoviesList.map((movie) => {
      return fetchSearchMovie(movie);
    });

    const movieList = await Promise.all(tmdbPromiseArray);

    setTimeout(() => {
      dispatch(addGptSuggestedMovies(movieList));
      setSearchingState(false);
    }, 1000);

    setEmptySearch(false);
  };

  return (
    <div className="">
      <div className=" fixed top-0  -z-10  ">
        <img
          src={BG_IMG_URL}
          className=" h-screen w-screen object-cover opacity-[0.93]"
          alt=""
        />
      </div>

      <div className="flex  justify-center mt-28  items-center  ">
        <div
          className="flex w-[70%] sm:w-[60%] md:w-[50%] lg:w-[40%] z-10  rounded-lg bg-black 
          text-white pl-2"
        >
          <div className=" w-10/12   p-3 ">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGptSearch();
                }
              }}
              type="text"
              ref={searchValue}
              name=""
              id=""
              className={`w-[100%]  bg-black outline-none text-lg font-semibold ${emptySearch ? "placeholder-red-600 " : "placeholder-slate-300 hover:placeholder-white"
                } `}
              placeholder={
                emptySearch
                  ? "Search Query cant be blank!"
                  : "Need movie ideas? Ask GPT for suggestions!"
              }
            />
          </div>

          <div
            className="flex w-2/12  p-2  items-center justify-center hover:cursor-pointer"
            onClick={handleGptSearch}
          >
            <FaSearch size={25} className="text-white rounded-md hover:opacity-70 " />
          </div>
        </div>
      </div>

      {gptErrorState && (
        <p className="text-red-600">
          No movies found Please Try Different Query
        </p>
      )}

      {searchingState && (
        <div
          className="absolute top-0  z-20   bg-black bg-opacity-80 text-lg md:text-xl
         text-white justify-center"
        >
          <div className="flex justify-center items-center h-screen w-[100vw] ">
            <h1>Crafting Personalized recommendation for you...</h1>
          </div>
        </div>
      )}

      {gptSearchMovies && (
        <div className=" bg-black  bg-opacity-70 mt-10 pt-10 ">
          {gptSearchMovies &&
            gptSearchMovies.map((movie, index) => (
              <Moviesection
                key={gptSearchMoviesName[index]}
                sliderId={gptSearchMoviesName[index]}
                title={gptSearchMoviesName[index]}
                data={movie}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default GptSearch;
