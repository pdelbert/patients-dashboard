import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../state/loginSlice";
import { resetPagination } from "../state/patientsSlice";
import { AppDispatch, RootState } from "../state/store";

const NavBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { login } = useSelector((state: RootState) => state.login);

    const handleLogOut = () => {
        dispatch(logOut());
        dispatch(resetPagination());
    };

    return (
        <div className="navbar sticky top-0 bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Patients Dashboard</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <details>
                            <summary>{login.email}</summary>
                            <ul className="bg-base-100 w-full border border-gray-500 rounded-t-none">
                                <li><Link to="/patients">Lista de Pacientes</Link></li>
                                <li><Link to="/patients/new">Agregar Paciente</Link></li>
                                <li><a onClick={handleLogOut}>Cerrar Sesion</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar