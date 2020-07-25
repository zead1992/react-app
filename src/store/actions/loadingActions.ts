import {UPDATE_LOADING, UpdateLoading, UpdateLoadingPayload} from "../types/loadingTypes";

export function updateLoading(payload: UpdateLoadingPayload): UpdateLoading {
    return {
        type: UPDATE_LOADING,
        payload
    }
}