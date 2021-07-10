import {loadStorageState} from "./mockStorage";
import {IMovie} from "../store/types/movieTypes";

export  function getMovies() : IMovie[] {
     const state = loadStorageState();
     return [...state.movies.list.data];
}

 export  function getMovie(id: string) : IMovie {
     const state = loadStorageState();
    const moviesList = [...state.movies.list.data];
    return moviesList.find(m => m._id === id);
}
