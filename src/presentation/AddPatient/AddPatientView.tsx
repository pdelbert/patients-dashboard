import { Button } from "../../components"

interface AddPatientViewProps {
    formSubmit: (e: any) => void
    disabled: boolean
}


const AddPatientView = ({ formSubmit, disabled }: AddPatientViewProps) => {
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

                <Button
                    disabled={disabled}
                    text="AGREGAR PACIENTE"
                    className="btn-success mt-5"
                />
            </form >
        </>
    )
}

export default AddPatientView