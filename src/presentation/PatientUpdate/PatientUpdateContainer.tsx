import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import PatientUpdateView from "./PatientUpdateView"
import { PacientsMessageResponse, Patient, PatientDataRequest } from "../../entities/patients";
import { AppDispatch, RootState } from "../../state/store";
import { getPacientDataAsync, UpdatePacientDataAsync } from "../../state/patientsSlice";
import { Alert, Loading } from "../../components";
import { patientSchema } from "../../zod";
import { CONSTANTS } from "../../constants";

const PatientUpdateContainer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [disabled, setDisabled] = useState(false);
    const { login } = useSelector((state: RootState) => state.login);
    const { patient, createdPatientResponse } = useSelector((state: RootState) => state.patients);
    const [patientData, setPatientData] = useState<Patient | null>(null)
    const [patientUpdateResponse, setPatientUpdateResponse] = useState<PacientsMessageResponse | null>(null)
    const params = useParams();

    // On Mount, fetch patient Data.
    useEffect(() => {
        const patientData: PatientDataRequest = { id: params.id as string, token: login.token as string }
        dispatch(getPacientDataAsync(patientData));
    }, []);


    useEffect(() => {
        setPatientData(patient)
    }, [patient])


    // Display Error or Success Message after Submission.
    useEffect(() => {
        setPatientUpdateResponse(createdPatientResponse)
        initialState();
    }, [createdPatientResponse]);


    // Hide Error Message base in Zod Validation.
    useEffect(() => {
        initialState();
    }, [patientUpdateResponse])


    const initialState = () => {
        const timer = setTimeout(() => {
            setDisabled(false);
            setPatientUpdateResponse(null)
        }, CONSTANTS.TIMER);

        return () => clearTimeout(timer);
    }


    const formSubmit = (e: any) => {
        e.preventDefault();

        setDisabled(true);

        const formEntries: Patient = {
            id: params.id as string,
            token: login.token as string,
            name: patientData?.name as string,
            last_name: patientData?.last_name as string,
            email: patientData?.email as string,
            company_id: patientData?.company_id as string,
            curp: patientData?.curp as string,
            active: patientData?.active || false
        }

        const response = patientSchema.safeParse(formEntries);

        (response.success)
            ? dispatch(UpdatePacientDataAsync(formEntries))
            : setPatientUpdateResponse({ message: 'Input Error', className: 'alert-error' });
    }

    // Loading Flag Pattern.
    if (patient.email.length === 0) return <Loading />;

    return (
        <div className=" p-6 w-auto flex justify-center items-center h-screen">
            {patientUpdateResponse?.message &&
                <Alert title={patientUpdateResponse.message} className={patientUpdateResponse.className as string} />}

            <PatientUpdateView
                formSubmit={formSubmit}
                patientData={patientData}
                setPatientData={setPatientData}
                disabled={disabled}
            />
        </div>
    )
}

export default PatientUpdateContainer
