import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function AdminRoute({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) return null; // o spinner

  if (!user || user.role_id !== 1) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

export default AdminRoute;