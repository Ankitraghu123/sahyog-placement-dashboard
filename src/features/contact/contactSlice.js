import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contactService from "./contactService";
// import { toast } from "react-toastify";


export const getAll = createAsyncThunk('get-enquiry',async(thunkApi)=>{
    try{
        return await contactService.getAll()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})



export const resetState=createAction('Reset_all')

const initialState = {
    getAll:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const contactSlice = createSlice({
    name:"getAll",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAll.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAll.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.getAll = action.payload
        })
        .addCase(getAll.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.jobs = null
        })
       

        // .addCase(resetState,()=> initialState)
    }
})

export default contactSlice.reducer