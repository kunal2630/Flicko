import { createSlice } from "@reduxjs/toolkit";

const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState: {
    onAir:null,
    trending:null,
    topRated:null,
    
  },
  reducers: {
   
    addOnAirShows: (state, action) => {
        state.onAir= action.payload;
    },
    addTrendingShows: (state, action) => {
      state.trending= action.payload;
    },
    addTopRatedShows: (state, action) => {
        state.topRated= action.payload;
    },
 

  },
});

export default tvShowsSlice.reducer;
export const { addOnAirShows,addTrendingShows,addTopRatedShows } = tvShowsSlice.actions;
