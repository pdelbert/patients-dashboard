export const ROUTES = {
    LOGIN: '/',
    PATIENTS: '/patients',
    PATIENT_CREATE: '/patients/new',
    PATIENT_UPDATE: '/patients/:id',
}

export const CONSTANTS = {
    TABLE_HEADER: [
        "ID",
        "NOMBRE",
        "APELLIDO",
        "EMAIL",
        "COMPANY ID",
        "CURP",
        "ACTION"
    ]
}

export const REQUEST_URL = {
    HEADERS: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    
    LOGIN: `${import.meta.env.REACT_APP_API_URL}/auth/login-with-token`,
    PATIENTS: `${import.meta.env.REACT_APP_API_URL}/patients`
}


