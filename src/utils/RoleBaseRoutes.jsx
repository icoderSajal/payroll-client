import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleBaseRoutes = ({ children, requireRole }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!requireRole.includes(user.role)) {
    <Navigate to="/unautorized" />;
  }
  
  return user ? children : <Navigate to="/login" />;
};

export default RoleBaseRoutes;
