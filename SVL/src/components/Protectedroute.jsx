import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Protectedroute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:7777/v1/checkSession", {
          withCredentials: true, // important to send cookies
        });
        if (res.data.loggedIn) setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
        error.message
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  if (loading) return <p className="text-white text-center mt-12">Loading...</p>;

  return isAuth ? children : <Navigate to="/login" />;
};

export default Protectedroute;
