import React from "react";
import { CREW_FACE_IMG_URL } from "../utils/constants";

const MovieCast = ({ profilePath, name, character }) => {
  return (
    profilePath &&
    name &&
    character && (
      <div className="rounded-xl  h-72 overscroll-y-none  shadow-2xl  mr-3 hover:scale-105 ease-in-out duration-300 mb-8">
        <div className="  w-[139px]  ">
          <img
            className="rounded-tl-lg rounded-tr-lg object-cover"
            src={CREW_FACE_IMG_URL + profilePath}
            alt=""
          />
        </div>
        <div className="px-2  max-w-[139px]">
          <p className="text-black text-base font-bold">{name}s</p>
        </div>
        <div className="px-2 max-w-[139px]">
          <p className="text-sm">{character}</p>
        </div>
      </div>
    )
  );
};

export default MovieCast;
