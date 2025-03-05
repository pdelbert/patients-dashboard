import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'
import { RootState } from '../state/store';

const PrivateRoutes = () => {
  const login = useSelector((state: RootState) => state.login);
  return login.token ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes