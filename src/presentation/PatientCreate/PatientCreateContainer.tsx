import { useDispatch, useSelector } from 'react-redux';
import { PacientsMessageResponse, Patient } from '../../entities/patients';
import PatientCreateView from './PatientCreateView'
import { AppDispatch, RootState } from '../../state/store';
import { createPacientsAsync } from '../../state/patientsSlice';
import { Alert } from '../../components';
import { useEffect, useState } from 'react';
import { patientSchema } from '../../zod';

const PatientCreateContainer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [btnDisabled, setBtnDisabled] = useState(false);
    const { login } = useSelector((state: RootState) => state.login);
    const { createdPatientResponse } = useSelector((state: RootState) => state.patients);
    const [patientResponse, setPatientResponse] = useState<PacientsMessageResponse | null>(null)


    // Display Error o Success Message after Submission.
    useEffect(() => {
        setPatientResponse(createdPatientResponse)
        initialState();
    }, [createdPatientResponse])

    // Display Error Message base in Zod Validation.
    useEffect(() => {
        initialState();
    }, [patientResponse])


    const initialState = () => {
        setTimeout(() => {
            setBtnDisabled(false);
            setPatientResponse(null)
        }, 2000);
    }

    // Submit New User.
    const formSubmit = (e: any) => {
        e.preventDefault();

        setBtnDisabled(true);

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
                <Alert
                    title={patientResponse.message}
                    className={patientResponse.className as string} />}

            <PatientCreateView formSubmit={formSubmit} disabled={btnDisabled} />
        </div>
    )
}

export default PatientCreateContainer
