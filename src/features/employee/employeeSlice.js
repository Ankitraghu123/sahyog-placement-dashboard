import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeService from "./employeeService";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const getEmployeeFromLocalStorage = localStorage.getItem('employee') ? JSON.parse(localStorage.getItem('employee')):null

export const registerEmployee = createAsyncThunk('employee/employee-register',async(employee,thunkApi)=>{
    try{
        return await employeeService.registerEmployee(employee)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const loginEmployee = createAsyncThunk('employee/employee-login',async(employee,thunkApi)=>{
    try{
        return await employeeService.loginEmployee(employee)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const changePassword = createAsyncThunk('employee/change password',async(employee,thunkApi)=>{
    try{
        return await employeeService.changePassword(employee.id,employee.formData)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const getAllEmployees = createAsyncThunk('employee/get-all',async(thunkApi)=>{
    try{
        return await employeeService.getAllEmployees()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const getSingleEmploye = createAsyncThunk('employee/get-single-employee',async(id,thunkApi)=>{
    try{
        return await employeeService.getSingleEmploye(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const editEmployee = createAsyncThunk('employee/edit-employee',async(employeeData,thunkApi)=>{
    try{
        return await employeeService.editEmployee(employeeData)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})
export const deleteEmployee = createAsyncThunk('employee/delete-employee',async(id,thunkApi)=>{
    try{
        return await employeeService.deleteEmployee(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})


const initialState = {
    employee:getEmployeeFromLocalStorage,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const employeeSlice = createSlice({
    name:"employee",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(registerEmployee.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(registerEmployee.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.employee = action.payload
            if(state.isSuccess == true){
                toast.info("Employee registered successfully")
            }
        })
        .addCase(registerEmployee.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.employee = null
            if(state.isError == true){
                toast.error(action.payload.response.data.message)
            }
        })

        .addCase(loginEmployee.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(loginEmployee.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.logedEmployee = action.payload
            window.location.reload()
            // if(state.isSuccess == true){
            //     console.log(state)
            //     toast.info("User Logged In")
            // }
        })
        .addCase(loginEmployee.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.logedEmployee = null
        })

        .addCase(getAllEmployees.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllEmployees.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.allEmployees = action.payload
            // if(state.isSuccess == true){
            //     console.log(state)
            //     toast.info("User Logged In")
            // }
        })
        .addCase(getAllEmployees.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.allEmployees = null
        })

        .addCase(getSingleEmploye.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getSingleEmploye.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.singleEmployee = action.payload
            // if(state.isSuccess == true){
            //     console.log(state)
            //     toast.info("User Logged In")
            // }
        })
        .addCase(getSingleEmploye.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.singleEmployee = null
        })

        .addCase(editEmployee.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(editEmployee.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.editedEmployee = action.payload
            if(state.isSuccess == true){
                toast.info("Employee edited successfully")
            }
        })
        .addCase(editEmployee.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.editedEmployee = null
        })

        .addCase(deleteEmployee.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteEmployee.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.deletedEmployee = action.payload
            if(state.isSuccess == true){
                toast.info("Employee deleted")
            }
        })
        .addCase(deleteEmployee.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.deletedEmployee = null
        })

        .addCase(changePassword.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(changePassword.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.changedPassword = action.payload
            if(state.isSuccess == true){
                toast.info("Password changed successfully")
            }
        })
        .addCase(changePassword.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.deletedEmployee = null
        })



        // .addCase(resetState,()=> initialState)
    }
})

export default employeeSlice.reducer