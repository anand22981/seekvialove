import "./App.css";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Booking from "./pages/Bookings";
import Protectedroute from "./components/Protectedroute";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const AnimatedPage = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Signin /></AnimatedPage>} />
        <Route path="/signup" element={<AnimatedPage><Signup /></AnimatedPage>} />
        <Route
          path="/booking"
          element={
            <Protectedroute>
              <AnimatedPage><Booking /></AnimatedPage>
            </Protectedroute>
          }
        />
        <Route
          path="/profile"
          element={
            <Protectedroute>
              <AnimatedPage><Profile /></AnimatedPage>
            </Protectedroute>
          }
        />
        <Route
          path="/admin"
          element={
            <Protectedroute requiredRole="admin">
              <AnimatedPage><AdminDashboard /></AnimatedPage>
            </Protectedroute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;