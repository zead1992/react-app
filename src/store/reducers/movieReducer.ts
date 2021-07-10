import {getMovie, getMovies} from "../../services/movieService";
import {
    addMovieAction,
    fetchMovieDetail,
    fetchMovies,
    fetchMoviesFailure,
    fetchMoviesSuccess
} from "../actions/movieActions";
import {AxiosError} from "axios";
import {
    ADD_MOVIE,
    CreateMovie,
    FETCH_MOVIE_DETAIL,
    FETCH_MOVIES,
    FETCH_MOVIES_FAILURE,
    FETCH_MOVIES_SUCCESS,
    MovieActionTypes,
    MovieState
} from "../types/movieTypes";
import {updateLoading} from "../actions/loadingActions";
import {toast} from "react-toastify";
import {getGenres} from "../../services/genreService";

export const moviesInitState: MovieState = {
    list: {
        data: [],
        loading: false,
        error: ''
    },
    detail: {
        data: null,
        loading: false,
        error: '',
    }
}

export function movieReducer(state = moviesInitState, action: MovieActionTypes): MovieState {
    switch (action.type) {
        case FETCH_MOVIES:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true
                }
            };
        case FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data: action.payload,
                    error: ''
                }
            };
        case FETCH_MOVIES_FAILURE:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data: [],
                    error: action.error
                }

            };
        case FETCH_MOVIE_DETAIL:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    error: '',
                    data: action.payload
                }
            }
        case ADD_MOVIE:
            const newMovie = action.payload;
            const genres = getGenres();
            const newItem = {
                _id:Math.random().toString(),
                genre:{
                    _id:newMovie.genreId,
                    name:genres.find(g=>g._id == newMovie.genreId).name
                },
                numberInStock:newMovie.numberInStock,
                dailyRentalRate:newMovie.dailyRentalRate,
                publishDate:new Date().toString(),
                isFavorite:false,
                title:newMovie.title
            };
            return {
                ...state,
                list:{...state.list,data:[...state.list.data,newItem]}
            }
        default :
            return state
    }
}

export function fetchMoviesAsync() {
    return async (dispatch) => {
        try {
            dispatch(fetchMovies());

            await new Promise(resolve => setTimeout(resolve,1000));
            const  result = await getMovies();
            dispatch(fetchMoviesSuccess(result));

        } catch (e) {
            const error = e as AxiosError;
            dispatch(fetchMoviesFailure(error.message));
        }

    }
}

export function fetchMovieDetailAsync(id: string) {
    return async (dispatch) => {
        try {
            dispatch(updateLoading({key: 'movieDetail', val: true}))
            const result = await getMovie(id);
            dispatch(fetchMovieDetail(result));
            dispatch(updateLoading({key: 'movieDetail', val: false}));
        } catch (e) {
            dispatch(updateLoading({key: 'movieDetail', val: false}));
            const error = e as AxiosError;
        }
    }
}

export function addMovieAsync(newMovie: CreateMovie) {
    return async (dispatch,getState) => {
        console.log(getState);
        try {
            dispatch(updateLoading({key: 'newMovie', val: true}));
            dispatch(addMovieAction(newMovie))
            dispatch(updateLoading({key: 'newMovie', val: false}));
        } catch (e) {
            dispatch(updateLoading({key: 'newMovie', val: false}));
            toast.error("error adding new movie");
        }
    }
}