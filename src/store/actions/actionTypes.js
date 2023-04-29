const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    // THONG BAO DA DANG NHAP THANH CONG
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: ' USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    // Admin => Gender
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIDED: 'FETCH_GENDER_FAIDED',

     // Admin => POSITION 
     FETCH_POSITION_START: 'FETCH_POSITION_START',
     FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
     FETCH_POSITION_FAIDED: 'FETCH_POSITION_FAIDED',

      // Admin => ROLE 
      FETCH_ROLE_START: 'FETCH_ROLE_START',
      FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
      FETCH_ROLE_FAIDED: 'FETCH_ROLE_FAIDED',

    //   LUU THONG TIN NGUOI DUNG
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILDED: 'CREATE_USER_FAILDED',

     //   XOA THONG TIN NGUOI DUNG
     DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
     DELETE_USER_FAILDED: 'DELETE_USER_FAILDED',

    // HIEN THI THONG TIN NGUOI DUNG
     //   LUU THONG TIN NGUOI DUNG
     CREATE_ALL_USERS_SUCCESS: 'CREATE_ALL_USERS_SUCCESS',
     CREATE_ALL_USERS_FAILDED: 'CREATE_ALL_USERS_FAILDED'

})

export default actionTypes;