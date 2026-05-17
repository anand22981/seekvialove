import "./App.css";
import Home from "./pages/Home";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Booking from "./pages/Bookings";
import Protectedroute from "./components/Protectedroute";
import AdminDashboard from "./pages/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route
          path="/booking"
          element={
            <Protectedroute>
              <Booking />
            </Protectedroute>
          }
        />
         <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
