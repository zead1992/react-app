import {getGenres} from "../../services/genreService";
import {CreateGenre, GenreState, IGenre} from "./genreTypes";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";
import {v4 as uuidv4} from 'uuid';


//selectors
export const selectAllGenres = (state: RootState) => state.genre.list;

export const fetchGenresAsync = createAsyncThunk("genres/fetchGenres",
    async (_,{dispatch,getState})=>{
        const result = await getGenres();
        return result;
});

export const addGenreAsync = createAsyncThunk("addGenreAsync",
    async (args:{entityData:CreateGenre},{getState,dispatch})=>{
        await new Promise(resolve => setTimeout(resolve,2000));
        return args;
    })

const genresSlice = createSlice({
    name:"genres",
    initialState:null as GenreState,
    reducers:{

    },
    extraReducers:(builder)=>{
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
            });
    }
})

export default genresSlice.reducer;
