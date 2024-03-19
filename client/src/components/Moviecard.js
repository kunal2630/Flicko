import React from "react";
import { IMG_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieId } from "../utils/movieSlice";

const Moviecard = ({ posterId, id }) => {
  const dispatch = useDispatch();

  if (!posterId) return null;
  return (
    <div
      className="ml-2 hover:cursor-pointer relative  shadow-inner "
      onClick={() => {
        dispatch(addMovieId(id));

      }}
    >
      <img
        className="max-w-none w-[150px] lg:w-[180px] rounded-md hover:scale-110 ease-in-out duration-300"
        src={IMG_URL + posterId}
        alt=""
      />
    </div>
  );
};

export default Moviecard;
