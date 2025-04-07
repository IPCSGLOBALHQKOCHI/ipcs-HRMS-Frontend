import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RecuriterLogin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post("http://localhost:5000/api/recuriter/recuriterlogin", formData);
        localStorage.setItem("token", data.token); 
        navigate("/recuriterdashboard");
      } catch (err) {
        setError(err.response?.data?.message || "Login failed!");
      }
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">Recuriter Login</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-2 border rounded" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-2 border rounded" onChange={handleChange} required />
            <button type="submit" className="w-full bg-yellow-700 text-white py-2 rounded">Login</button>
          </form>
          <p className="text-center mt-3 text-sm">Don't have an account? <a href="/recuritersignup" className="text-blue-500">Signup</a></p>
        </div>
      </div>
    );
  };

export default RecuriterLogin
