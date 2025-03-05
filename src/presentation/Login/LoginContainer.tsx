import { Login } from "../../entities/login";
import LoginView from "./LoginView"

const LoginContainer = () => {

    const formSubmit = (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formEntries: Login = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        };

        console.log(formEntries);

    }

    return <LoginView formSubmit={formSubmit} />
}

export default LoginContainer