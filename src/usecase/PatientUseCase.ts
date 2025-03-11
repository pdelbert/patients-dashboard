import { PatientsMessageResponse, Patient, PatientDataRequest, PatientRepository, RequestPatientByPagination } from "../entities/patients";
import PatientRepositoryImpl from "../infrastructure/PatientRepositoryImpl";

const PatientUseCase = (): PatientRepository => ({
    
    // Get All Patients.
    all: async(requestByPagination: RequestPatientByPagination): Promise<Patient[] | null> => {
        const response = await PatientRepositoryImpl().all(requestByPagination);

        if (response === null) return response;

        const patients = response?.map((patient: any) => {
            return {
                id: patient.id,
                name: patient.user.name,
                last_name: patient.user.lastName,
                email: patient.user.email,
                company_id: patient.companyId,
                curp: patient.user.curp,
                active: patient.user.active
            }
        });

        return patients;
    },

    // Create New Patient.
    create: async(patient: Patient): Promise<PatientsMessageResponse> => {
        return await PatientRepositoryImpl().create(patient);
    },

    // Get Patient Data.
    read: async(patient: PatientDataRequest): Promise<Patient | null> => {
        return await PatientRepositoryImpl().read(patient);
    },

    // Update Patient Data.
    update: async(patient: Patient): Promise<PatientsMessageResponse> => { 
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
