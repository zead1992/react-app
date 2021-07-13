import {
    ADD_MOVIE,
    AddMovie,
    CreateMovie, DeleteMovie,
    FETCH_MOVIE_DETAIL,
    FETCH_MOVIES,
    FETCH_MOVIES_SUCCESS,
    FetchMovieDetail,
    FetchMoviesAction,
    FetchMoviesFailure,
    FetchMoviesSuccess,
    IMovie,
    TOGGLE_FAV,
    ToggleFav
} from "../types/movieTypes";
import {IGenre} from "../types/genreTypes";

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

export function addMovieAction(payload : CreateMovie,genres : IGenre[]): AddMovie {
    return {
        type: ADD_MOVIE,
        payload,
        genres
    }
}

export function toggleFav(movieId : string) : ToggleFav{
    return{
        type: TOGGLE_FAV,
        movieId
    }
}

export function deleteMovie(movieId:string):DeleteMovie{
    return {
        type:"DELETE_MOVIE",
        movieId
    }
}