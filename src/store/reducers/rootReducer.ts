import {combineReducers} from "redux";
import counterReducer from "./counterReducer";
import authReducer from "./authReducer";
import {movieReducer} from "./movieReducer";
import {loadingReducer} from "./loadingReducer";
import {genreReducer} from "./genreReducers";



export const rootReducer = combineReducers({
    loading:loadingReducer,
    counter: counterReducer,
    isLogged: authReducer,
    movies:movieReducer,
    genre:genreReducer
});

export type RootState = ReturnType<typeof rootReducer>;