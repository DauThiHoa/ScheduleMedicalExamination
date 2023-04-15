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
    // return axios.delete(`/api/delete-user`,{id: userId})

    // return axios.delete('/api/delete-user',{
    //     // headers: {
    //     //     Authorization: authorizationToken 
    //     // }, 
    //     data:{
    //         id: userId
    //     }
        
    // });
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService
}