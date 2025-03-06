import { Link } from "react-router"
import { Patient } from "../entities/patients"

interface TableProps {
    header: string[]
    data: Patient[]
}

const Table = ({ header, data }: TableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        {header.map((h, i) => <th key={i}>{h}</th>)}
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
                                <td>
                                    <Link to={`/patients/${d.id}`} ><button className="btn btn-accent mr-3">Ver</button></Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table