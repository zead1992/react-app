import {RootState} from "../store/reducers/rootReducer";
import {genresInitState} from "../store/reducers/genreReducers";
import {moviesInitState} from "../store/reducers/movieReducer";
import {loadingInitState} from "../store/reducers/loadingReducer";

export const loadStorageState = () : RootState | undefined => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            const rootState : RootState = {
                genre:genresInitState,
                movies:moviesInitState,
                loading:loadingInitState
            };
            return rootState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveStorageState = (state : RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
    }
};