import {loadStorageState} from "./mockStorage";
import {IGenre} from "../features/genres/genreTypes";

export  function getGenres(): IGenre[] {
    const state = loadStorageState();
    const genres = [...state.genre.list];
    return genres;
}

