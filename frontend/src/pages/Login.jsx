import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl, cartItems } =
    useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        currentState === "Sign Up"
          ? `${backendUrl}/api/user/register`
          : `${backendUrl}/api/user/login`;

      const payload =
        currentState === "Sign Up"
          ? { name, email, password }
          : { email, password };

      const response = await axios.post(endpoint, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && navigate) {
      const isCartNotEmpty = Object.keys(cartItems).length > 0;
      if (isCartNotEmpty) {
        navigate("/cart");
      } else {
        navigate("/");
      }
    }
  }, [token, navigate, cartItems]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="m-auto mt-14 flex w-[90%] flex-col items-center gap-4 text-gray-800 sm:max-w-96"
    >
      <div className="mt-10 mb-2 inline-flex items-center gap-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="h-[1.5px] w-8 border-none bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full rounded border border-gray-800 px-3 py-2"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full rounded border border-gray-800 px-3 py-2"
        placeholder="Email"
        required
      />

      {/* 👁️ Password Input with Eye Icon */}
      <div className="relative w-full">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={showPassword ? "text" : "password"}
          className="w-full rounded border border-gray-800 px-3 py-2 pr-10"
          placeholder="Password"
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-2.5 right-3 cursor-pointer text-gray-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <div className="mt-[-8px] flex w-full justify-between text-sm">
        <p className="cursor-pointer">Forgot password?</p>
        <p
          onClick={() =>
            setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
          }
          className="cursor-pointer text-blue-600 underline"
        >
          {currentState === "Login"
            ? "Create an account"
            : "Already have an account? Login"}
        </p>
      </div>

      <button
        disabled={loading}
        className="mt-2 w-full cursor-pointer rounded border border-gray-800 bg-black px-3 py-2 text-white disabled:opacity-50"
      >
        {loading
          ? "Please wait..."
          : currentState === "Login"
            ? "Sign In"
            : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
