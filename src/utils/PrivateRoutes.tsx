import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
  const token = true;
  return token ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes