import {IMovie} from "../../types/movie-types";

const initState: { movies: IMovie[], loading: boolean, error: string } = {
    movies: [],
    loading: false,
    error: ''
}

export const movieReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_MOVIES":
            return {
                ...state,
                loading: true
            };
        case "FETCH_MOVIES_SUCCESS":
            return {
                ...state,
                loading: false,
                movies: action.payload,
                error: ''
            };
        case "FETCH_MOVIES_FAILURE":
            return {
                ...state,
                loading: false,
                movies: [],
                error: action.payload
            };
        default :
            return state
    }
}