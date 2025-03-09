import { PacientsMessageResponse, Patient, PatientDataRequest, PatientRepository, RequestPatientByPagination } from "../entities/patients";
import PatientRepositoryImpl from "../infrastructure/PatientRepositoryImpl";

const PatientUseCase = (): PatientRepository => ({
    
    // Get All Patients.
    all: async(requestByPagination: RequestPatientByPagination): Promise<Patient[] | null> => {
        return await PatientRepositoryImpl().all(requestByPagination);
    },

    // Create New Patient.
    create: async(patient: Patient): Promise<PacientsMessageResponse> => {
        return await PatientRepositoryImpl().create(patient);
    },

    // Get Patient Data.
    read: async(patient: PatientDataRequest): Promise<Patient | null> => {
        return await PatientRepositoryImpl().read(patient);
    },

    // Update Patient Data.
    update: async(patient: Patient): Promise<PacientsMessageResponse> => { 
        return await PatientRepositoryImpl().update(patient);
    },

    // Filter Pacients.
    filterPatients: (input: string, patients: Patient[]): Patient[] => {
        if(!input.length) return patients;

        const inputValue = input.toLocaleLowerCase();

        return patients.filter((patient) => {
            return patient.name.toLocaleLowerCase().includes(inputValue) ||
            patient.last_name.toLocaleLowerCase().includes(inputValue) ||
            patient.email.toLocaleLowerCase().includes(inputValue);
        });
    }
})

export default PatientUseCase;
