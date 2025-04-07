import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import HrLogin from "./Pages/Hr/HrLogin";
import HrSignup from "./Pages/Hr/HrSignup";
import HrDashboard from "./Pages/Hr/HrDashboard";
import OnboardingDashboard from "./Pages/Onboarding/OnBoardingDashboard";
import OnboardingLogin from "./Pages/Onboarding/OnBoardingLogin";
import OngoingTeamSignup from "./Pages/Onboarding/OnBoardingSignup";
import RecuriterDashboard from "./Pages/Recuriter/RecuriterDashboard";
import RecuriterLogin from "./Pages/Recuriter/RecuriterLogin";
import RecuriterSignup from "./Pages/Recuriter/RecuriterSignup";
import AddEmployeeForm from "./Components/addEmployeeForm";
import ProtectedRoutes from "./Components/ProtectedRoutes";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/hrsignup" element={<HrSignup />} />
        <Route path="/hrlogin" element={<HrLogin />} />
        <Route path="/onboardinglogin" element={<OnboardingLogin />} />
        <Route path="/onboardingsignup" element={<OngoingTeamSignup />} />
        <Route path="/recuritersignup" element={<RecuriterSignup />} />
        <Route path="/recuriterlogin" element={<RecuriterLogin />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/hrdashboard" element={<HrDashboard />} />
          <Route path="/onboardingdashboard" element={<OnboardingDashboard />} />
          <Route path="/recuriterdashboard" element={<RecuriterDashboard />} />
          <Route path="/recuriteraddemployee" element={<AddEmployeeForm />} />  
        </Route>{" "}
      </Routes>
    </Router>
  );
}

export default App;
