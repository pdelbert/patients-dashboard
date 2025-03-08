import { Loading } from "../../components"

interface LoginViewProps {
    formSubmit: (e: any) => void
    disabled: boolean
}

const LoginView = ({ formSubmit, disabled }: LoginViewProps) => {
    return (
        <>
            <form className="flex flex-col justify-center w-2xs" onSubmit={formSubmit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email</legend>
                    <input disabled={disabled} type="text" name="email" className="input" placeholder="Email" />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input disabled={disabled} type="password" name="password" className="input" placeholder="Password" />
                </fieldset>

                <button disabled={disabled} className="btn btn-success mt-5" type="submit">
                    {disabled ? <Loading /> : "LOGIN"}
                </button>
            </form >
        </>
    )
}

export default LoginView