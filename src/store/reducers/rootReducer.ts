import {combineReducers} from "redux";
import counterReducer from "./counterReducer";
import authReducer from "./authReducer";
import {movieReducer} from "./movieReducer";



export const rootReducer = combineReducers({
    counter: counterReducer,
    isLogged: authReducer,
    movies:movieReducer,
});

export type RootState = ReturnType<typeof rootReducer>;