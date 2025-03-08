
export interface Patient {
    id?: string
    name: string
    last_name: string
    email: string
    company_id: string
    curp: string | null
    active: boolean
    token?: string;
}
export interface PatientDataRequest {
    id: string
    token: string
}

export interface PacientsMessageResponse {
    message: string
    className?: string
    statusCode?: number
}

export interface PatientsState {
    patients: Patient[];
    patient: Patient
    createdPatientResponse: PacientsMessageResponse
}

export interface RequestPatientByPagination {
    token: string
    pagination: number
}

export interface PatientRepository {
    all: (requestByPagination: RequestPatientByPagination) => Promise<Patient[] | null>
    filterPatients?: (inputValue: string, patients: Patient[]) => Patient[]
    create: (patient: Patient) => Promise<PacientsMessageResponse>
    read: (patient: PatientDataRequest) => Promise<Patient | null>
    update:(patient: Patient) => Promise<PacientsMessageResponse>
}
