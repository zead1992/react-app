import {configureStore} from '@reduxjs/toolkit'
import {loadStorageState, saveStorageState} from "../services/mockStorage";
import {loadingReducer} from "./reducers/loadingReducer";
import {genreReducer} from "./reducers/genreReducers";
import moviesReducer from "../features/movies/moviesSlice"
import {LoadingState} from "./types/loadingTypes";
import {GenreState} from "./types/genreTypes";
import {MovieState} from "../features/movies/movieTypes";

//store state
export type RootState = {
    loading:LoadingState,
    genre:GenreState,
    movies:MovieState
}


//init storage
const storage = loadStorageState();

export const store = configureStore<RootState>({
    preloadedState:{...storage},
    reducer:{
        loading:loadingReducer,
        movies:moviesReducer,
        genre:genreReducer
    },
});

//set store state in storage
store.subscribe(() => {
    saveStorageState({
        ...store.getState()
    });
});

