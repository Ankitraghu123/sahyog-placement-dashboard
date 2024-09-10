import axios from "axios";
import { base_url } from "../../utils/base_url";

const getAll= async (data)=>{
    const response = await axios.get(`${base_url}contact/getAll`)
    return response.data
}




const jobService = { getAll}

export default jobService
