import { useDispatch, useSelector } from 'react-redux';
import { PacientsMessageResponse, Patient } from '../../entities/patients';
import AddPatientView from './AddPatientView'
import { AppDispatch, RootState } from '../../state/store';
import { createPacientsAsync } from '../../state/patientsSlice';
import { Alert } from '../../components';
import { useEffect, useState } from 'react';

const AddPatientContainer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { login } = useSelector((state: RootState) => state.login);
    const { createdPatientResponse } = useSelector((state: RootState) => state.patients);
    const [patientResponse, setPatientsResponse] = useState<PacientsMessageResponse | null>(null)

    useEffect(() => {
        setPatientsResponse(createdPatientResponse)
        setTimeout(() => { setPatientsResponse(null) }, 2000);
    }, [createdPatientResponse])

    // Submit New User.
    const formSubmit = (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const formEntries: Patient = {
            name: formData.get('name') as string,
            last_name: formData.get('last_name') as string,
            email: formData.get('email') as string,
            curp: formData.get('curp') as string,
            company_id: '1',
            active: true,
            token: login.token as string
        };

        dispatch(createPacientsAsync(formEntries));
    }

    return (
        <div className=" p-6 w-auto flex justify-center items-center h-screen">
            {patientResponse?.message &&
                <Alert
                    title={createdPatientResponse.message}
                    className={createdPatientResponse.className as string} />}

            <AddPatientView formSubmit={formSubmit} />
        </div>
    )
}

export default AddPatientContainer
