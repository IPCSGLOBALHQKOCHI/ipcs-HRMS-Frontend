import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OngoingTeamSignup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
        console.log(formData);
      await axios.post("http://localhost:5000/api/onboarding/onboardingsignup", formData);
      navigate("/onboardinglogin");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">Onboarding Team Signup</h2>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <form onSubmit={handleSignup} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition duration-200"
        >
          Signup
        </button>
      </form>
    </div>
  </div>
  );
};

export default OngoingTeamSignup;
