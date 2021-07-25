import {getGenres} from "../../services/genreService";
import {CreateGenre, GenreState, IGenre} from "./genreTypes";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";
import {v4 as uuidv4} from 'uuid';
import {deleteGenreMoviesAsync} from "../movies/moviesSlice";


//selectors
export const selectAllGenres = (state: RootState) => state.genre.list;

export const fetchGenresAsync = createAsyncThunk("genres/fetchGenres",
    async (_, {dispatch, getState}) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = await getGenres();
        return result;
    });

export const addGenreAsync = createAsyncThunk("addGenreAsync",
    async (args: { entityData: CreateGenre }, {getState, dispatch}) => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return args;
    });

export const deleteGenreAsync = createAsyncThunk("deleteGenreAsync",
    async (args: { genreId: string }, {dispatch}) => {
        try {
            await dispatch(deleteGenreMoviesAsync({genreId: args.genreId}));
            return args;
        } catch (e) {
            console.log(e);
        }

    }
);

const genresSlice = createSlice({
    name: "genres",
    initialState: null as GenreState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenresAsync.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(addGenreAsync.fulfilled, (state, action) => {
                const {entityData} = action.payload;
                const genre: IGenre = {
                    _id: uuidv4(),
                    name: entityData.name
                }
                state.list.push(genre);
            })
            .addCase(deleteGenreAsync.fulfilled, (state, action) => {
                const {genreId} = action.payload;
                state.list = state.list.filter(g => g._id != genreId);
            })
    }
})

export default genresSlice.reducer;
