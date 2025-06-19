import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) return null; // o un spinner mientras carga
    
  if (!user) {
    // Si no hay usuario, redirigir al login
    return  <Navigate to="/" replace /> ;
    
  }

  return children; // Si hay usuario, mostrar contenido protegido
}

export default ProtectedRoute;
