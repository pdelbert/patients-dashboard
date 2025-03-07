import { Loading } from "../../components"

interface LoginViewProps {
    formSubmit: (e: any) => void
    btnDisabled: boolean
}

const LoginView = ({ formSubmit, btnDisabled }: LoginViewProps) => {
    return (
        <>
            <form className="flex flex-col justify-center w-2xs" onSubmit={formSubmit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email</legend>
                    <input type="text" name="email" className="input" placeholder="Email" />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input type="password" name="password" className="input" placeholder="Password" />
                </fieldset>

                <button disabled={btnDisabled} className="btn btn-success mt-5" type="submit">
                    {btnDisabled ? <Loading /> : "LOGIN"}
                </button>
            </form >
        </>
    )
}

export default LoginView