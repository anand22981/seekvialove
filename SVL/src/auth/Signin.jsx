import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "../assets/Desktop_wall.jpg";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Using password instead of OTP
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "/v1/signin",
        { emailId: email, password },
        { withCredentials: true } // important to store session cookie
      );

      if (res.data.message === "Login Successfull") {
        const role = res.data.data.role;

        if (role === "admin") {
          navigate("/admin");     // admin dashboard
        } else {
          navigate("/");          // normal user homepage
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="flex-1 flex items-center justify-center px-4 pt-28">
      <Navbar/>
      {/* Background Image */}
      <img
        src={Img}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Login Card */}
      <div className="relative bg-black/50 p-8 rounded-xl shadow-lg w-full max-w-sm text-white">
        <h2 className="text-2xl font-bold mb-4">Login to Book</h2>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-white rounded border border-gray-300"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-white rounded border border-gray-300"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-red-600 px-4 py-2 rounded font-semibold"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 font-semibold">
            Signup
          </Link>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signin;
