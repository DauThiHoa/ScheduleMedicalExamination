export const path = {
    HOME: '/',
    HOMEPAGE: '/home',
    LOGIN: '/login', // DUONG LINK HIEN THI TOI FILE
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    DETAIL_DOCTOR: '/detail-doctor/:id' ,// DUONG LINK TOI TRANG CHI TIET BAC SI
    DETAIL_SPCIALTY: '/detail-specialty/:id' ,
    DETAIL_CLINIC: '/detail-clinic/:id' ,
    VERIFY_EMAIL_BOOKING : '/verify-booking' // DUONG LINK XAC NHAN CHUYEN TU DANG KI (S1) => SANG DA XAC NHAN (S2)
};

export const LANGUAGES = {
    VI: 'vi',
    EN: 'en'
};
 
export const manageActions = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE"
};

export const CRUD_ACTIONS = {
    CREATE: "CREATE",
    EDIT: "EDIT",
    DELETE: "DELETE",
    READ: "READ"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
};


export const USER_ROLE = {
    ADMIN: 'R1',
    DOCTOR: 'R2',
    PATIENT: 'R3'
};