import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendUrl } from "../App";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.success) {        
        setToken(response.data.token);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-center text-2xl font-bold mb-4">Admin Panel</h1>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-bold text-gray-700 mb-2">
              Email Address:
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded w-full px-3 py-2 border border-gray-300 outline-none placeholder:text-gray-400 text-sm"
              type="email"
              placeholder="your@gmail.com"
              required
            />
          </div>

          <div className="mb-3 min-w-72">
            <p className="text-sm font-bold text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="placeholder:text-gray-400 text-sm rounded w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 cursor-pointer transition duration-300 ease-in-out active:scale-95 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
