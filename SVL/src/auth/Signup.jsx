import axios from "axios";
import { useState ,} from "react";
import { useNavigate } from "react-router-dom";

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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:7777/v1/signup",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data.message === "User already exists") {
                alert("User already exists! Please login.");

            } else {
                alert("Signup successful!");
                navigate('/login')
                // Optionally clear the form
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
        <div className="min-h-screen  flex items-center  justify-center bg-gray-100 ">
            <div className="relative p-6  border rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-center font-bold text-2xl ">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-3  mt-3 bg-gray">
                    <input
                        className="border w-full px-3 py-2 rounded-md"
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        required
                        placeholder="FirstName"
                    />
                    <input
                        className="border w-full px-3 py-2 rounded-md"
                        type="text"
                        name="lastName"
                        placeholder="LastName"
                        required
                        onChange={handleChange}
                    />
                    <input
                        className="border w-full px-3 py-2 rounded-md"
                        type="email"
                        name="emailId"
                        placeholder="EmailID"
                        required
                        onChange={handleChange}
                    />
                    <input
                        className="border w-full px-3 py-2 rounded-md"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                    />
                    <input
                        className="border w-full px-3 py-2 rounded-md"
                        type="date"
                        name="dob"
                        placeholder="DOB"
                        required
                        onChange={handleChange}
                    />
                    <input
                        className="border w-full px-3 py-2 rounded-md"
                        type="text"
                        name="birthPlace"
                        placeholder="BirthPlace"
                        required
                        onChange={handleChange}
                    />
                    <input
                        className="border w-full px-3 py-2 rounded-md"
                        type="time"
                        name="birthTime"
                        placeholder="BirthTime"
                        required
                        onChange={handleChange}
                    />
                    <select
                        className="border w-full px-3 py-2 rounded-md"
                        name="gender"
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">male</option>
                        <option value="female"> female</option>
                        <option value="others">others</option>
                    </select>
                    <button
                        type="submit"
                        className="border w-full bg-blue-600 py-2 text-white rounded-md hover:bg-blue-800 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
