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