import { useEffect } from "react"
import { Link } from "react-router"
import { Pagination } from "./"
import { Patient } from "../entities/patients"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../state/store"
import { getPacientsAsync } from "../state/patientsSlice"


interface TableProps {
    header: string[]
    data: Patient[]
    handlePagination?: (action: string) => void
}


const Table = ({ header, data, handlePagination }: TableProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const { login } = useSelector((state: RootState) => state.login);
    const { pagination } = useSelector((state: RootState) => state.patients);

    useEffect(() => {
        dispatch(getPacientsAsync({ token: login.token as string, pagination: pagination }));
    }, [pagination]);


    return (
        <>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            {header.map((h, i) => {
                                return i < header.length - 1
                                    ? <th key={i}>{h}</th>
                                    : <th className="flex justify-end" key={i}>{h}</th>
                            }
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d, i) => (
                                <tr key={i}>
                                    <th>{d.id}</th>
                                    <td>{d.name}</td>
                                    <td>{d.last_name}</td>
                                    <td>{d.email}</td>
                                    <td>{d.company_id}</td>
                                    <td>{d.curp}</td>
                                    <td className="flex justify-end">
                                        <Link to={`/patients/${d.id}`} ><button className="btn btn-accent">Ver</button></Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                handlePagination &&
                <div className="flex justify-center">
                    <Pagination pagination={pagination} handlePagination={handlePagination} />
                </div>
            }

        </>
    )
}

export default Table
