import {IGenre} from "./genreTypes";

export type IMovie = {
    _id: string,
    title: string,
    genre: { _id: string, name: string },
    numberInStock: number,
    dailyRentalRate: number,
    publishDate?: string,
    isFavorite: boolean
}

export type CreateMovie = {
    title: string;
    numberInStock: number;
    dailyRentalRate: number;
    genreId: string;
}

//state
export interface MovieState {
    list: {
        data: IMovie[];
        loading: boolean;
        error: string;
    },

}

//actions
export const FETCH_MOVIES = "FETCH_MOVIES";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";
export const FETCH_MOVIE_DETAIL = "FETCH_MOVIE_DETAIL";
export const ADD_MOVIE = "ADD_MOVIE";
export const TOGGLE_FAV = "TOGGLE_FAV";

export interface FetchMoviesAction {
    type: typeof FETCH_MOVIES;
}

export interface FetchMoviesSuccess {
    type: typeof FETCH_MOVIES_SUCCESS;
    payload: IMovie[];
}

export interface FetchMoviesFailure {
    type: typeof FETCH_MOVIES_FAILURE;
    error: string;
}

export interface FetchMovieDetail {
    type: typeof FETCH_MOVIE_DETAIL;
    payload: IMovie;
}

export interface AddMovie {
    type:typeof ADD_MOVIE;
    payload:CreateMovie,
    genres: IGenre[];
}

export interface ToggleFav{
    type:typeof TOGGLE_FAV,
    movieId:string
}

export interface DeleteMovie{
    type:"DELETE_MOVIE";
    movieId:string;
}

export type MovieActionTypes = FetchMoviesAction | FetchMoviesSuccess |
    FetchMoviesFailure | FetchMovieDetail |
    AddMovie | ToggleFav | DeleteMovie;