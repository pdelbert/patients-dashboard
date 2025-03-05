export const REQUEST_URL = {
    HEADERS: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    
    LOGIN: `${import.meta.env.REACT_APP_API_URL}/auth/login-with-token`,
    PATIENTS: `${import.meta.env.REACT_APP_API_URL}/patients`
}


