import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
      <button className="mt-4 bg-red-500 text-white px-4 py-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
