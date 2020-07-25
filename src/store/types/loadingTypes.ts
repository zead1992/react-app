export interface LoadingState {
    movieList:boolean;
    movieDetail:boolean;
}

export const UPDATE_LOADING = "UPDATE_LOADING";

export interface UpdateLoading {
    type:typeof UPDATE_LOADING;
    payload:{
        key:keyof LoadingState;
        val:boolean;
    };
}

export type LoadingActionTypes = UpdateLoading;