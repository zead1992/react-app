import {configureStore} from '@reduxjs/toolkit'
import {loadStorageState, saveStorageState} from "../services/mockStorage";
import {genreReducer} from "./reducers/genreReducers";
import moviesReducer from "../features/movies/moviesSlice"
import loadingReducer from "../features/loading/loadingSlice"
import {GenreState} from "./types/genreTypes";
import {MovieState} from "../features/movies/movieTypes";
import {LoadingState} from "../features/loading/loadingTypes";
import {actionListener} from "./store-middlware";

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
        genre:genreReducer
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

