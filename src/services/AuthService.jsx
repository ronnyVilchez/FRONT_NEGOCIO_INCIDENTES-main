import axios from "axios"

export const mainAPI = axios.create({ baseURL: 'https://back-negocio.onrender.com' });

export const Auth = async (data)=> {
   const log = await mainAPI.post('/api/auth/login',data)
   return log.data
}