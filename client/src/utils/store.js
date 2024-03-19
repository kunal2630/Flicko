import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import nowPlayingMovieReducer from "./nowPlayingMovieSlice";
import movieReducer from "./movieSlice";
import searchReducer from "./searchSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
	user: userReducer,
	nowPlayingMovieData: nowPlayingMovieReducer,
	movie: movieReducer,
	search: searchReducer,
});

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const appstore = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default appstore;
export const persistor = persistStore(appstore);
