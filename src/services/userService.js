import axios from "../axios";
 
// HAM KET NOI LAY DU LIEU TREN FORM => XU LY DANG NHAP
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post ('/api/login', { email : userEmail, password : userPassword});

}
const getAllUsers = (inputId) => {
    //template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
// module.exports = {
//     handleLogin: handleLogin,
// }
export {handleLoginApi, getAllUsers}