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
    const [patientsList, setPatientsList] = useState<Patient[]>([])
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { login } = useSelector((state: RootState) => state.login);
    const { patients } = useSelector((state: RootState) => state.patients);

    // On Mount, fetch patients list.
    useEffect(() => {
        dispatch(getPacientsAsync(login.token as string));
    }, []);

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


    // Loading Flag Pattern.
    if (!patients.length) return <Loading />;

    // Render PatientsView Component.
    return <div className=" p-6 w-auto">
        <PatientsView
            handlerSearch={handlerSearch}
            handleAddUser={handleAddUser}
            patients={patientsList}
            tableHeader={CONSTANTS.TABLE_HEADER}
        />
    </div>
}

export default PatientsContainer
