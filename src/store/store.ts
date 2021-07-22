import {configureStore} from '@reduxjs/toolkit'
import {saveStorageState} from "../services/mockStorage";
import {loadingReducer} from "./reducers/loadingReducer";
import {genreReducer} from "./reducers/genreReducers";
import moviesReducer from "../features/movies/moviesSlice"



export const store = configureStore({
    reducer:{
        loading:loadingReducer,
        movies:moviesReducer,
        genre:genreReducer
    }
})

//set store state in storage
store.subscribe(() => {
    saveStorageState({
        ...store.getState()
    });
});

export type RootState = ReturnType<typeof store.getState>;
