import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Login, LoginMessage } from '../../entities/login';

import { loginAsync } from "../../state/loginSlice";
import { AppDispatch, RootState } from "../../state/store";

import LoginView from "./LoginView"
import { Alert } from "../../components";


const LoginContainer = () => {
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [loginResponse, setLoginResponse] = useState<LoginMessage | null>(null)
    const dispatch = useDispatch<AppDispatch>();
    const { login, loginMessage } = useSelector((state: RootState) => state.login);
    const navigate = useNavigate();

    useEffect(() => {
        setLoginResponse(loginMessage)
        setTimeout(() => {
            setBtnDisabled(false);
            setLoginResponse(null);
        }, 2000);
    }, [loginMessage])


    const formSubmit = async (e: any) => {
        e.preventDefault();

        setBtnDisabled(true);
        const formData = new FormData(e.target);
        const formEntries: Login = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        };

        dispatch(loginAsync(formEntries));
    }

    // Redirect to /patients if token exists.
    if (login.token) { navigate('/patients') };

    // Render LoginView if token does not exist.
    return <>
        {loginResponse?.text &&
            <Alert className={loginMessage.className} title={loginMessage.text} />}
        <LoginView formSubmit={formSubmit} btnDisabled={btnDisabled} />
    </>
}

export default LoginContainer