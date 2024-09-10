import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import vacancyService from "./vacancyService";
import { toast } from "react-toastify";


export const getAllVacancies = createAsyncThunk('vacancy/get-all',async(thunkApi)=>{
    try{
        return await vacancyService.getAllVacancies()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const getSingleVacancies = createAsyncThunk('vacancy/get-single-vacancy',async(id,thunkApi)=>{
    try{
        return await vacancyService.getSingleVacancies(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const deleteVacancy = createAsyncThunk('vacancy/delete',async(id,thunkApi)=>{
    try{
        return await vacancyService.deleteVacancy(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const editVacancy = createAsyncThunk('vacancy/edit',async(data,thunkApi)=>{
    try{
        return await vacancyService.editVacancy(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const createVacancy = createAsyncThunk('vacancy/create',async(data,thunkApi)=>{
    try{
        return await vacancyService.createVacancy(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})
const initialState = {
    vacancy:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const vacancySlice = createSlice({
    name:"vacancy",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllVacancies.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllVacancies.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.allVacancies = action.payload
          
        })
        .addCase(getAllVacancies.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.allVacancies = null
        })
        .addCase(deleteVacancy.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteVacancy.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.deletedVacancy = action.payload
            if(state.isSuccess == true){
                toast.info("Vacancy deleted successfully")
            }
        })
        .addCase(deleteVacancy.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.deletedVacancy = null
        })

        .addCase(editVacancy.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(editVacancy.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.editedVacancy = action.payload
            if(state.isSuccess == true){
                toast.info("Vacancy edited successfully")
            }
        })
        .addCase(editVacancy.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.editedVacancy = null
            if(state.isError == true){
                toast.error(action.payload.response.data.message)
            }
        })

        .addCase(getSingleVacancies.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getSingleVacancies.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.singleVacancy = action.payload
            // if(state.isSuccess == true){
            //     console.log(state)
            //     toast.info("User Logged In")
            // }
        })
        .addCase(getSingleVacancies.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.singleVacancy = null
        })

        .addCase(createVacancy.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createVacancy.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.createdVacancy = action.payload
            if(state.isSuccess == true){
               
                toast.info("vacancy created successfully")
            }
        })
        .addCase(createVacancy.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.createdVacancy = null
            if(state.isError == true){
                toast.error(action.payload.response.data.message)
            }
        })



        // .addCase(resetState,()=> initialState)
    }
})

export default vacancySlice.reducer