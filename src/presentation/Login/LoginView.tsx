interface LoginViewProps {
    formSubmit: (e: any) => void
}

const LoginView = ({ formSubmit }: LoginViewProps) => {
    return (
        <>
            <form className="flex flex-col justify-center w-2xs" onSubmit={formSubmit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email</legend>
                    <input type="text" name="email" className="input" placeholder="Type here" />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input type="password" name="password" className="input" placeholder="Type here" />
                </fieldset>

                <button className="btn btn-success mt-5" type="submit">Login</button>
            </form >
        </>
    )
}

export default LoginView