import {getGenres} from "../../services/genreService";
import {updateLoadingState} from "../../features/loading/loadingSlice";
import {GenreState} from "./genreTypes";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";



export const fetchGenresAsync = createAsyncThunk("genres/fetchGenres",
    async (_,{dispatch,getState})=>{
        const result = await getGenres();
        return result;
})

const genresSlice = createSlice({
    name:"genres",
    initialState:null as GenreState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchGenresAsync.fulfilled,(state,action)=>{
                state.list = action.payload;
            })
    }
})

export default genresSlice.reducer;
