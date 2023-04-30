import axios from "../axios";

// HAM KET NOI LAY DU LIEU TREN FORM => XU LY DANG NHAP
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });

}
const getAllUsers = (inputId) => {
    //template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
// module.exports = {
//     handleLogin: handleLogin,
// }
const createNewUserService = (data) => {
    console.log('check data from service: ', data)
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    console.log('userId',userId);
    return axios.delete(`/api/delete-user?id=${userId}`)
    
}
const editUserService =(inputData) =>{
    // return axios.put(`/api/edit-user?id=${inputData}`)
    return axios.put(`/api/edit-user`, inputData)
}
const getAllCodeService = (inputType) => {
    //template string
    return axios.get(`/api/allcode?type=${inputType}`)
}

// LAY DANH SACH BAC SI MOI NHAT
const getTopDoctorHomeService = (limit) => {
    return axios.get (`/api/top-doctor-home?limit=${limit}`)
}
export {
    handleLoginApi,
    getAllUsers, createNewUserService,
    deleteUserService, editUserService,
    getAllCodeService,getTopDoctorHomeService
}