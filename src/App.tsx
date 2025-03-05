import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginPage, PatientAddPage, PatientInfoPage, PatientsPage } from "./pages"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginPage />} path="/" />
          <Route element={<PatientsPage />} path="/patients" />
          <Route element={<PatientInfoPage />} path="/patients-info" />
          <Route element={<PatientAddPage />} path="/patients/new" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
