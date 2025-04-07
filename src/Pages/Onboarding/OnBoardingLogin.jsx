import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OnboardingLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/onboarding/onboardinglogin", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "onboarding");

      navigate("/onboardingdashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">Onboarding Team Login</h2>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <form onSubmit={handleLogin} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  );
};

export default OnboardingLogin;
