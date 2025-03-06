import { PacientsMessageResponse, Patient, PatientDataRequest, PatientRepository } from "../entities/patients";
import PatientRepositoryImpl from "../infrastructure/PatientRepositoryImpl";

const PatientUseCase = (): PatientRepository => ({
    
    // Get All Pacients.
    all: async(token: string): Promise<Patient[] | null> => {
        return await PatientRepositoryImpl().all(token);
    },

    // Create New Pacients.
    create: async(patient: Patient): Promise<PacientsMessageResponse> => {
        return await PatientRepositoryImpl().create(patient);
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
    },

    // Get User Info.
    read: async(patient: PatientDataRequest): Promise<Patient | null> => {
        return await PatientRepositoryImpl().read(patient);
    },

    // Update User Info.
    update: async(patient: Patient): Promise<PacientsMessageResponse> => { 
        return await PatientRepositoryImpl().update(patient);
    }
})

export default PatientUseCase;
