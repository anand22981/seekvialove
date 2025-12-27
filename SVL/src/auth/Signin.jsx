import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Img from "../assets/791da27d-feb8-47ae-9c10-99d5c5595f3c.jpeg";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email");
  const [otp, setOtp] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleLogin = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    setStep("otp");
    console.log("Login initiated for:", email);
    // Add backend login/OTP logic here
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    // Simulate successful login
    localStorage.setItem("user", JSON.stringify({ email }));
    const redirect = localStorage.getItem("redirectAfterLogin") || "/booking";
    localStorage.removeItem("redirectAfterLogin");
    navigate(redirect);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <img
        src={Img}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Login Card */}
      <div className="relative bg-black/50 p-8 rounded-xl shadow-lg w-full max-w-sm text-white">
        {step === "email" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Login to Book</h2>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 mb-4 text-white rounded border border-gray-300"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-red-600 px-4 py-2 rounded font-semibold"
            >
              Login
            </button>
            
            <Link to = "/signup">Signup</Link>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={handleOtpChange}
              className="w-full px-3 py-2 mb-4 text-white rounded border border-gray-300"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-red-600 px-4 py-2 rounded font-semibold"
            >
              Verify OTP
            </button>

          </>
        )}
      </div>
    </div>
  );
};

export default Signin;
