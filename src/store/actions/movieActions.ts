import {
    FETCH_MOVIES,
    FETCH_MOVIES_SUCCESS,
    FetchMoviesAction,
    FetchMoviesFailure,
    FetchMoviesSuccess, IMovie
} from "../types/movieTypes";

export function fetchMovies(): FetchMoviesAction {
    return {
        type: FETCH_MOVIES
    }
}

export function fetchMoviesSuccess(movies: IMovie[]): FetchMoviesSuccess {
    return {
        type: FETCH_MOVIES_SUCCESS,
        payload: movies
    }
}

export function fetchMoviesFailure(error: string): FetchMoviesFailure {
    return {
        type: "FETCH_MOVIES_FAILURE",
        error
    }
}