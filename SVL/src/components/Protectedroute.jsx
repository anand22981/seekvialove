import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";

const Protectedroute = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get("/v1/checkSession");

        const loggedIn = res.data?.loggedIn || false;
        setIsAuth(loggedIn);

        // Extract role from various possible response structures
        const role = res.data?.data?.role || res.data?.role || res.data?.user?.role || null;
        setUserRole(role);
      } catch (error) {
        console.error("Protectedroute session check failed:", error);
        setIsAuth(false);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  if (loading) return <p className="text-white text-center mt-12">Loading...</p>;

  if (!isAuth) {
    // Save the intended destination so we can redirect back after login
    sessionStorage.setItem("redirectAfterLogin", location.pathname + location.search);
    return <Navigate to="/login" />;
  }

  // If a specific role is required, check that the user has it
  if (requiredRole && userRole !== requiredRole) {
    // User is logged in but doesn't have the required role - redirect to home
    return <Navigate to="/" />;
  }

  return children;
};

export default Protectedroute;
