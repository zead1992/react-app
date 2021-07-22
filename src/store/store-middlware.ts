import {addMovieAsync, editMovieAsync} from "../features/movies/moviesSlice";
import {updateLoadingState} from "../features/loading/loadingSlice";

export const actionListener =  storeAPI => next => action => {
    if(action.type == editMovieAsync.fulfilled.type || action.type == addMovieAsync.fulfilled.type){
        storeAPI.dispatch(updateLoadingState({key:'newMovie',val:false}));
    }
    return next(action)
}