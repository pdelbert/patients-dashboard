import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ROUTES } from './constants';
import PrivateRoutes from "./utils/PrivateRoutes"

import {
  LoginPage,
  PatientAddPage,
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
            <Route element={<PatientAddPage />} path={ROUTES.PATIENTS_ADD} />
            <Route element={<PatientUpdatePage />} path={ROUTES.PATIENT_UPDATE} />
          </Route>
          <Route element={<LoginPage />} path="/" />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
