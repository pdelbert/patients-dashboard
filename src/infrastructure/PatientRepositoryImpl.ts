import  {REQUEST_URL} from "../constants";
import { PacientsMessageResponse, Patient, PatientDataRequest, PatientRepository } from "../entities/patients";

const PatientRepositoryImpl = () :PatientRepository =>  ({

    all: async (token): Promise<Patient[] | null> => {
        try {
            const response = await fetch(REQUEST_URL.PATIENTS, {
                method: 'GET',
                headers: {'Authorization': `Bearer ${token}`}
            });
    
            const data = await response.json();
            
            const patients = data.map((patient: any) => {
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
            
        } catch (error) { return null; }
    },

    create: async(patient: Patient): Promise<PacientsMessageResponse> => {
        
        // Get Token from Incoming Patient Data.
        const {token} = patient;

        // Remove Token From Incoming Patient Data.
        delete patient.token;
       
        try {
            const response = await fetch(REQUEST_URL.PATIENTS, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ patients: patient })
            });
    
            const data = await response.json();
            return data;
            
        } catch (error) { return { statusCode: 400, message: "Request Error.." } }
    },

    read: async(patient: PatientDataRequest): Promise<Patient | null> => {
        const  {token, id} = patient;

        try {
            const response = await fetch(`${REQUEST_URL.PATIENTS}/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            const patientData = {
                id: data[0].id,
                name: data[0].user.name,
                last_name: data[0].user.lastName,
                email: data[0].user.email,
                company_id: data[0].companyId,
                curp: data[0].user.curp,
                active: data[0].user.active
            }

            return patientData;
            
        } catch (error) {
            return null;
        }
    },
    
    update: async(patient: Patient): Promise<PacientsMessageResponse> => {
         
        // Get Token from Incoming Patient Data.
        const {token} = patient;

        // Remove Token From Incoming Patient Data.
        delete patient.token;
       
        try {
            const response = await fetch(`${REQUEST_URL.PATIENTS}/${patient.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ patients: patient })
            });
    
            const data = await response.json();
            
            return { statusCode: 200, message: data.message };
            
        } catch (error) { 
            return { statusCode: 400, message: "Request Error.." }
        }
    }
    
});

export default PatientRepositoryImpl;