import { Login, LoginResponse } from '../entities/login';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { auth } from ".";

const fireBaseSignIn = async (login:Login): Promise<LoginResponse | null> => {
    try {
    
        // Sign In With Email And Password.
        const userSignedIn: UserCredential = await signInWithEmailAndPassword(
            auth, 
            login.email as string, 
            login.password as string
        );

        // Get Access Token From Firebase.
        const userToken = await userSignedIn.user.getIdToken();

        return { token: userToken as string };
        
    } catch (error) { return null }
}

export default fireBaseSignIn;
