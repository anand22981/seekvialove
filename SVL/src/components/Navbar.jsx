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

export default function Navbar() {
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
    <Disclosure as="nav" className="bg-black">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="text-yellow-300 font-bold text-xl">
            SeekViaLove
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4">
            <Link className="text-gray-300 hover:text-white" to="/">
              Home
            </Link>
            <Link href="#services" className="text-gray-300 hover:text-white" to="/#services">
              Services
            </Link>
            <Link className="text-gray-300 hover:text-white" to="/booking">
              Bookings
            </Link>
            <span className="text-gray-300">Contact</span>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <BellIcon className="h-6 w-6 text-gray-400" />

            {!user && (
              <>
                <Link to="/login" className="text-white">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Signup
                </Link>
              </>
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
