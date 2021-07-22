import {FETCH_GENRES, GenreActionTypes, GenreState} from "../types/genreTypes";
import {getGenres} from "../../services/genreService";
import {fetchGenres} from "../actions/genreActions";
import {updateLoadingState} from "../../features/loading/loadingSlice";


export function genreReducer(state: GenreState = null, action: GenreActionTypes): GenreState {
    switch (action.type) {
        case FETCH_GENRES:
            return {
                ...state,
                list: action.payload
            };
        default:
            return state;
    }
}

export function fetchGenresAsync() {
    return async (dispatch) => {
        try {
            dispatch(updateLoadingState({key: 'genreList', val: true}));
            const result = await getGenres();
            dispatch(fetchGenres(result));
            dispatch(updateLoadingState({key: 'genreList', val: false}));
        } catch (e) {
            dispatch(updateLoadingState({key: 'genreList', val: false}));
        }
    }
}