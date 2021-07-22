import {loadStorageState} from "./mockStorage";
import {IMovie} from "../features/movies/movieTypes";

export  function getMovies() : {[key:string]:IMovie} {
     const state = loadStorageState();
     return {...state.movies.list.data};
}

 export  function getMovie(id: string) : IMovie {
     const state = loadStorageState();
    const moviesList = {...state.movies.list.data};
    return moviesList[id];
}
