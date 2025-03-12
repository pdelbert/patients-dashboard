import { Patient } from "../../entities/patients"
import { Button, Pagination, Search, Table } from "../../components"
import { CONSTANTS } from "../../constants"

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
                    ? <>
                        <Table header={tableHeader} data={patients} />
                        <div className="flex justify-center">
                            <Pagination pagination={pagination} handlePagination={handlePagination} />
                        </div>
                    </>
                    : <h1>{CONSTANTS.NOT_FOUND}</h1>
            }


        </>
    )
}

export default PatientsView