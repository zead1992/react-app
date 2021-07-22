import {configureStore} from '@reduxjs/toolkit'
import {saveStorageState} from "../services/mockStorage";
import {loadingReducer} from "./reducers/loadingReducer";
import {genreReducer} from "./reducers/genreReducers";
import movieReducer from "./reducers/movieReducer";



export const store = configureStore({
    reducer:{
        loading:loadingReducer,
        movies:movieReducer,
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
