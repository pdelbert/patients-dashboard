import { Button } from "../../components"
import { Patient } from "../../entities/patients"

interface PatientUpdateProps {
    formSubmit: (e: any) => void
    patientData: Patient | null
    setPatientData: React.Dispatch<React.SetStateAction<Patient | null>>
    disabled: boolean
}

const PatientUpdateView = ({ formSubmit, setPatientData, patientData, disabled }: PatientUpdateProps) => {
    return (
        <>
            <form className="flex flex-col justify-center w-2xs" onSubmit={formSubmit}>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Nombre</legend>
                    <input
                        type="text"
                        name="name"
                        className="input"
                        disabled={disabled}
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
                        disabled={disabled}
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
                        disabled={disabled}
                        value={patientData?.email as string}
                        onChange={(e) => setPatientData(prev => prev ? { ...prev, email: e.target.value } : prev)}
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Company ID</legend>
                    <input
                        type="text"
                        name="company_id"
                        className="input"
                        disabled={disabled}
                        value={patientData?.company_id as string}
                        onChange={(e) => setPatientData(prev => prev ? { ...prev, company_id: e.target.value } : prev)}
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">CURP</legend>
                    <input
                        type="text"
                        name="curp"
                        className="input"
                        disabled={disabled}
                        value={patientData?.curp ?? ''}
                        onChange={(e) => setPatientData(prev => prev ? { ...prev, curp: e.target.value } : prev)}
                    />
                </fieldset>

                <Button
                    disabled={disabled}
                    text="MODIFICAR PACIENTE"
                    className="btn-success mt-5"
                />

            </form >
        </>
    )
}

export default PatientUpdateView
