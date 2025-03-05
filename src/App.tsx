import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginPage, PatientAddPage, PatientInfoPage, PatientsPage } from "./pages"
import PrivateRoutes from "./utils/PrivateRoutes"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<PatientsPage />} path="/patients" />
            <Route element={<PatientInfoPage />} path="/patients-info" />
            <Route element={<PatientAddPage />} path="/patients/new" />
          </Route>
          <Route element={<LoginPage />} path="/" />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
