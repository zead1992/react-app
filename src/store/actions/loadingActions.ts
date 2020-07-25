import {LoadingState, UPDATE_LOADING, UpdateLoading} from "../types/loadingTypes";

export function updateLoading(payload): UpdateLoading {
    return {
        type: UPDATE_LOADING,
        payload
    }
}