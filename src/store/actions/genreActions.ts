import {FETCH_GENRES, FetchGenres, IGenre} from "../types/genreTypes";

export function fetchGenres(genres:IGenre[]) : FetchGenres {
    return {
        type: FETCH_GENRES,
        payload:genres
    }
}