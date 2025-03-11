import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import PatientsView from "./PatientsView"
import { AppDispatch, RootState } from "../../state/store";
import { getPacientsAsync, nextPagination, prevPagination } from "../../state/patientsSlice";

import { CONSTANTS, ROUTES } from "../../constants";
import { Loading } from "../../components";
import PatientUseCase from "../../usecase/PatientUseCase";
import { Patient } from "../../entities/patients";


const PatientsContainer = () => {
    // const [pagination, setPagination] = useState<number>(1);
    const [patientsList, setPatientsList] = useState<Patient[]>([])
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { login } = useSelector((state: RootState) => state.login);
    const { patients, pagination } = useSelector((state: RootState) => state.patients);

    // fetch patients list when pagination change.
    useEffect(() => {
        dispatch(getPacientsAsync({ token: login.token as string, pagination: pagination }));
    }, [pagination]);

    useEffect(() => {
        setPatientsList(patients)
    }, [patients]);


    // Handle Filter Users.
    const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const useCaseInstance = PatientUseCase();
        if (useCaseInstance && useCaseInstance.filterPatients) {
            const response = useCaseInstance.filterPatients(e.target.value, patients);
            setPatientsList(response)
        }
    }

    // Redirect to create patient page.
    const handleAddUser = () => {
        navigate(ROUTES.PATIENT_CREATE)
    }

    const handlePagination = (action: string) => {
        action === 'next'
            ? dispatch(nextPagination())
            : dispatch(prevPagination());
    }


    // Loading Flag Pattern.
    if (!patients.length || !patientsList.length) return <Loading />;

    // Render PatientsView Component.
    return <div className=" p-6 pt-0 w-auto">
        <PatientsView
            handlerSearch={handlerSearch}
            handleAddUser={handleAddUser}
            patients={patientsList}
            tableHeader={CONSTANTS.TABLE_HEADER}
            handlePagination={handlePagination}
            pagination={pagination}
        />
    </div>
}

export default PatientsContainer
