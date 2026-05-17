import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
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
      const res = await axios.post(
        "http://3.213.27.192:7777/v1/signup",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

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
    <div className="min-h-screen flex flex-col">
      <Navbar hideSignup={true} />
      {/* Background Image
      // <img
      //   src={Img}
      //   alt="background"
      //   className="absolute inset-0 w-full h-full object-cover z-0"
      // /> */}
      <div className="flex-1 flex justify-center px-4 pt-32 pb-10">
        {/* Form Card */}
        <div
          className="
    z-10
    w-full
    max-w-md
    p-6
    text-white
    rounded-2xl
    border border-white/10
    shadow-2xl
    bg-gradient-to-r
    from-black
    to-orange-400/80
    backdrop-blur-md
  "
        >
          <h2 className="text-center font-bold text-2xl mb-4">
            Create Account
          </h2>
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
              <option className="text-black" value="">
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>

            <button
              type="submit"
              className="
    w-full
    py-2
    rounded-lg
    bg-black/80
    hover:bg-black
    transition-all
    duration-300
    shadow-lg
    hover:scale-[1.02]
  "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
