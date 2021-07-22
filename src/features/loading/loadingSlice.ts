import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoadingState, UpdateLoadingPayload} from "./loadingTypes";


const loadingSlice = createSlice({
    name:'loading',
    initialState:null as LoadingState,
    reducers:{
        updateLoadingState(state,action : PayloadAction<UpdateLoadingPayload>){
            state[action.payload.key] = action.payload.val;
        }
    }
})
export const {updateLoadingState} = loadingSlice.actions;
export default loadingSlice.reducer;
