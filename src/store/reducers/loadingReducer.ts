import {LoadingActionTypes, LoadingState, UPDATE_LOADING,} from "../types/loadingTypes";



export function loadingReducer(state = null, action: LoadingActionTypes): LoadingState {
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