import {getMovies} from "../../services/movieService";
import {v4 as uuidv4} from 'uuid';
import {createAsyncThunk, createSlice, PayloadAction, SliceCaseReducers} from "@reduxjs/toolkit";
import {IGenre} from "../../store/types/genreTypes";
import {updateLoading} from "../../store/actions/loadingActions";
import {RootState} from "../../store/store";
import {CreateMovie, IMovie, MovieState} from "./movieTypes";


//selectors
export const selectAllMovies = (state : RootState) => state.movies;
export const selectMovieById = (state:RootState,id:string) => state.movies.list.data[id];

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

const moviesSlice = createSlice<MovieState,SliceCaseReducers<MovieState>,'movies'>({
    name: 'movies',
    initialState: null,
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