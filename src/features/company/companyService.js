import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const registerCompany = async (companyData)=>{
    const response = await axios.post(`${base_url}company/register`,companyData)
    return response.data
}


const getAllCompanies = async()=>{
    const response = await axios.get(`${base_url}company/getAll`,config)
    return response.data
}

const deleteCompany = async(id)=>{
    const response = await axios.delete(`${base_url}company/delete/${id}`,config)
    return response.data
}

const editCompany = async(data)=>{
    console.log(data)
    const response = await axios.put(`${base_url}company/edit/${data.id}`,data,config)
    return response.data
}


const getSingleCompany = async(id)=>{
    const response = await axios.get(`${base_url}company/getOne/${id}`,config)
    return response.data
}


const companyService = {getAllCompanies,deleteCompany,registerCompany,editCompany,getSingleCompany}

export default companyService
