import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { logOutAsync } from "../state/loginSlice";
import { Link } from "react-router-dom";

const NavBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { login } = useSelector((state: RootState) => state.login);

    const handleLogOut = () => dispatch(logOutAsync());

    return (
        <div className="navbar bg-base-100 shadow-sm mb-5">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Patients Dashboard</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <details>
                            <summary>{login.email}</summary>
                            <ul className="bg-base-100 rounded-t-none p-2">
                                <li><Link to="/patients">Lista de Pacientes</Link></li>
                                <li><Link to="/patients/new">Agregar Paciente</Link></li>
                                <li><a onClick={handleLogOut}>LogOut</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar