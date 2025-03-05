import LoginRepositoryImpl from "../infrastructure/LoginRepositoryImpl";
import { Login, LoginRepository, LoginResponse } from "../entities/login";

const LoginUseCase = (): LoginRepository => ({
    login: async (login: Login): Promise<LoginResponse | null> => {
        return await LoginRepositoryImpl().login(login);
    }
})

export default LoginUseCase;
