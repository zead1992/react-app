import {addMovieAsync, editMovieAsync} from "../features/movies/moviesSlice";
import {updateLoadingState} from "../features/loading/loadingSlice";
import {fetchGenresAsync} from "../features/genres/genresSlice";

export const actionListener =  (storeAPI ) => next => (action) => {
    //on movie add - edit
    if(action.type == editMovieAsync.pending.type || action.type == addMovieAsync.pending.type){
        storeAPI.dispatch(updateLoadingState({key:'newMovie',val:true}));
    }
    if(action.type == editMovieAsync.fulfilled.type || action.type == addMovieAsync.fulfilled.type){
        storeAPI.dispatch(updateLoadingState({key:'newMovie',val:false}));
    }

    //on genre fetch
    if(action.type == fetchGenresAsync.pending.type){
        storeAPI.dispatch(updateLoadingState({key:'genreList',val:true}));
    }
    if(action.type == fetchGenresAsync.fulfilled.type){
        storeAPI.dispatch(updateLoadingState({key:'genreList',val:false}));
    }
    return next(action)
}