import {genresInitState} from "../store/reducers/genreReducers";
import {loadingInitState} from "../store/reducers/loadingReducer";
import {RootState} from "../store/store";
import {moviesInitState} from "../features/movies/moviesSlice";

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