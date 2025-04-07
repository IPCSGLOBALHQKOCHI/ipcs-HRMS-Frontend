import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OnboardingDashboard = () => {
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Sending Token:", token); // Debugging

      if (!token) {
        navigate("/onboarding/onboardinglogin");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/onboarding/onboardingdashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUser(response.data.user); // Store user data
        setEmployees(response.data.employees); // Store employees separately
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
        setError("Failed to fetch user data.");
        localStorage.removeItem("token");
        navigate("/onboarding/onboardinglogin");
      }
    };

    fetchUser();
  }, [navigate]);

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!user)
    return <p className="text-center text-gray-700 mt-4">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name}</h2>
      <p className="text-gray-600 mb-6">Email: {user.email}</p>

      <h1 className="text-xl font-semibold text-gray-700 mb-4">
        Employees List
      </h1>
      {employees.length > 0 ? (
        <ul className="space-y-3">
          {employees.map((employee) => (
            <li
              key={employee._id}
              className="bg-gray-100 p-3 rounded-md shadow-sm flex justify-between items-center"
            >
              <div className="text-left">
                <p className="text-gray-800 font-medium">
                  Name : {employee.fullName}
                </p>
                <p className="text-gray-500 text-sm">email : {employee.email}</p>
                <p className="text-gray-500 text-sm">position : {employee.position}</p>
                <p className="text-gray-500 text-sm">
                  recuritingstatus : {employee.recuritingstatus}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No employees found.</p>
      )}

      <button
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition duration-200"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/onboardinglogin");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default OnboardingDashboard;
