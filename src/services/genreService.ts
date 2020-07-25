import http from './http-service';
import {IGenre} from "../store/types/genreTypes";


export async function getGenres() {
    const result = await http.get<IGenre[]>(`/genres`);
    return result.data;
}

