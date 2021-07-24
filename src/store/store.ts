import {configureStore} from '@reduxjs/toolkit'
import {loadStorageState, saveStorageState} from "../services/mockStorage";
import moviesReducer from "../features/movies/moviesSlice"
import loadingReducer from "../features/loading/loadingSlice"
import genresSlice from "../features/genres/genresSlice"
import {MovieState} from "../features/movies/movieTypes";
import {LoadingState} from "../features/loading/loadingTypes";
import {actionListener} from "./store-middlware";
import {GenreState} from "../features/genres/genreTypes";

//store state
export type RootState = {
    loading:LoadingState,
    genre:GenreState,
    movies:MovieState
}


//init storage
const storage = loadStorageState();

export const store = configureStore<RootState,any,any>({
    preloadedState:{...storage},
    reducer:{
        loading:loadingReducer,
        movies:moviesReducer,
        genre:genresSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(actionListener),
});

//set store state in storage
store.subscribe(() => {
    saveStorageState({
        ...store.getState()
    });
});

