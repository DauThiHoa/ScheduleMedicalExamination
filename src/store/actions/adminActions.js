import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService } from '../../services/userService';

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
                console.log('hoidanIt check get state: ' , getState)
                dispatch(saveUserSuccess( ));
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