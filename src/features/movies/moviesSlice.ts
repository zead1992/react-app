import {filterMovies, getMovies} from "../../services/movieService";
import {v4 as uuidv4} from 'uuid';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";
import {CreateMovie, EditMovie, IMovie, MovieState} from "./movieTypes";
import {updateLoadingState} from "../loading/loadingSlice";
import {LangList, QualityList, RatingList} from "../../common/static";
import {MoviesFilterType} from "../../types/common-types";


//selectors
export const selectAllMovies = (state: RootState) => state.movies;
// export const selectFilteredMovies = (state: RootState) => state.movies.listFiltered;
export const selectMovieById = (state: RootState, id: string) => state.movies.list.data[id];

//redux/toolkit
export const fetchMoviesAsync = createAsyncThunk('movies/fetchMovies',
    async (_, {getState, dispatch}) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = await getMovies();
        return result;
    });

export const filterMoviesAsync = createAsyncThunk("movies/filterMovies",
    async (args:{filter:MoviesFilterType}) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = await filterMovies(args.filter);
        return result;
    }
);

export const addMovieAsync = createAsyncThunk("movies/addMovie",
    async (args: { newMovie: CreateMovie }, {getState, dispatch}) => {
        const state = getState() as RootState;
        try {

            await new Promise(resolve => setTimeout(resolve, 2000))
            const genres = [...state.genre.list];
            return {newMovie: args.newMovie, genres}
        } catch (e) {
            dispatch(updateLoadingState({key: 'newMovie', val: false}));
            console.log(e);
        }
    });

export const editMovieAsync = createAsyncThunk("movies/editMovie",
    async (args: { values: EditMovie }, {getState, dispatch}) => {
        const state = getState() as RootState;
        try {

            await new Promise(resolve => setTimeout(resolve, 2000))
            const genres = [...state.genre.list];
            return {values: args.values, genres}
        } catch (e) {
            dispatch(updateLoadingState({key: 'newMovie', val: false}));
            console.log(e);
        }
    });

export const deleteGenreMoviesAsync = createAsyncThunk("deleteGenreMovies",
    async (args: { genreId: string }) => {
        return args;
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState: null as MovieState,
    reducers: {
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
                const newItem: IMovie = {
                    _id: uuidv4(),
                    genre: {
                        _id: newMovie.genreId,
                        name: genres.find(g => g._id == newMovie.genreId).name
                    },
                    numberInStock: newMovie.numberInStock,
                    dailyRentalRate: newMovie.dailyRentalRate,
                    publishDate: new Date().toString(),
                    isFavorite: newMovie.isFavorite,
                    title: newMovie.title,
                    rating: RatingList.find(x => x.val == newMovie.rating),
                    quality: QualityList.find(x => x.val == newMovie.quality),
                    lang: LangList.find(x => x.val == newMovie.lang)
                };
                state.list.data[newItem._id] = newItem;
            })
            .addCase(editMovieAsync.fulfilled, (state, action) => {
                const {values, genres} = action.payload;
                const movie : IMovie = state.list.data[values.id];
                movie.title = values.title;
                movie.dailyRentalRate = values.dailyRentalRate;
                movie.numberInStock = values.numberInStock;
                movie.genre = genres.find(g => g._id == values.genreId);
                movie.isFavorite = values.isFavorite;
                movie.rating = RatingList.find(x=>x.val == values.rating);
                movie.quality = QualityList.find(x=>x.val == values.quality);
                movie.lang = LangList.find(x=>x.val == values.lang);
            })
            .addCase(deleteGenreMoviesAsync.fulfilled, (state, action) => {
                const {genreId} = action.payload;
                const listMovies = Object.values(state.list.data);
                const relatedMovies = listMovies.filter(m => m.genre._id == genreId);
                relatedMovies.forEach(m => {
                    delete state.list.data[m._id]
                });
            });
    }
});


export const {
    toggleMovieFav,
    deleteMovie,
} = moviesSlice.actions;
export default moviesSlice.reducer;