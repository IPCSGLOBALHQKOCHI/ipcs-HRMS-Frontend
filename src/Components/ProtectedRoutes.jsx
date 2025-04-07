import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // Assuming role is stored in local storage

  if (!token) {
    switch (role) {
      case "hr":
        return <Navigate to="/hrlogin" replace />;
      case "onboarding":
        return <Navigate to="/onboardinglogin" replace />;
        case "recuriter":
          return <Navigate to="/recuriterlogin" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoutes;
