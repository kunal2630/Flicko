import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlayingMovie: null,
  trailerData: null,
  gptSuggestedMovies: null,
  gptSuggestedMoviesName: null,
};

const nowPlayingMovieSlice = createSlice({
  name: "nowPlayingMovieData",
  initialState,
  reducers: {
    addNowPlayingMovie(state, action) {
      state.nowPlayingMovie = action.payload;
    },
    addTrailerData(state, action) {
      state.trailerData = action.payload;
    },
    addGptSuggestedMovies(state, action) {
      state.gptSuggestedMovies = action.payload;
    },
    removeGptSuggestedMovies(state) {
      state.gptSuggestedMovies = null;
    },
    addGptSuggestedMoviesName(state, action) {
      state.gptSuggestedMoviesName = action.payload;
    },
    removeNowPlayingMovie(state) {
      state.nowPlayingMovie = null;
    },
  },
});

export const {
  addNowPlayingMovie,
  addTrailerData,
  addGptSuggestedMovies,
  removeGptSuggestedMovies,
  addGptSuggestedMoviesName,
  removeNowPlayingMovie,
} = nowPlayingMovieSlice.actions;
export default nowPlayingMovieSlice.reducer;
