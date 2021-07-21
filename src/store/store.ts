import { configureStore } from '@reduxjs/toolkit'
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducers/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {loadStorageState, saveStorageState} from "../services/mockStorage";
import {loadingReducer} from "./reducers/loadingReducer";
import {movieReducer} from "./reducers/movieReducer";
import {genreReducer} from "./reducers/genreReducers";


// export const store = createStore(
//     rootReducer,
//     loadStorageState(),
//     composeWithDevTools(applyMiddleware(thunk)),
// );

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
