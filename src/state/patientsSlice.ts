import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Patient, PatientDataRequest, PatientsState, RequestPatientByPagination } from "../entities/patients";
import PatientUseCase from "../usecase/PatientUseCase";

const initialState: PatientsState = {
    patients: [],
    pagination: 1,
    patient: {
        name: "",
        last_name:  "",
        email:  "",
        company_id:  "",
        curp: null,
        active: false
    },
    patientChangeResponse: {
        message: "",
        statusCode: 0,
        className: ""
    }
}

export const getPacientsAsync = createAsyncThunk(
    "patients/getPacientsAsync",
    async (requestByPagination: RequestPatientByPagination) => {
        return await PatientUseCase().all(requestByPagination);
    }
);

export const createPacientsAsync = createAsyncThunk(
    "patients/createPacientsAsync",
    async (newPatient: Patient) => {
        return await PatientUseCase().create(newPatient);
    }
);

export const getPacientDataAsync = createAsyncThunk(
    "patients/getPacientDataAsync",
    async (patient: PatientDataRequest) => {
        return await PatientUseCase().read(patient);
    }
);

export const UpdatePacientDataAsync = createAsyncThunk(
    "patients/UpdatePacientDataAsync",
    async (patient: Patient) => {
        return await PatientUseCase().update(patient);
    }
);

const patientSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        resetPatientResponse : (state) => {
            state.patientChangeResponse = initialState.patientChangeResponse
        },
        nextPagination: (state) => {
            state.pagination += 1;
        },
        prevPagination: (state) => {
            state.pagination = Math.max(state.pagination -= 1, 1)
        },
        resetPagination: (state) => {
            state.pagination = 1;
        },
    },
    extraReducers: (builder) => {
        builder

        // Get All Patient
        .addCase(getPacientsAsync.pending, () => {
            console.log("getPacientsAsync.pending");
        })    
        .addCase(getPacientsAsync.fulfilled, (state, action) => {
            if(action.payload && action.payload.length) {
                state.patients = action.payload;
            }
        })
        
        // Create Patient
        .addCase(createPacientsAsync.pending, () => {
            console.log("createPacientsAsync.pending");
        })    
        .addCase(createPacientsAsync.fulfilled, (state, action) => {
            if(
                action.payload && action.payload.statusCode === 400 ||
                action.payload && action.payload.statusCode === 500
            ) {
                state.patientChangeResponse = {
                    message: action.payload.message,
                    statusCode: action.payload.statusCode,
                    className: 'alert-error'
                } 
                return;
            }

            state.patientChangeResponse = {
                message: action.payload.message,
                statusCode: 200,
                className: 'alert-success'
            } 
        })

        // Get Patient Data
        .addCase(getPacientDataAsync.pending, () => {
            console.log("getPacientDataAsync.pending");
        })    
        .addCase(getPacientDataAsync.fulfilled, (state, action) => {
            if(action.payload) {
                state.patient = action.payload;
            }
        })

        // Update Patient Data
        .addCase(UpdatePacientDataAsync.pending, () => {
            console.log("UpdatePacientDataAsync.pending");
        })    
        .addCase(UpdatePacientDataAsync.fulfilled, (state, action) => {
            if(
                action.payload && action.payload.statusCode === 400 ||
                action.payload && action.payload.statusCode === 500
            ) {
                state.patientChangeResponse = {
                    message: action.payload.message,
                    statusCode: action.payload.statusCode,
                    className: 'alert-error'
                } 
                return;
            }

            state.patientChangeResponse = {
                message: action.payload.message,
                statusCode: 200,
                className: 'alert-success'
            }
        });
    }
});


export const { 
    nextPagination, 
    prevPagination, 
    resetPagination,
    resetPatientResponse 
} = patientSlice.actions

export default patientSlice.reducer;