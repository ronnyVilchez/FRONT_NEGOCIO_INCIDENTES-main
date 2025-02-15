import axios from "axios"
export const mainAPI = axios.create({ baseURL: 'https://back-negocio-main.onrender.com/' });

export const usersAll = async ()=> {
   const users = await mainAPI.get('/api/user/all')
   return users.data
}
export const reportesAll = async ()=> {
   const report = await mainAPI.get('/api/incident/all')
   return report.data
}
export const reportesOne = async ()=> {
   const idIn = localStorage.getItem('idIn')
   const report = await mainAPI.get(`/api/incident/${idIn}`)
   return report.data
}
export const reportesUser = async ()=> {
    const userId = localStorage.getItem('userId')
   const reportUs = await mainAPI.get(`/api/incident/u/${userId}`)
   return reportUs.data
}
export const createRpt = async (data)=> {
   const report = await mainAPI.post('/api/incident/',data)
   return report.data
}
export const updateReport = async (data)=> {
    const idR = localStorage.getItem('idR')
   const report = await mainAPI.patch(`/api/incident/${idR}`,data)
   return report.data
}
export const updateReportResident = async (data)=> {
    const idIn = localStorage.getItem('idIn')
   const report = await mainAPI.patch(`/api/incident/${idIn}`,data)
   return report.data
}
export const deleteReport = async (id)=> {
   const report = await mainAPI.delete(`/api/incident/${id}`)
   return report.data
}

export const createUs = async (data)=> {
    const newUs = await mainAPI.post('/api/user/',data)
    return newUs.data
 }
 
export const editeUs = async (data)=> {
   const id = localStorage.getItem('userId')
    const editUs = await mainAPI.patch(`/api/user/${id}`,data)
    return editUs.data
 }
 
 export const deleteUser = async (id)=> {
    const delUser = await mainAPI.delete(`/api/user/${id}`)
    return delUser.data
 }
 