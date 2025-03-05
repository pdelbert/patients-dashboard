import  {REQUEST_URL} from "../constants";
import fireBaseSignIn from "../firebase/fireBaseSignIn"
import { Login, LoginRepository, LoginResponse } from "../entities/login"

const LoginRepositoryImpl = (): LoginRepository => ({

    login: async (login: Login): Promise<LoginResponse | null> => {
        
        // Get User From Firebase.
        const user = await fireBaseSignIn(login);
        if(!user) return null;
        
        const requestBody = {
            "token": user?.token,
            "expoPushToken": "test",
            "scope": "test"
        };

        try {
            const response = await fetch(REQUEST_URL.LOGIN, {
                method: 'POST',
                headers: REQUEST_URL.HEADERS,
                body: JSON.stringify(requestBody)
            });
    
            const data = await response.json();
            
            return { token: data.access_token }
            
        } catch (error) { return null; }
    }
})

export default LoginRepositoryImpl;
