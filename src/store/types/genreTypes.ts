export type IGenre = {
    _id: string;
    name: string;
}

export interface GenreState {
    list: IGenre[];
}

export const FETCH_GENRES = "FETCH_GENRES";

export interface FetchGenres {
    type: typeof FETCH_GENRES
    payload:IGenre[];
}

export type GenreActionTypes = FetchGenres;