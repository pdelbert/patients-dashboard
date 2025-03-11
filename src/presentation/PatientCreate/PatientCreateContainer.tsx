import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PatientsMessageResponse, Patient } from '../../entities/patients';
import PatientCreateView from './PatientCreateView';
import { AppDispatch, RootState } from '../../state/store';
import { createPacientsAsync, resetPatientResponse } from '../../state/patientsSlice';
import { Alert } from '../../components';
import { patientSchema } from '../../zod';
import { CONSTANTS } from '../../constants';


const PatientCreateContainer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [disabled, setDisabled] = useState(false);
    const { login } = useSelector((state: RootState) => state.login);
    const { patientChangeResponse } = useSelector((state: RootState) => state.patients);
    const [patientResponse, setPatientResponse] = useState<PatientsMessageResponse | null>(null)

    //  Reset message response before component mount.
    useLayoutEffect(() => {
        dispatch(resetPatientResponse());
    }, []);


    // Display Error o Success Message after Submission.
    useEffect(() => {
        setPatientResponse(patientChangeResponse)
        initialState();
    }, [patientChangeResponse])


    // Display Error Message base in Zod Validation.
    useEffect(() => {
        initialState();
    }, [patientResponse])


    const initialState = () => {
        const timer = setTimeout(() => {
            setDisabled(false);
            setPatientResponse(null)
        }, CONSTANTS.TIMER);

        return () => clearTimeout(timer);
    }

    // Submit New User.
    const formSubmit = (e: any) => {
        e.preventDefault();

        setDisabled(true);

        const formData = new FormData(e.target);

        const formEntries: Patient = {
            name: formData.get('name') as string,
            last_name: formData.get('last_name') as string,
            email: formData.get('email') as string,
            curp: formData.get('curp') as string,
            company_id: formData.get('company_id') as string,
            active: true,
            token: login.token as string
        };

        const response = patientSchema.safeParse(formEntries);

        (response.success)
            ? dispatch(createPacientsAsync(formEntries))
            : setPatientResponse({ message: 'Input Error', className: 'alert-error' });

    }

    return (
        <div className=" p-6 w-auto flex justify-center items-center h-screen">
            {patientResponse?.message &&
                <Alert title={patientResponse.message} className={patientResponse.className as string} />}

            <PatientCreateView formSubmit={formSubmit} disabled={disabled} />
        </div>
    )
}

export default PatientCreateContainer
