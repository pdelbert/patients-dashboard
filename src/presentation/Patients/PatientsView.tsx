import { Patient } from "../../entities/patients"
import { Button, Search, Table } from "../../components"
import { CONSTANTS } from "../../constants"

interface PatientsViewProps {
    patients: Patient[]
    tableHeader: string[]
    handleAddUser: () => void
    handlerSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
    handlePagination: (action: string) => void
}

const PatientsView = ({ patients, tableHeader, handlerSearch, handleAddUser, handlePagination }: PatientsViewProps) => {
    return (
        <>
            <div className="flex justify-between mt-6">
                <Search handlerSearch={handlerSearch} />
                <Button
                    className="btn-primary"
                    text="Agregar Paciente"
                    onClick={handleAddUser}
                />
            </div>

            <div className="divider"></div>

            {
                patients.length
                    ? <Table header={tableHeader} data={patients} handlePagination={handlePagination} />
                    : <h1>{CONSTANTS.NOT_FOUND}</h1>
            }


        </>
    )
}

export default PatientsView