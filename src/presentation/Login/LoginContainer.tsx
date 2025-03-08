import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Login } from '../../entities/login';

import { loginAsync } from "../../state/loginSlice";
import { AppDispatch, RootState } from "../../state/store";

import LoginView from "./LoginView"
import { Alert } from "../../components";
import { loginSchema } from "../../zod";
import { PacientsMessageResponse } from "../../entities/patients";
import { CONSTANTS } from "../../constants";


const LoginContainer = () => {
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { login } = useSelector((state: RootState) => state.login);
    const [patientResponse, setPatientsResponse] = useState<PacientsMessageResponse | null>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisabled(false);
            setPatientsResponse(null);
        }, CONSTANTS.TIMER);

        return () => clearTimeout(timer);
    }, [patientResponse])


    const formSubmit = async (e: any) => {
        e.preventDefault();

        setDisabled(true);

        const formData = new FormData(e.target);
        const formEntries: Login = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        };

        const response = loginSchema.safeParse(formEntries);

        (response.success)
            ? dispatch(loginAsync(formEntries))
            : setPatientsResponse({ message: 'Input Error', className: 'alert-error' });

    }


    // Redirect to /patients if token exists.
    if (login.token) { navigate('/patients') };


    // Render LoginView if token does not exist.
    return <>
        {patientResponse?.message &&
            <Alert
                title={patientResponse.message}
                className={patientResponse.className as string} />}

        <LoginView formSubmit={formSubmit} disabled={disabled} />
    </>
}

export default LoginContainer