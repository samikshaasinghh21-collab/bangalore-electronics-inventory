import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/inventory/dashboard");
    } catch (err) {
      alert("Login failed! Check credentials.");
    }
  };

  const handleQuickLogin = async (userType) => {
    if (userType === "user") {
      await login("user@be.com", "user123");
    } else {
      await login("admin@be.com", "admin123");
    }
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500">Or quick login</div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => handleQuickLogin("user")}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            User
          </button>
          <button
            onClick={() => handleQuickLogin("admin")}
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
