import { Navigate } from "react-router";
import { useAuthContext } from "../context/authContext";
const ModPage = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user?.authorities.includes("ROLES_MODERATOR")) {
    return children;
  }
  return <Navigate to="/notAllowed" />;
};

export default ModPage;
