import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Disclosure,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Navbar( { hideSignup = false }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:7777/v1/checkSession", {
          withCredentials: true,
        });

        // 🔍 Debug

        if (res.data.loggedIn) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Session check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:7777/v1/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) return null; // or a spinner

  return (
    <Disclosure
  as="nav"
  className="
    fixed top-5 left-1/2 -translate-x-1/2
    w-[95%] max-w-7xl
    bg-gradient-to-r from-black to-orange-400/80
    backdrop-blur-md
    border border-white/10
    shadow-xl
    rounded-2xl
    px-4 py-2
    z-50
  "
>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="text-yellow-300 font-bold text-base sm:text-lg md:text-xl">
            SeekViaLove
            <h1 className="text-xs text-white ">Tarot & Soul Guidance</h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4">
            <Link className="text-white hover:text-white" to="/">
              Home
            </Link>
            <Link href="#services" className="text-white hover:text-black" to="/#services">
              Services
            </Link>
            <Link className="text-white hover:text-white" to="/booking">
              Bookings
            </Link>
            <span className="text-white">Contact</span>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <BellIcon className="h-6 w-6 text-gray-400" />
{/* 
            {!user && (
              <>
                <Link to="/login" className="text-white">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-black px-3 py-1 rounded text-white"
                >
                  Signup
                </Link>
              </>
            )} */}
            {!user && (
  <div className="flex items-center gap-3">
    
    <Link
      to="/login"
      className="text-white hover:text-orange-200 transition"
    >
      Login
    </Link>

    {!hideSignup && (
      <Link
        to="/signup"
        className="
          bg-black/80
          px-4 py-2
          rounded-lg
          text-white
          shadow-lg
          hover:bg-black
          transition-all
        "
      >
        Signup
      </Link>
    )}
  </div>
)}

            {user && (
              <Menu as="div" className="relative">
                <MenuButton className="text-white font-semibold">
                 {user.firstName ? `${user.firstName} ${user.lastName || ""}` : "User"}
                 
                </MenuButton>
                 
              

                <MenuItems className="absolute right-0 mt-2 w-40 bg-white rounded shadow">
                  {/* <MenuItem>
                    <button
                      onClick={() => navigate("/")}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                  </MenuItem> */}
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="md:hidden px-4 pb-4">
        <Link to="/home" className="block py-2 text-white">
          Home
        </Link>
        {!user && (
          <Link to="/login" className="block py-2 text-white">
            Login
          </Link>
        )}
      </DisclosurePanel>
    </Disclosure>
  );
}
