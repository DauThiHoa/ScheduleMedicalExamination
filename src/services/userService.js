import axios from "../axios";
 
// HAM KET NOI LAY DU LIEU TREN FORM => XU LY DANG NHAP
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post ('/api/login', { email : userEmail, password : userPassword});

}
// module.exports = {
//     handleLogin: handleLogin,
// }
export {
    handleLoginApi
}