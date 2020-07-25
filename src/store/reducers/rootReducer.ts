import {combineReducers} from "redux";
import counterReducer from "./counterReducer";
import authReducer from "./authReducer";
import {movieReducer} from "./movieReducer";
import {loadingReducer} from "./loadingReducer";



export const rootReducer = combineReducers({
    counter: counterReducer,
    isLogged: authReducer,
    movies:movieReducer,
    loading:loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;