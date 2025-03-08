import { useEffect, useState } from "react";
import PatientUpdateView from "./PatientUpdateView"
import { PacientsMessageResponse, Patient, PatientDataRequest } from "../../entities/patients";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { getPacientDataAsync, UpdatePacientDataAsync } from "../../state/patientsSlice";
import { Alert, Loading } from "../../components";
import { useParams } from "react-router"
import { patientSchema } from "../../zod";

const PatientUpdateContainer = () => {
    let params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const [btnDisabled, setBtnDisabled] = useState(false);
    const { login } = useSelector((state: RootState) => state.login);
    const { patient, createdPatientResponse } = useSelector((state: RootState) => state.patients);
    const [patientData, setPatientData] = useState<Patient | null>(null)
    const [patientUpdateResponse, setPatientUpdateResponse] = useState<PacientsMessageResponse | null>(null)

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


    // Display Error Message base in Zod Validation.
    useEffect(() => {
        initialState();
    }, [patientUpdateResponse])


    const initialState = () => {
        setTimeout(() => {
            setBtnDisabled(false);
            setPatientUpdateResponse(null)
        }, 2000);
    }


    const formSubmit = (e: any) => {
        e.preventDefault();

        setBtnDisabled(true);

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
                <Alert
                    title={patientUpdateResponse.message}
                    className={patientUpdateResponse.className as string} />}

            <PatientUpdateView
                formSubmit={formSubmit}
                patientData={patientData}
                setPatientData={setPatientData}
                disabled={btnDisabled}
            />
        </div>
    )
}

export default PatientUpdateContainer
