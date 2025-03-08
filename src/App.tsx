import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ROUTES } from './constants';
import PrivateRoutes from "./utils/PrivateRoutes"

import {
  LoginPage,
  PatientCreatePage,
  PatientUpdatePage,
  PatientsPage
} from "./pages"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<PatientsPage />} path={ROUTES.PATIENTS} />
            <Route element={<PatientCreatePage />} path={ROUTES.PATIENT_CREATE} />
            <Route element={<PatientUpdatePage />} path={ROUTES.PATIENT_UPDATE} />
          </Route>
          <Route element={<LoginPage />} path="/" />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
