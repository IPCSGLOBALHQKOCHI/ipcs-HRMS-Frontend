import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HrDashboard = () => {
  const [hrData, setHrData] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHrProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/hrlogin"); 
        return;
      }

      try {
        const { data } = await axios.get("http://localhost:5000/api/hr/hrdashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHrData(data.user);
        setEmployees(data.employees);
        console.log(data.employees);
        
      } catch (error) {
        console.error("Error fetching HR details:", error);
        navigate("/hrlogin");
      }
    };

    fetchHrProfile();
  }, [navigate]);

  if (!hrData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-semibold">Welcome, {hrData.name}</h1>
      <p className="text-gray-600">Email: {hrData.email}</p>

      
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
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/hrlogin");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default HrDashboard;
