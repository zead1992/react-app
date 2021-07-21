import {LoadingActionTypes, LoadingState, UPDATE_LOADING,} from "../types/loadingTypes";

export const loadingInitState: LoadingState = {
    movieList: false,
    movieDetail: false,
    newMovie:false,
    genreList:false
}

export function loadingReducer(state = loadingInitState, action: LoadingActionTypes): LoadingState {
    switch (action.type) {
        case UPDATE_LOADING:
            return {
                ...state,
                [action.payload.key]: action.payload.val
            }
        default:
            return state;
    }
}