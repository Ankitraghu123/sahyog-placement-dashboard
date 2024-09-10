import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";



const getAllVacancies = async()=>{
    const response = await axios.get(`${base_url}job/getAll`,config)
    return response.data
}

const getSingleVacancies = async(id)=>{
    const response = await axios.get(`${base_url}job/get/${id}`,config)
    return response.data
}

const deleteVacancy = async(id)=>{
    const response = await axios.delete(`${base_url}job/delete/${id}`,config)
    return response.data
}

const editVacancy = async(data)=>{
    const response = await axios.put(`${base_url}job/edit/${data.id}`,data,config)
    return response.data
}

const createVacancy = async(data)=>{
    const response = await axios.post(`${base_url}job/create`,data,config)
    return response.data
}



const vacancyService = {getAllVacancies,deleteVacancy,editVacancy,getSingleVacancies,createVacancy}

export default vacancyService
