import axios from "axios";
import { base_url } from "../../utils/base_url";
// import { config } from "../../utils/config";

const register = async (candidateData)=>{
    const response = await axios.post(`${base_url}candidate/register`,candidateData)
    return response.data
}

const editCandidate = async (candidateData)=>{
    console.log(candidateData)
    const response = await axios.put(`${base_url}candidate/update/${candidateData.id}`,candidateData.candidateData)
    return response.data
}

const getSingleCandidate = async (id)=>{
    const response = await axios.get(`${base_url}candidate/getSingleCandidate/${id}`)
    return response.data
}

const candidateList = async ()=>{
    const response = await axios.get(`${base_url}candidate/getAll`)
    return response.data
}

const deleteCandidate = async (id)=>{
    const response = await axios.delete(`${base_url}candidate/delete/${id}`)
    return response.data
}

const jobsAppliedByCandidate = async (id)=>{
    const response = await axios.get(`${base_url}apply/alljob/${id}`)
    return response.data
}

const applyToJob = async(data)=>{
    console.log(data)
    const response = await axios.post(`${base_url}apply/applyToJob/`,{jobId : data.selectedVacancy,candidates:data.selectedCandidates})
    return response.data
}

const shortListedCandidateByJob = async(id)=>{
    const response = await axios.get(`${base_url}apply/candidateShortlistedByJob/${id}`,)
    return response.data
}


const candidateService = {candidateList,deleteCandidate,getSingleCandidate,editCandidate,jobsAppliedByCandidate,applyToJob,shortListedCandidateByJob,register}

export default candidateService
