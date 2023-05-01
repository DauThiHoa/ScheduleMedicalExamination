import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService , getAllUsers
, deleteUserService , editUserService , getTopDoctorHomeService,
getAllDoctors , saveDetailDoctorService} from '../../services/userService';
import { toast } from 'react-toastify';

// LAY DANH SACH GIOI TINH TRONG BANG ALLCODE
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
 
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {

            dispatch({type: actionTypes.FETCH_GENDER_START})

            let res = await getAllCodeService('GENDER');
            if (res && res.data.errCode === 0 ) {
                console.log('hoidanIt check get state: ' , getState)
                dispatch(fetchGenderSuccess(res.data.data));
            }else {
                dispatch(fetchGenderFaided ());
            }
        }catch(e){
            dispatch(fetchGenderFaided ());
            console.log ('fetchGenderStart error', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})

// POSITION

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try { 

            let res = await getAllCodeService('POSITION');
            if (res && res.data.errCode === 0 ) {
                console.log('hoidanIt check get state: ' , getState)
                dispatch(fetchPositionSuccess(res.data.data));
            }else {
                dispatch(fetchPositionFaided ());
            }
        }catch(e){
            dispatch(fetchPositionFaided ());
            console.log ('fetchPositionFaided error', e)
        }
    }
}


export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED
})


// Role

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try { 

            let res = await getAllCodeService('ROLE');
            if (res && res.data.errCode === 0 ) {
                console.log('hoidanIt check get state: ' , getState)
                dispatch(fetchRoleSuccess(res.data.data));

            }else {
                dispatch(fetchRoleFaided ());
            }
        }catch(e){
            dispatch(fetchRoleFaided ());
            console.log ('fetchRoleFaided error', e)
        }
    }
}


export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
})

export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED
})


// TAO THONG TIN NGUOI DUNG

export const createNewUser = (data) => { 
    return async (dispatch, getState) => {
        try { 

            let res = await createNewUserService (data) ;
            if (res && res.data.errCode === 0 ) { 
                // Hien Thi Tao Thong Bao Tao Nguoi Dung Thanh Cong
                toast.success("Create a new user success!")
                
                dispatch(saveUserSuccess( ));
                // LOAD DU LIEU XUONG BANG BEN DUOI
                dispatch(fetchAllUsersStart());
            }else {
                dispatch(saveUserFailed ());
            }
        }catch(e){
            dispatch(saveUserFailed ());
            console.log ('saveUserFailed error', e)
        }
    }

}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS, 
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})

// HIEN THI THONG TIN NGUOI DUNG

export const fetchAllUsersStart = (data) => { 
    return async (dispatch, getState) => {
        try { 

            let res = await getAllUsers ("ALL") ;  

            if (res && res.data.errCode === 0 ) {
                // LOAD LAI THE INPUT RONG  
                console.log('hoidanIt check get state: ' , getState)
                dispatch(fetchAllUsersSuccess(res.data.users.reverse()));
            }else {
                toast.error("Fetch all user error!")
                dispatch(fetchAllUsersFailed ());
            }
        }catch(e){
            toast.error("Fetch all user error!")
            dispatch(fetchAllUsersFailed ());
            console.log ('fetchAllUsersFailed error', e)
        }
    }

}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.CREATE_ALL_USERS_SUCCESS, 
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.CREATE_ALL_USERS_FAILDED
})

// xoa nguoi dung

export const deleteUser = (userId) => { 
    return async (dispatch, getState) => {
        try { 

            let res = await deleteUserService (userId) ;
            if (res && res.data.errCode === 0 ) { 
                // Hien Thi Tao Thong Bao Tao Nguoi Dung Thanh Cong
                toast.success("Delete the user success!")
                
                dispatch(deleteUsersSuccess( ));
                // LOAD DU LIEU XUONG BANG BEN DUOI
                dispatch(fetchAllUsersStart());
            }else {
                toast.error("Delete the user error!")
                dispatch(deleteUsersFailed ());
            }
        }catch(e){
            toast.error("Delete the user error!")
            dispatch(deleteUsersFailed ());
            console.log ('deleteUsersFailed error', e)
        }
    }

}

export const deleteUsersSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS 
})

export const deleteUsersFailed = () => ({
    type: actionTypes.DELETE_USER_FAILDED
})


// SUA nguoi dung

export const editAUser = (data) => { 
    return async (dispatch, getState) => {
        try { 

            let res = await editUserService (data) ;
            if (res && res.data.errCode === 0 ) { 
                // Hien Thi Tao Thong Bao Tao Nguoi Dung Thanh Cong
                toast.success("Update the user success!")
                
                dispatch(editUsersSuccess( ));
                // LOAD DU LIEU XUONG BANG BEN DUOI
                dispatch(fetchAllUsersStart());
            }else {
                toast.error("Update the user error!")
                dispatch(editUsersFailed ());
            }
        }catch(e){
            toast.error("Update the user error!")
            dispatch(editUsersFailed ());
            console.log ('editUsersFailed error', e)
        }
    }

}

export const editUsersSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS 
})

export const editUsersFailed = () => ({
    type: actionTypes.EDIT_USER_FAILDED
})
 

//   let res1 = await getTopDoctorHomeService(3); 
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try { 
            let res = await getTopDoctorHomeService ('');  
            if (res && res.data.errCode === 0){
                 
                dispatch ({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data.data
                })
            }else {
                 
                dispatch ({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILDED
                })
            }
  
            
        }catch(e){
             
            console.log(' FETCH_TOP_DOCTORS_FAILDED: ', e)
            dispatch ({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILDED
            })
        }
    }

}

//   let res1 = await getTopDoctorHomeService(3); 
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try { 
            let res = await getAllDoctors ();  
            if (res && res.data.errCode === 0){
                dispatch ({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data.data
                })
            }else {
                dispatch ({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILDED
                })
            }
  
            
        }catch(e){
            console.log(' FETCH_ALL_DOCTORS_FAILDED: ', e)
            dispatch ({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILDED
            })
        }
    }

}
 

//   TAO THONG TIN BAC SI
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try { 
            let res = await saveDetailDoctorService (data); 
            console.log('saveDetailDoctorService : ' , res) ;
            console.log('errCode : ' , res.data.errCode) 

            if (res && res.data.errCode === 0){
                  // Hien Thi Tao Thong Bao Tao Nguoi Dung Thanh Cong
                  toast.success("Save Infor Detail Doctor success!")

                dispatch ({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS
                })
            }else {
                 // Hien Thi Tao Thong Bao Tao Nguoi Dung Thanh Cong
                  toast.error("Save Infor Detail Doctor error1!")
                dispatch ({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED
                })
            }
  
            
        }catch(e){
             // Hien Thi Tao Thong Bao Tao Nguoi Dung Thanh Cong
             toast.error("Save Infor Detail Doctor error2!") 
            console.log(' SAVE_DETAIL_DOCTOR_FAILDED: ', e)

            dispatch ({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED
            })
        }
    }

}