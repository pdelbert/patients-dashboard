import { Loading } from "../../components"

interface AddPatientViewProps {
    formSubmit: (e: any) => void
    btnDisabled: boolean
}


const AddPatientView = ({ formSubmit, btnDisabled }: AddPatientViewProps) => {
    return (
        <>
            <form className="flex flex-col justify-center w-2xs" onSubmit={formSubmit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Nombre</legend>
                    <input type="text" name="name" className="input" placeholder="Type here" />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Apellido</legend>
                    <input type="text" name="last_name" className="input" placeholder="Type here" />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email</legend>
                    <input type="text" name="email" className="input" placeholder="Type here" />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">CURP</legend>
                    <input type="text" name="curp" className="input" placeholder="Type here" />
                </fieldset>

                <button disabled={btnDisabled} className="btn btn-success mt-5" type="submit">
                    {btnDisabled ? <Loading /> : "AGREGAR PACIENTE"}
                </button>
            </form >
        </>
    )
}

export default AddPatientView