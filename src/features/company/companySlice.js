import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import companyService from "./companyService";
import { toast } from "react-toastify";

export const registerCompany = createAsyncThunk('company/register',async(companyData,thunkApi)=>{
    try{
        return await companyService.registerCompany(companyData)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const getAllCompanies = createAsyncThunk('company/get-all',async(thunkApi)=>{
    try{
        return await companyService.getAllCompanies()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})
export const getSingleCompany = createAsyncThunk('company/get-single-company',async(id,thunkApi)=>{
    try{
        return await companyService.getSingleCompany(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const deleteCompany = createAsyncThunk('company/delete',async(id,thunkApi)=>{
    try{
        return await companyService.deleteCompany(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const editCompany = createAsyncThunk('company/edit',async(data,thunkApi)=>{
    try{
        return await companyService.editCompany(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

const initialState = {
    company:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const companySlice = createSlice({
    name:"company",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(registerCompany.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(registerCompany.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.companyData = action.payload
            if(state.isSuccess == true){
                toast.info("Company Registered")
            }
        })
        .addCase(registerCompany.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.companyData = null
            if(state.isError == true){
                toast.error(action.payload.response.data.message)
            }
        })
        .addCase(getAllCompanies.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllCompanies.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.allCompanies = action.payload
            // if(state.isSuccess == true){
            //     console.log(state)
            //     toast.info("User Logged In")
            // }
        })
        .addCase(getAllCompanies.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.allCompanies = null
        })
        .addCase(deleteCompany.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteCompany.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.deletedCompany = action.payload
            if(state.isSuccess == true){
                toast.info("company deleted successfully")
            }
        })
        .addCase(deleteCompany.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.deletedCompany = null
        })

        .addCase(editCompany.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(editCompany.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.editedCompany = action.payload
            if(state.isSuccess == true){
                toast.info("Compnay edited successfully")
            }
        })
        .addCase(editCompany.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.editedCompany = null
        })

        .addCase(getSingleCompany.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getSingleCompany.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.singleCompany = action.payload
            // if(state.isSuccess == true){
            //     console.log(state)
            //     toast.info("User Logged In")
            // }
        })
        .addCase(getSingleCompany.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.singleCompany = null
        })



        // .addCase(resetState,()=> initialState)
    }
})

export default companySlice.reducer