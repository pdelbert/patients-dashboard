import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../entities/login";
import LoginView from "./LoginView"
import { AppDispatch, RootState } from "../../state/store";
import { loginAsync } from "../../state/loginSlice";
import { useNavigate } from "react-router-dom";

const LoginContainer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { login } = useSelector((state: RootState) => state.login);
    const navigate = useNavigate();

    const formSubmit = (e: any) => {
        e.preventDefault();

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
    return <LoginView formSubmit={formSubmit} />
}

export default LoginContainer