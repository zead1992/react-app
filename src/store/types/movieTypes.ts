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

export interface MovieState {
    movies:IMovie[];
    loading:boolean;
    error:string;
}

//actions
export const FETCH_MOVIES = "FETCH_MOVIES";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";

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

export type MovieActionTypes = FetchMoviesAction | FetchMoviesSuccess | FetchMoviesFailure;