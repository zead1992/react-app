import {combineReducers} from "redux";
import {movieReducer} from "./movieReducer";
import {loadingReducer} from "./loadingReducer";
import {genreReducer} from "./genreReducers";



export const rootReducer = combineReducers({
    loading:loadingReducer,
    movies:movieReducer,
    genre:genreReducer
});

export type RootState = ReturnType<typeof rootReducer>;