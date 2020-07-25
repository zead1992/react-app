import {getMovies} from "../../services/movieService";
import {fetchMovies, fetchMoviesFailure, fetchMoviesSuccess} from "../actions/movieActions";
import {AxiosError} from "axios";
import {
    FETCH_MOVIES,
    FETCH_MOVIES_FAILURE,
    FETCH_MOVIES_SUCCESS,
    MovieActionTypes,
    MovieState
} from "../types/movieTypes";

const initState: MovieState = {
    movies: [],
    loading: false,
    error: ''
}

export function movieReducer  (state = initState, action : MovieActionTypes) : MovieState {
    switch (action.type) {
        case FETCH_MOVIES:
            return {
                ...state,
                loading: true
            };
        case FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                movies: action.payload,
                error: ''
            };
        case FETCH_MOVIES_FAILURE:
            return {
                ...state,
                loading: false,
                movies: [],
                error: action.error
            };
        default :
            return state
    }
}

export function fetchMoviesAsync() {
    return async (dispatch) => {
        try {
            dispatch(fetchMovies());
            let result;
            await setTimeout(async () => {
                result = await getMovies();
                dispatch(fetchMoviesSuccess(result.data));
            }, 1000);

        } catch (e) {
            const error = e as AxiosError;
            dispatch(fetchMoviesFailure(error.message));
        }

    }
}