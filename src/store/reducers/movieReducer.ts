import {IMovie} from "../../types/movie-types";

const initState : {movies:IMovie[],loading:boolean,error:string} = {
    movies:[],
    loading:false,
    error:''
}

export const movieReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_MOVIES":
            return state;
        case "FETCH_MOVIES_SUCCESS":
            return state;
        case "FETCH_MOVIES_FAILURE":
            return state;
        default :
            return state
    }
}