import { useDispatch, useSelector } from "react-redux";
import PatientsView from "./PatientsView"
import { AppDispatch, RootState } from "../../state/store";
import { getPacientsAsync } from "../../state/patientsSlice";
import { useEffect, useState } from "react";
import { CONSTANTS, ROUTES } from "../../constants";
import { Loading } from "../../components";
import PatientUseCase from "../../usecase/PatientUseCase";
import { Patient } from "../../entities/patients";
import { useNavigate } from 'react-router-dom';


const PatientsContainer = () => {
    const [pagination, setPagination] = useState<number>(1);
    const [patientsList, setPatientsList] = useState<Patient[]>([])
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { login } = useSelector((state: RootState) => state.login);
    const { patients } = useSelector((state: RootState) => state.patients);

    // fetch patients list.
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

    // Redirect to add user page.
    const handleAddUser = () => {
        navigate(ROUTES.PATIENTS_ADD)
    }

    const handlePagination = (action: string) => {
        setPagination(prev => action === 'prev' ? Math.max(prev -= 1, 1) : prev += 1);
    }


    // Loading Flag Pattern.
    if (!patients.length) return <Loading />;

    // Render PatientsView Component.
    return <div className=" p-6 w-auto">
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
