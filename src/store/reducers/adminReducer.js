import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    // LUU CAC THUOC TINH CUA NGUOI DUNG ( GIOI TINH - CHUC DANH )
   genders: [],
   roles: [],
   positions:[],
   users: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // KIEM TRA TU KHOA 
        // state => genders - roles - positions
        case actionTypes.FETCH_GENDER_START: 
        state.isLoadingGender = true; 

            return { 
                ...state, 
            }
            case actionTypes.FETCH_GENDER_SUCCESS: 
            state.genders = action.data;
            state.isLoadingGender = false;
 
                return {
                    ...state, 
                }
                case actionTypes.FETCH_GENDER_FAIDED: 
                    state.genders = [];
                    state.isLoadingGender = false;
 
                    return {
                        ...state, 
                    }

                    // POSITION

                    case actionTypes.FETCH_POSITION_SUCCESS: 
                    state.positions = action.data; 
         
                        return {
                            ...state, 
                        }
                        case actionTypes.FETCH_POSITION_FAIDED: 
                            state.positions = []; 
         
                            return {
                                ...state, 
                            }

                            // ROLE

                            case actionTypes.FETCH_ROLE_SUCCESS: 
                            state.roles = action.data; 
                 
                                return {
                                    ...state, 
                                }
                                case actionTypes.FETCH_ROLE_FAIDED: 
                                    state.roles = []; 
                 
                                    return {
                                        ...state, 
                                    }
                                    // User
                                    case actionTypes.CREATE_ALL_USERS_SUCCESS: 
                                    state.users = action.users; 
                         
                                        return {
                                            ...state, 
                                        }

                                        case actionTypes.CREATE_ALL_USERS_FAILDED: 
                                        state.users = []; 
                             
                                            return {
                                                ...state, 
                                            }
        default:
            return state;
    }
}

export default adminReducer;