import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchValue:false,
  },
  reducers: {
   updateSearchValue: (state) => {
      state.searchValue= !(state.searchValue);
    },
 

  },
});

export default searchSlice.reducer;
export const { updateSearchValue } = searchSlice.actions;
