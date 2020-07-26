export interface LoadingState {
    movieList:boolean;
    movieDetail:boolean;
    newMovie:boolean;
    genreList:boolean;
}

export type UpdateLoadingPayload ={
    key:keyof LoadingState;
    val:boolean;
}

export const UPDATE_LOADING = "UPDATE_LOADING";

export interface UpdateLoading {
    type:typeof UPDATE_LOADING;
    payload:UpdateLoadingPayload;
}

export type LoadingActionTypes = UpdateLoading;