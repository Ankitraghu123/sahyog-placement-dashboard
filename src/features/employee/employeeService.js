import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const registerEmployee = async (employeeData)=>{
    console.log(config)
    const response = await axios.post(`${base_url}employee/`,employeeData,config)
    console.log(response)
    // if(response.data){
    //     localStorage.setItem('employee',JSON.stringify(response.data))
    //     localStorage.setItem('employeetoken',JSON.stringify(response.data.token))
    // }
    return response.data
}
const loginEmployee = async (employeeData)=>{
    const response = await axios.post(`${base_url}employee/login`,employeeData,config)
    if(response.data?.role == 'admin'){
        localStorage.setItem('admin',JSON.stringify(response.data))
        localStorage.setItem('admintoken',JSON.stringify(response.data.token))
    }else if(response.data){
        localStorage.setItem('employeetoken',JSON.stringify(response.data.token))
        localStorage.setItem('employee',JSON.stringify(response.data))
    }
    return response.data
}

const changePassword = async (id,employeeData)=>{
    const response = await axios.post(`${base_url}employee/changePassword/${id}`,employeeData,config)
    return response.data
}


const getAllEmployees = async()=>{
    const response = await axios.get(`${base_url}employee/getAll`,config)
    return response.data
}

const getSingleEmploye = async(id)=>{
    console.log(id)
    const response = await axios.get(`${base_url}employee/getSingleEmploye/${id}`,config)
    return response.data
}

const editEmployee = async(data)=>{
    const response = await axios.put(`${base_url}employee/update/${data.id}`,data.formData,config)
    return response.data
}

const deleteEmployee = async(id)=>{
    const response = await axios.delete(`${base_url}employee/delete/${id}`,config)
    return response.data
}


const employeeService = {registerEmployee,loginEmployee,getAllEmployees,getSingleEmploye,editEmployee,deleteEmployee,changePassword}

export default employeeService
