import {IGenre} from "../store/types/genreTypes";
import {loadStorageState} from "./mockStorage";

export  function getGenres(): IGenre[] {
    const state = loadStorageState();
    const genres = [...state.genre.list];
    return genres;
}

