import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data); // Store user details in state
          localStorage.setItem("userRole", response.data.role); // Store role in localStorage
        } catch (error) {
          console.error("Failed to fetch user details:", error);
          localStorage.removeItem("authToken");
          setUser(null);
        }
      }
    };

    fetchUserDetails();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
