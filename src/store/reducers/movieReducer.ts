import {getMovie, getMovies} from "../../services/movieService";
import {fetchMovieDetail, fetchMovies, fetchMoviesFailure, fetchMoviesSuccess} from "../actions/movieActions";
import {AxiosError} from "axios";
import {
    FETCH_MOVIE_DETAIL,
    FETCH_MOVIES,
    FETCH_MOVIES_FAILURE,
    FETCH_MOVIES_SUCCESS,
    MovieActionTypes,
    MovieState
} from "../types/movieTypes";

const initState: MovieState = {
    list: {
        data: [],
        loading: false,
        error: ''
    },
    detail: {
        data: null,
        loading: false,
        error: '',
    }
}

export function movieReducer(state = initState, action: MovieActionTypes): MovieState {
    switch (action.type) {
        case FETCH_MOVIES:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true
                }
            };
        case FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data: action.payload,
                    error: ''
                }
            };
        case FETCH_MOVIES_FAILURE:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data: [],
                    error: action.error
                }

            };
        case FETCH_MOVIE_DETAIL:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    error: '',
                    data: action.payload
                }
            }
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

export function fetchMovieDetailAsync(id: string) {
    return async (dispatch) => {
        try {
            const result = await getMovie(id);
            dispatch(fetchMovieDetail(result.data));

        } catch (e) {
            const error = e as AxiosError;
        }
    }
}