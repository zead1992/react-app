import {combineReducers} from "redux";
import counterReducer from "./counter";
import isLoggedReducer from "./isLogged";



export const rootReducer = combineReducers({
    counter: counterReducer,
    isLogged: isLoggedReducer
});

export type RootState = ReturnType<typeof rootReducer>;