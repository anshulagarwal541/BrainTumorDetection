import { AuthContext } from "./utils/AuthContext.js"
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import Home from "./pages/Home.jsx"
import AddPatient from "./pages/Admin/AddPatient.jsx";
import AdminMainLayout from "./pages/Admin/AdminMainLayout.jsx";
import AdminHome from "./pages/Admin/AdminHome.jsx";
import ViewPatients from "./pages/Admin/ViewPatients.jsx";
import UserLogin from "./pages/Auth/UserLogin.jsx";
import AdminLogin from "./pages/Auth/AdminLogin.jsx";
import { useState } from "react";
import UserRegister from "./pages/Auth/UserRegister.jsx";
import AdminUserMainLayout from "./pages/Admin/Patient/AdminUserMainLayout.jsx";
import AdminUserHome from "./pages/Admin/Patient/AdminUserHome.jsx";
import PatientReportGenerate from "./pages/Admin/Patient/PatientReportGenerate.jsx";
import PatientChat from "./pages/Admin/Patient/PatientChat.jsx";
import WriteMessage from "./pages/Admin/Patient/WriteMessage.jsx";
import PatientReports from "./pages/Admin/Patient/PatientReports.jsx";
import UserMainLayout from "./pages/User/UserMainLayout.jsx";
import UserHome from "./pages/User/UserHome.jsx";
import UserChat from "./pages/User/UserChat.jsx";
import UserReports from "./pages/User/UserReports.jsx";
import UserGnerateReports from "./pages/User/UserGenerateReport.jsx";
import UserUpdateDetails from "./pages/User/UserUpdateDetails.jsx";
import PasswordChange from "./pages/User/PasswordChange.jsx";
import Admin2MainLayout from "./pages/Admin2 (Updated)/Admin2MainLayout.jsx";
import Admin2Home from "./pages/Admin2 (Updated)/Admin2Home.jsx";
import DoctorLogin from "./pages/Auth/DoctorLogin.jsx";
import Add2Doctor from "./pages/Admin2 (Updated)/Add2Doctor.jsx";
import View2Patients from "./pages/Admin2 (Updated)/View2Patients.jsx";
import View2Doctors from "./pages/Admin2 (Updated)/View2Doctors.jsx";

function App() {
  const url = "https://braintumordetection-backend.onrender.com";
  // const url = "http://localhost:8080";
  const [error, setError] = useState(false);
  const [errorType, setErrorType] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage
      }}
    >
      <Router>
        <Routes>

          // global home route
          <Route path="/" element={<Home />} />

          // doctor pages
          <Route path="/doctor" element={<AdminMainLayout />}>
            <Route path="" element={<AdminHome />} />
            <Route path="addPatient" element={<AddPatient />} />
            <Route path="viewPatients" element={<ViewPatients />} />
          </Route>

          // admin pages
          <Route path="/admin" element={<Admin2MainLayout />}>
            <Route path="" element={<Admin2Home />} />
            <Route path="addDoctor" element={<Add2Doctor />} />
            <Route path="viewPatients" element={<View2Patients />} />
            <Route path="viewDoctors" element={<View2Doctors />} />
          </Route>

          // user pages
          <Route path="/user" element={<UserMainLayout />}>
            <Route path="" element={<UserHome />} />
            <Route path="chats" element={<UserChat />} />
            <Route path="reports" element={<UserReports />} />
            <Route path="generateReport" element={<UserGnerateReports />} />
            <Route path="update/details" element={<UserUpdateDetails />} />
            <Route path="changePassword" element={<PasswordChange/>}/>
          </Route>

          // doctor-user pages
          <Route path="/doctor/user/:statusId" element={<AdminUserMainLayout />}>
            <Route path="" element={<AdminUserHome />} />
            <Route path="generateReport" element={<PatientReportGenerate />} />
            <Route path="reports" element={<PatientReports />} />
            <Route path="queries" element={<PatientChat />} />
            <Route path="write/message" element={<WriteMessage />} />
          </Route>

          // login routes
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login/user" element={<UserLogin />} />
          <Route path="/login/doctor" element={<DoctorLogin />} />
          <Route path="/register/user" element={<UserRegister />} />

        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
