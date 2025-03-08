import { Patient } from "../../entities/patients"
import { Button, Pagination, Search, Table } from "../../components"

interface PatientsViewProps {
    patients: Patient[]
    tableHeader: string[]
    pagination: number
    handleAddUser: () => void
    handlerSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
    handlePagination: (action: string) => void
}

const PatientsView = ({ patients, tableHeader, handlerSearch, handleAddUser, handlePagination, pagination }: PatientsViewProps) => {
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

            <div className="flex justify-center">
                <Pagination
                    pagination={pagination}
                    handlePagination={handlePagination} />
            </div>

        </>
    )
}

export default PatientsView