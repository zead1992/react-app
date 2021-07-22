import {getMovies} from "../../services/movieService";
import {CreateMovie, IMovie, MovieState} from "../types/movieTypes";
import {v4 as uuidv4} from 'uuid';
import {mockGenre} from "./genreReducers";
import moment from "moment"
import {RootState} from "../store";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IGenre} from "../types/genreTypes";
import {updateLoading} from "../actions/loadingActions";

export const moviesInitState: MovieState = {
    list: {
        data: {},
        status: 'idle',
        error: ''
    },
}

mockGenre.forEach((g, index) => {
    const id = uuidv4();
    moviesInitState.list.data[id] = {
        _id: id,
        genre: g,
        title: `Movie ${index}`,
        isFavorite: false,
        publishDate: moment().subtract(index + 1, 'days').format('DD/MM/YYYY'),
        dailyRentalRate: 10 + 5,
        numberInStock: index + 2
    }
})

//redux/toolkit
export const fetchMoviesAsync = createAsyncThunk('movies/fetchMovies',
    async (_, {getState, dispatch}) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = await getMovies();
        return result;
    });

export const addMovieAsync = createAsyncThunk("movies/addMovie",
    async (args: { newMovie: CreateMovie }, {getState, dispatch}) => {
        const state = getState() as RootState;
        try {
            dispatch(updateLoading({key:'newMovie',val:true}));
            await new Promise(resolve => setTimeout(resolve, 2000))
            const genres = [...state.genre.list];
            return {newMovie: args.newMovie, genres}
        } catch (e) {
            dispatch(updateLoading({key:'newMovie',val:false}));
            console.log(e);
        }
    });

const moviesSlice = createSlice({
    name: 'movies',
    initialState: moviesInitState,
    reducers: {
        fetchMoviesList(state, action) {
            state.list.status = 'loading';
        },
        fetchMoviesListSuccess(state, action: PayloadAction<{ movies: {[key:string]:IMovie} }>) {
            state.list.data = action.payload.movies;
            state.list.status = 'finished';
        },
        fetchMoviesListError(state, action: PayloadAction<{ error: string }>) {
            state.list.data = {};
            state.list.error = action.payload.error;
        },
        addMovie: {
            reducer(state, action: PayloadAction<{ movie: CreateMovie, genres: IGenre[] }>) {
                const {movie, genres} = action.payload;
                const newItem = {
                    _id: uuidv4(),
                    genre: {
                        _id: movie.genreId,
                        name: genres.find(g => g._id == movie.genreId).name
                    },
                    numberInStock: movie.numberInStock,
                    dailyRentalRate: movie.dailyRentalRate,
                    publishDate: new Date().toString(),
                    isFavorite: false,
                    title: movie.title
                };
                state.list.data[newItem._id] = newItem;
            },
            prepare(movie: CreateMovie, genres: IGenre[]) {
                return {
                    payload: {movie, genres}
                }
            }
        },
        toggleMovieFav(state, action: PayloadAction<{ movieId: string }>) {
            const movie = state.list.data[action.payload.movieId];
            movie.isFavorite = !movie.isFavorite;
        },
        deleteMovie(state, action: PayloadAction<{ movieId: string }>) {
          delete state.list.data[action.payload.movieId];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesAsync.pending, (state, action) => {
                state.list.status = 'loading';
            })
            .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
                state.list.data = action.payload;
                state.list.status = 'idle';
            })
            .addCase(fetchMoviesAsync.rejected, (state, action) => {
                state.list.data = {};
                state.list.status = 'error';
            })
            .addCase(addMovieAsync.fulfilled, (state, action) => {
                const {newMovie, genres} = action.payload;
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
                state.list.data[newItem._id] = newItem;
            });
    }
});


export const {
    addMovie,
    toggleMovieFav,
    deleteMovie,
    fetchMoviesList,
    fetchMoviesListError,
    fetchMoviesListSuccess,
} = moviesSlice.actions;
export default moviesSlice.reducer;