import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <nav className="p-4 bg-blue-500 text-white">
      <Link to="/dashboard" className="mr-4">Dashboard</Link>

      {user?.role === "admin" && (
        <Link to="/admin" className="mr-4">Admin Panel</Link>
      )}

      <button onClick={handleLogout} className="bg-red-500 p-2 rounded">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
