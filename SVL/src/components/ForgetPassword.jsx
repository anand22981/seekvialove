import { useState } from "react";
import axios from "axios";
import api from "../utils/api";


function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [emailId, setEmailId] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // STEP 1: Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!emailId) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${api}/v1/forgot-password`,
        {
          emailId,
        }
      );

      setMessage(response.data.message);
      setStep(2);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${api}/v1/verify-reset-otp`,
        {
          emailId,
          otp,
        }
      );

      setMessage(response.data.message);
      setStep(3);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Reset password
  const resetPassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!newPassword) {
      setError("Please enter a new password");
      return;
    }

    if (newPassword.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${api}/v1/resetPassword`,
        {
          emailId,
          otp,
          newPassword,
        }
      );

      setMessage(response.data.message);

      // Reset form after successful password reset
      setEmailId("");
      setOtp("");
      setNewPassword("");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>

      {message && (
        <p style={{ color: "green" }}>
          {message}
        </p>
      )}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <form onSubmit={sendOtp}>
          <input
            type="email"
            placeholder="Enter your email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <form onSubmit={verifyOtp}>
          <p>
            OTP sent to <strong>{emailId}</strong>
          </p>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <form onSubmit={resetPassword}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
