import {loadStorageState} from "./mockStorage";
import {IMovie} from "../features/movies/movieTypes";
import {MoviesFilterType} from "../types/common-types";
import moment from "moment";

export  function getMovies() : {[key:string]:IMovie} {
     const state = loadStorageState();
     return {...state.movies.list.data};
}

export function filterMovies(filters: MoviesFilterType) : IMovie[]{
    const state = loadStorageState();
    const listMovies = Object.values(state.movies.list.data);
    let filtered : IMovie[] = listMovies;
    if(filters.search){
        filtered = listMovies.filter(m=>m.title.toLowerCase().includes(filters.search.toLowerCase()));
    }
    filtered = filtered.filter((m)=>{
        if(filters.genre != 'all'){
            return m.genre._id == filters.genre
        }
        if(filters.rating != 'all'){
            return m.rating.val == filters.rating
        }
        if(filters.quality != 'all'){
            return m.quality.val == filters.quality
        }
        if(filters.year != 'all'){
            return moment(m.publishDate).year().toString() == filters.year
        }
        if(filters.language != 'all'){
            return m.lang.val == filters.language
        }
        return true
    })
    return filtered;
}

 export  function getMovie(id: string) : IMovie {
     const state = loadStorageState();
    const moviesList = {...state.movies.list.data};
    return moviesList[id];
}
