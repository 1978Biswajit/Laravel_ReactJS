import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await getUser(token);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
          localStorage.removeItem("authToken");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
