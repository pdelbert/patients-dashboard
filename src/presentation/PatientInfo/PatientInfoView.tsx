import { Loading } from "../../components"
import { Patient } from "../../entities/patients"

interface PatientInfoViewProps {
    formSubmit: (e: any) => void
    patientData: Patient | null
    setPatientData: React.Dispatch<React.SetStateAction<Patient | null>>
    btnDisabled: boolean
}

const PatientInfoView = ({ formSubmit, setPatientData, patientData, btnDisabled }: PatientInfoViewProps) => {
    return (
        <>
            <form className="flex flex-col justify-center w-2xs" onSubmit={formSubmit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Nombre</legend>
                    <input
                        type="text"
                        name="name"
                        className="input"
                        value={patientData?.name as string}
                        onChange={(e) => setPatientData(prev => prev ? { ...prev, name: e.target.value } : prev)}
                        placeholder="Type here" />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Apellido</legend>
                    <input
                        type="text"
                        name="last_name"
                        className="input"
                        placeholder="Type here"
                        value={patientData?.last_name as string}
                        onChange={(e) => setPatientData(prev => prev ? { ...prev, last_name: e.target.value } : prev)}
                    />

                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email</legend>
                    <input
                        type="text"
                        name="email"
                        className="input"
                        placeholder="Type here"
                        value={patientData?.email as string}
                        onChange={(e) => setPatientData(prev => prev ? { ...prev, email: e.target.value } : prev)}
                    />

                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">CURP</legend>
                    <input
                        type="text"
                        name="curp"
                        className="input"
                        placeholder="Type here"
                        value={patientData?.curp as string}
                        onChange={(e) => setPatientData(prev => prev ? { ...prev, curp: e.target.value } : prev)}
                    />
                </fieldset>

                <button disabled={btnDisabled} className="btn btn-success mt-5" type="submit">
                    {btnDisabled ? <Loading /> : "MODIFICAR PACIENTE"}
                </button>
            </form >
        </>
    )
}

export default PatientInfoView
