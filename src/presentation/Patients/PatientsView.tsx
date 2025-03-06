import { Button, Search, Table } from "../../components"
import { Patient } from "../../entities/patients"

interface PatientsViewProps {
    patients: Patient[]
    tableHeader: string[]
    handleAddUser: () => void
    handlerSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PatientsView = ({ patients, tableHeader, handlerSearch, handleAddUser }: PatientsViewProps) => {
    return (
        <>
            <div className="flex  justify-between m-4">
                <Search handlerSearch={handlerSearch} />
                <Button
                    className="btn-primary"
                    text="Agregar Paciente"
                    onClick={handleAddUser}
                />
            </div>

            <div className="divider"></div>

            <Table header={tableHeader} data={patients} />
        </>
    )
}

export default PatientsView