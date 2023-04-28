import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';

// LAY DANH SACH GIOI TINH TRONG BANG ALLCODE
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
 
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
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