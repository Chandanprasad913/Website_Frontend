import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const UserProfile = () => {
  const { token, navigate, backendUrl, setToken } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user/userinfo`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        toast.error("Failed to load user data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserDetails();
    } else {
      navigate("/login");
    }
  }, [token]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/login");
      toast.success("Logged out successfully!");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Fetching your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold text-gray-700">
          No user data found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="flex flex-col items-center">
          <FaUserCircle size={80} className="mb-4 text-gray-700" />
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="mt-1 text-gray-500">{user.email}</p>

          {/* Member since */}
          {user.createdAt && (
            <p className="mt-1 text-sm text-gray-400">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}

          <div className="mt-6 flex w-full flex-col gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 active:scale-95"
            >
              <FiEdit size={20} /> Edit Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-6 py-3 text-white transition hover:bg-red-600 active:scale-95"
            >
              <RiLogoutBoxLine size={20} /> Logout
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;
