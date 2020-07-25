import {LoadingActionTypes, LoadingState, UPDATE_LOADING} from "../types/loadingTypes";

const initState: LoadingState = {
    movieList: false,
    movieDetail: false,
    genreList:false
}

export function loadingReducer(state = initState, action: LoadingActionTypes): LoadingState {
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