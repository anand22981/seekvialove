import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";

// const Protectedroute = ({ children, requiredRole }) => {
//   const [loading, setLoading] = useState(true);
//   const [isAuth, setIsAuth] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const res = await api.get("/v1/checkSession");

//         const loggedIn = res.data?.loggedIn || false;
//         setIsAuth(loggedIn);

//         // Extract role from various possible response structures
//         const role = res.data?.data?.role || res.data?.role || res.data?.user?.role || null;
//         setUserRole(role);
//       } catch (error) {
//         console.error("Protectedroute session check failed:", error);
//         setIsAuth(false);
//         setUserRole(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkSession();
//   }, []);

//   if (loading) return <p className="text-white text-center mt-12">Loading...</p>;

//   if (!isAuth) {
//     // Save the intended destination so we can redirect back after login
//     sessionStorage.setItem("redirectAfterLogin", location.pathname + location.search);
//     return <Navigate to="/login" />;
//   }

//   // If a specific role is required, check that the user has it
//   if (requiredRole && userRole !== requiredRole) {
//     // User is logged in but doesn't have the required role - redirect to home
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default Protectedroute;
const Protectedroute = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        console.log("Checking frontend session...");

        const res = await api.get("/v1/checkSession", {
          withCredentials: true,
        });

        console.log("checkSession response:", res.data);

        if (!mounted) return;

        if (res.data?.loggedIn === true) {
          setIsAuth(true);

          const role =
            res.data?.user?.role ||
            res.data?.data?.role ||
            res.data?.role ||
            "user";

          setUserRole(role);
        } else {
          setIsAuth(false);
          setUserRole(null);
        }
      } catch (error) {
        console.error(
          "Frontend checkSession error:",
          error.response?.data || error.message
        );

        if (!mounted) return;

        setIsAuth(false);
        setUserRole(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <p className="text-white text-center mt-12">
        Checking login...
      </p>
    );
  }

  if (!isAuth) {
    sessionStorage.setItem(
      "redirectAfterLogin",
      location.pathname + location.search
    );

    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Protectedroute;