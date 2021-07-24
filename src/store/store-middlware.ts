import {addMovieAsync, editMovieAsync} from "../features/movies/moviesSlice";
import {updateLoadingState} from "../features/loading/loadingSlice";
import {Action, ActionCreatorWithPayload, PayloadAction} from "@reduxjs/toolkit";

export const actionListener =  storeAPI => next => (action : PayloadAction) => {
    if(action.type == editMovieAsync.fulfilled.type || action.type == addMovieAsync.fulfilled.type){
        storeAPI.dispatch(updateLoadingState({key:'newMovie',val:false}));
    }
    return next(action)
}