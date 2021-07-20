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
    FETCH_MOVIES_SUCCESS, IMovie,
    MovieActionTypes,
    MovieState,
    TOGGLE_FAV
} from "../types/movieTypes";
import {updateLoading} from "../actions/loadingActions";
import {toast} from "react-toastify";
import {RootState} from "./rootReducer";
import {v4 as uuidv4,validate as uuidValidate} from 'uuid';
import {mockGenre} from "./genreReducers";
import moment from "moment"

export const moviesInitState: MovieState = {
    list: {
        data: [],
        loading: false,
        error: ''
    },
}

mockGenre.forEach((g, index) => {
    moviesInitState.list.data.push({
        _id: uuidv4(),
        genre: g,
        title: `Movie ${index}`,
        isFavorite: false,
        publishDate: moment().subtract(index + 1, 'days').format('DD/MM/YYYY'),
        dailyRentalRate: 10 + 5,
        numberInStock: index + 2
    })
})

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
        case ADD_MOVIE:
            const newMovie = action.payload;
            const genres = action.genres;
            const newItem = {
                _id: uuidv4(),
                genre: {
                    _id: newMovie.genreId,
                    name: genres.find(g => g._id == newMovie.genreId).name
                },
                numberInStock: newMovie.numberInStock,
                dailyRentalRate: newMovie.dailyRentalRate,
                publishDate: new Date().toString(),
                isFavorite: false,
                title: newMovie.title
            };
            return {
                ...state,
                list: {...state.list, data: [...state.list.data, newItem]}
            }
        case TOGGLE_FAV:
            const newData = [...state.list.data];
            const index = newData.findIndex(m => m._id == action.movieId);
            const newTarget : IMovie = {...newData[index]}
            newTarget.isFavorite = !newTarget.isFavorite;
            newData.splice(index,1,newTarget);
            return {
                ...state,
                list: {...state.list, data: newData}
            }
        case "DELETE_MOVIE":
            return {
                ...state,
                list:{...state.list,data:state.list.data.filter(m=>m._id != action.movieId)}
            }
        default :
            return state
    }
}

export function fetchMoviesAsync() {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchMovies());
            await new Promise(resolve => setTimeout(resolve, 1000));
            const result = await getMovies();
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
    return async (dispatch, getState) => {
        await new Promise(resolve => setTimeout(resolve,2000))
        const state: RootState = getState();
        const genres = [...state.genre.list];
        try {
            dispatch(updateLoading({key: 'newMovie', val: true}));
            dispatch(addMovieAction(newMovie, genres))
            dispatch(updateLoading({key: 'newMovie', val: false}));
        } catch (e) {
            dispatch(updateLoading({key: 'newMovie', val: false}));
            toast.error("error adding new movie");
        }
    }
}