import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    trending: null,
    topRated: null,
    upcoming: null,
    movieId: null,
    movieDetailsFromId: null,
    movieCastDetailsFromId: null,
  },
  reducers: {
    addTrendingMovies: (state, action) => {
      state.trending = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRated = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcoming = action.payload;
    },
    addMovieId: (state, action) => {
      state.movieId = action.payload;
    },
    addMovieDetailsFromId: (state, action) => {
      state.movieDetailsFromId = action.payload;
    },
    addCastDetailsFromId: (state, action) => {
      state.movieCastDetailsFromId = action.payload;
    },
  },
});

export default movieSlice.reducer;
export const {
  addTrendingMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addMovieId,
  addMovieDetailsFromId,
  addCastDetailsFromId,
} = movieSlice.actions;
