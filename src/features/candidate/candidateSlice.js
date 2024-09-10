import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import candidateService from "./candidateService";
import { toast } from "react-toastify";

export const registerCandidate = createAsyncThunk('auth/candidate-register',async(candidate,thunkApi)=>{
    try{
        return await candidateService.register(candidate)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const candidateProfile = createAsyncThunk('auth/candidate-profile',async(thunkApi)=>{
    try{
        return await candidateService.candidateProfile()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const candidateList = createAsyncThunk('auth/candidate-List',async(thunkApi)=>{
    try{
        return await candidateService.candidateList()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const deleteCandidate = createAsyncThunk('auth/delete-candidate',async(id,thunkApi)=>{
    try{
        return await candidateService.deleteCandidate(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const jobsAppliedByCandidate = createAsyncThunk('auth/job-applied-by-candidate',async(id,thunkApi)=>{
    try{
        return await candidateService.jobsAppliedByCandidate(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const getSingleCandidate = createAsyncThunk('auth/get-single-candidate',async(id,thunkApi)=>{
    try{
        return await candidateService.getSingleCandidate(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const editCandidate = createAsyncThunk('auth/edit-candidate',async(candidateData,thunkApi)=>{
    try{
        return await candidateService.editCandidate(candidateData)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const applyJob = createAsyncThunk('job/apply',async(data,thunkApi)=>{
    try{
        return await candidateService.applyToJob(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const shortListedCandidateByJob = createAsyncThunk('shortlisted-candidate',async(id,thunkApi)=>{
    try{
        return await candidateService.shortListedCandidateByJob(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

const initialState = {
    candidate:'',
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const candidateSlice = createSlice({
    name:"candidate",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(registerCandidate.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(registerCandidate.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.candidate = action.payload
            if(state.isSuccess == true){
                toast.info("Candidate Registered successfully")
            }
        })
        .addCase(registerCandidate.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.candidate = null
            if(state.isError == true){
                toast.error(action.payload.response.data.message)
            }
        })
        .addCase(candidateProfile.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(candidateProfile.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.candidateProfile = action.payload
            // if(state.isSuccess == true){
            //     toast.info("User Created")
            // }
        })
        .addCase(candidateProfile.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.candidateProfile = null
            // if(state.isError == true){
            //     console.log(action)
            //     toast.error(action.payload.response.data.message)
            // }
        })
        .addCase(candidateList.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(candidateList.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.candidatelist = action.payload
            // if(state.isSuccess == true){
            //     toast.info("User Created")
            // }
        })
        .addCase(candidateList.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.candidatelist = null
            // if(state.isError == true){
            //     console.log(action)
            //     toast.error(action.payload.response.data.message)
            // }
        })
        .addCase(deleteCandidate.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteCandidate.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.deletedCandidate = action.payload
            if(state.isSuccess == true){
                toast.info("Candidate Deleted")
            }
        })
        .addCase(deleteCandidate.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.deletedCandidate = null
            // if(state.isError == true){
            //     console.log(action)
            //     toast.error(action.payload.response.data.message)
            // }
        })
        .addCase(getSingleCandidate.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getSingleCandidate.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.singleCandidate = action.payload
            // if(state.isSuccess == true){
            //     toast.info("User Created")
            // }
        })
        .addCase(getSingleCandidate.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.singleCandidate = null
            // if(state.isError == true){
            //     console.log(action)
            //     toast.error(action.payload.response.data.message)
            // }
        })
        .addCase(editCandidate.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(editCandidate.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.editedCandidate = action.payload
            if(state.isSuccess == true){
                toast.info("Candidate edited Successfully")
            }
        })
        .addCase(editCandidate.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.editedCandidate = null
            if(state.isError == true){
                toast.error(action.payload.response.data.message)
            }
        })

        .addCase(jobsAppliedByCandidate.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(jobsAppliedByCandidate.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.jobsApllied = action.payload
            // if(state.isSuccess == true){
            //     toast.info("User Created")
            // }
        })
        .addCase(jobsAppliedByCandidate.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.jobsApllied = null
            // if(state.isError == true){
            //     console.log(action)
            //     toast.error(action.payload.response.data.message)
            // }
        })

         .addCase(applyJob.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(applyJob.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.applyJob = action.payload
            if(state.isSuccess == true){
                toast.success("candidate shortlisted ")
            }
        })
        .addCase(applyJob.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.applyJob = null
            if(state.isSuccess == true){
                toast.error(action.payload.response.data.message)
            }
        })

        .addCase(shortListedCandidateByJob.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(shortListedCandidateByJob.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.shortListedCandidateByJob = action.payload
            // if(state.isSuccess == true){
            //     toast.success("Job application submitted ")
            // }
        })
        .addCase(shortListedCandidateByJob.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.shortListedCandidateByJob = null
            // if(state.isSuccess == true){
            //     toast.error("job Application failed ")
            // }
        })



        // .addCase(resetState,()=> initialState)
    }
})

export default candidateSlice.reducer