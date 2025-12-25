import { Navigate } from "react-router-dom";
const Protectedroute = ({ children }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    localStorage.setItem("redirectAfterLogin", Window.location.pathname);
    return <Navigate to="/login" />;
  }

  return children;
};
export default Protectedroute;
