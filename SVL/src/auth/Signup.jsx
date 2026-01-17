import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Img from "../assets/Desktop_wall.jpg";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    dob: "",
    birthPlace: "",
    birthTime: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:7777/v1/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.message === "User already exists") {
        alert("User already exists! Please login.");
      } else {
        alert("Signup successful!");
        navigate("/login");

        // Clear form
        setFormData({
          firstName: "",
          lastName: "",
          emailId: "",
          password: "",
          dob: "",
          birthPlace: "",
          birthTime: "",
          gender: "",
        });
      }
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background Image */}
      <img
        src={Img}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Form Card */}
      <div className="relative z-10 p-6 bg-black/70 border rounded-xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-center font-bold text-2xl mb-4">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-3 ">
          <input
            className="w-full px-3 py-2 border border-bg rounded-md text-white"
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            className="w-full px-3 py-2 border border-bg rounded-md text-white"
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            className="w-full px-3 py-2 border border-bg rounded-md text-white"
            type="email"
            name="emailId"
            placeholder="Email ID"
            required
            value={formData.emailId}
            onChange={handleChange}
          />
          <input
            className="w-full px-3 py-2 border border-bg rounded-md text-white"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="w-full px-3 py-2 border border-bg rounded-md text-white"
            type="date"
            name="dob"
            placeholder="DOB"
            required
            value={formData.dob}
            onChange={handleChange}
          />
          <input
            className="w-full px-3 py-2 border border-bg rounded-md text-white"
            type="text"
            name="birthPlace"
            placeholder="Birth Place"
            required
            value={formData.birthPlace}
            onChange={handleChange}
          />
          <input
            className="w-full px-3 py-2 border border-bg rounded-md text-white"
            type="time"
            name="birthTime"
            placeholder="Birth Time"
            required
            value={formData.birthTime}
            onChange={handleChange}
          />
          <select
            className="w-full px-3 py-2 border border-bg rounded-md text-white"
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 py-2 border border-bg rounded-md hover:bg-blue-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
