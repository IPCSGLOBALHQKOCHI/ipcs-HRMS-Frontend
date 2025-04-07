import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RecuriterSignup() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post("http://localhost:5000/api/recuriter/recuritersignup", formData);
        alert(data.message); // Show success message
        navigate("/recuriterlogin"); // Redirect to login page
      } catch (err) {
        setError(err.response?.data?.message || "Signup failed!");
      }
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">Recuriter Signup</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" className="w-full p-2 mb-2 border rounded" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-2 border rounded" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-2 border rounded" onChange={handleChange} required />
            <button type="submit" className="w-full bg-yellow-700 text-white py-2 rounded">Signup</button>
          </form>
          <p className="text-center mt-3 text-sm">Already have an account? <a href="/recuriterlogin" className="text-blue-500">Login</a></p>
        </div>
      </div>
    );
  };
  

export default RecuriterSignup
