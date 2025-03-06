import { useEffect, useState } from "react";
import PatientInfoView from "./PatientInfoView"
import { PacientsMessageResponse, Patient, PatientDataRequest } from "../../entities/patients";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { getPacientDataAsync, UpdatePacientDataAsync } from "../../state/patientsSlice";
import { Alert, Loading } from "../../components";
import { useParams } from "react-router"

const PatientInfoContainer = () => {
    let params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { login } = useSelector((state: RootState) => state.login);
    const { patient, createdPatientResponse } = useSelector((state: RootState) => state.patients);
    const [patientData, setPatientData] = useState<Patient | null>(null)
    const [patientUpdateResponse, setPatientUpdateResponse] = useState<PacientsMessageResponse | null>(null)

    // On Mount, fetch patient Data.
    useEffect(() => {
        const patientData: PatientDataRequest = {
            id: params.id as string,
            token: login.token as string
        }

        dispatch(getPacientDataAsync(patientData));
    }, []);


    useEffect(() => {
        setPatientData(patient)
    }, [patient])


    // Display Error o Success Message after Submission.
    useEffect(() => {
        setPatientUpdateResponse(createdPatientResponse)
        setTimeout(() => { setPatientUpdateResponse(null) }, 2000);
    }, [createdPatientResponse])


    const formSubmit = (e: any) => {
        e.preventDefault();

        const data: Patient = {
            id: params.id as string,
            token: login.token as string,
            name: patientData?.name as string,
            last_name: patientData?.last_name as string,
            email: patientData?.email as string,
            company_id: patientData?.company_id as string,
            curp: patientData?.curp as string,
            active: patientData?.active || false
        }

        dispatch(UpdatePacientDataAsync(data));
    }

    // Loading Flag Pattern.
    if (patient.email.length === 0) return <Loading />;

    return (
        <div className=" p-6 w-auto flex justify-center items-center h-screen">
            {patientUpdateResponse?.message &&
                <Alert
                    title={patientUpdateResponse.message}
                    className={patientUpdateResponse.className as string} />}

            <PatientInfoView
                formSubmit={formSubmit}
                patientData={patientData}
                setPatientData={setPatientData}
            />
        </div>
    )
}

export default PatientInfoContainer
