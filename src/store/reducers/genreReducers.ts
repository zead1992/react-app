import {FETCH_GENRES, GenreActionTypes, GenreState, IGenre} from "../types/genreTypes";
import {updateLoading} from "../actions/loadingActions";
import {getGenres} from "../../services/genreService";
import {fetchGenres} from "../actions/genreActions";
import { v4 as uuidv4 } from 'uuid';

const mockGenre : IGenre[] = [];
for (let i = 1; i < 5; i++) {
    mockGenre.push({
        _id:uuidv4(),
        name:`genre ${i}`
    })
}

export const genresInitState : GenreState = {
    list:mockGenre
} ;

export function genreReducer(state: GenreState = genresInitState, action: GenreActionTypes): GenreState {
    switch (action.type) {
        case FETCH_GENRES:
            return {
                ...state,
                list: action.payload
            };
        default:
            return state;
    }
}

export function fetchGenresAsync() {
    return async (dispatch) => {
        try {
            dispatch(updateLoading({key: 'genreList', val: true}));
            const result = await getGenres();
            dispatch(fetchGenres(result));
            dispatch(updateLoading({key: 'genreList', val: false}));
        } catch (e) {
            dispatch(updateLoading({key: 'genreList', val: false}));
        }
    }
}