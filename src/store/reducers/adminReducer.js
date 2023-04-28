import actionTypes from '../actions/actionTypes';

const initialState = {
    // LUU CAC THUOC TINH CUA NGUOI DUNG ( GIOI TINH - CHUC DANH )
   genders: [],
   roles: [],
   positions:[]
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // KIEM TRA TU KHOA 
        // state => genders - roles - positions
        case actionTypes.FETCH_GENDER_START:
            console.log ('Hoi Dan It fire fetch gender start: ' , action)

            return { 
                ...state, 
            }
            case actionTypes.FETCH_GENDER_SUCCESS:
                let copyState = {...state};
                copyState.genders = action.data;
                console.log ('Hoi Dan It fire fetch gender start: ' , copyState)
                return {
                    ...copyState, 
                }
                case actionTypes.FETCH_GENDER_FAIDED:
                    console.log ('Hoi Dan It fire fetch gender start: ' , action)
                    return {
                        ...state, 
                    }
        default:
            return state;
    }
}

export default adminReducer;