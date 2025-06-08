import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
};
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addUser: (state, action) => {
			state.currentUser = action.payload;
		},
		removeUser: (state, action) => {
			state.currentUser = null;
		},
	},
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
