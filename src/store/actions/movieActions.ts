import {
    FETCH_MOVIE_DETAIL,
    FETCH_MOVIES,
    FETCH_MOVIES_SUCCESS,
    FetchMovieDetail,
    FetchMoviesAction,
    FetchMoviesFailure,
    FetchMoviesSuccess,
    IMovie
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

export function fetchMovieDetail(movie: IMovie): FetchMovieDetail {
    return {
        type: FETCH_MOVIE_DETAIL,
        payload: movie
    }
}