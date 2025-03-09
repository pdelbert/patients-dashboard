export interface Login {
    email: string
    password: string
}

export interface LoginResponse {
    token: string
}

export interface LoginState {
    token: string | null
    email: string | null
}

export interface LoginMessage {
    message: string
    className: string
}

export interface ILoginState {
    login: LoginState;
    loginMessage: LoginMessage
}

export interface LoginRepository {
    login: (login: Login) => Promise<LoginResponse | null>
}
