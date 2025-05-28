import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useContext } from "react";

const userContext = createContext();
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verfifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:8000/api/v1/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setLoading(false);
          setUser(null);
        }
      } catch (error) {
        if (error.response && !error.reponse.data.error) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    verfifyUser();
  }, []);
  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <>
      <userContext.Provider value={{ user, login, logout, loading }}>
        {children}
      </userContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(userContext);

export default AuthContext;
