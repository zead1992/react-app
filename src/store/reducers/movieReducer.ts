import {IMovie} from "../../types/movie-types";
import {getMovies} from "../../services/movieService";
import {fetchMovies, fetchMoviesFailure, fetchMoviesSuccess} from "../actions/movieActions";
import {AxiosError} from "axios";

const initState: { movies: IMovie[], loading: boolean, error: string } = {
    movies: [],
    loading: false,
    error: ''
}

export const movieReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_MOVIES":
            return {
                ...state,
                loading: true
            };
        case "FETCH_MOVIES_SUCCESS":
            return {
                ...state,
                loading: false,
                movies: action.payload,
                error: ''
            };
        case "FETCH_MOVIES_FAILURE":
            return {
                ...state,
                loading: false,
                movies: [],
                error: action.payload
            };
        default :
            return state
    }
}

export const fetchMoviesAsync = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchMovies());
            let result;
            await setTimeout(async () => {
                 result = await getMovies();
                dispatch(fetchMoviesSuccess(result.data));
            },4000);

        } catch (e) {
            const error = e as AxiosError;
            dispatch(fetchMoviesFailure(error.message));
        }

    }
}