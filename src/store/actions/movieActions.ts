import {IMovie} from "../../types/movie-types";

export const fetchMovies = () => {
    return {
        type: "FETCH_MOVIES"
    }
}

export const fetchMoviesSuccess = (movies: IMovie[]) => {
    return {
        type: "FETCH_MOVIES_SUCCESS",
        payload: movies
    }
}

export const fetchMoviesFailure = (error: string) => {
    return {
        type: "FETCH_MOVIES_FAILURE",
        payload: error
    }
}