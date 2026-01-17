import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import img from "../assets/Desktop_wall.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [service, setService] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Check session
        const sessionRes = await axios.get("http://localhost:7777/v1/checkSession", {
          withCredentials: true,
        });

        if (!sessionRes.data.loggedIn) {
          navigate("/login");
          return;
        }

        // Set selected service if navigated from Home
        if (location.state?.service) {
          setService(location.state.service);
        }

        // Fetch user bookings
        const bookingRes = await axios.get("http://localhost:7777/v1/booking", {
          withCredentials: true,
        });

        if (bookingRes.data.success) {
          setBookings(bookingRes.data.data);
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [location.state, navigate]);

  if (loading) return <p className="text-white text-center mt-12">Loading...</p>;

  // UPI link generator
  const generateUPILink = (service) => {
    const UPI_VPA = "7361015759@ybl";
    const UPI_NAME = "Anisha Jha";
    const UPI_AMOUNT =
      typeof service.price === "number"
        ? service.price
        : Number(service.price.toString().replace(/[₹\s]/g, ""));
    const UPI_NOTE = encodeURIComponent(service.title);
    return `upi://pay?pa=${UPI_VPA}&pn=${encodeURIComponent(
      UPI_NAME
    )}&am=${UPI_AMOUNT}&cu=INR&tn=${UPI_NOTE}`;
  };

  // Book service & redirect to UPI
  const handleBooking = async () => {
    if (!service) return;

    try {
      setBookingLoading(true);
      const res = await axios.post(
        "http://localhost:7777/v1/booking",
        { serviceId: service._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("Booking successful! Redirecting to UPI payment...");
        setBookings([res.data.data, ...bookings]); // update bookings
        window.location.href = generateUPILink(service);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed. Try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div
      className="text-white min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <Navbar />

      {/* <h1 className="font-bold text-center text-3xl py-12 px-6">Booking Page</h1> */}

      {/* Selected Service Booking */}
      {service && (
        <div className="flex mt-3 items-center justify-center">
          <div className="relative bg-white text-black max-w-sm shadow-lg mt-4 border p-8 rounded-xl w-full">
            <img
              src={service.image}
              alt={service.title}
              className="rounded w-full h-56 object-cover mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
            <p className="text-xl font-semibold mb-4">Price: ₹{service.price}</p>

            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className={`text-white mt-4 bg-red-600 px-6 py-2 rounded font-semibold w-full ${
                bookingLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {bookingLoading ? "Processing..." : "Pay Via UPI"}
            </button>
          </div>
        </div>
      )}

      {/* Booking History Section */}
      <div className="max-w-6xl mx-auto mt-16 px-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Booking History</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => {
            const bookedService = booking.service;
            const bookedAt = new Date(booking.createdAt).toLocaleString();

            return (
              <div
                key={booking._id}
                className="bg-white text-black rounded-xl shadow-lg p-6 flex flex-col items-center"
              >
                <img
                  src={bookedService.image}
                  alt={bookedService.title}
                  className="rounded w-full h-48 object-cover mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{bookedService.title}</h3>
                <p className="mb-2 font-semibold">Price: ₹{bookedService.price}</p>
                <p className="mb-4 text-gray-600">Booked on: {bookedAt}</p>
                {/* No button for booking history */}
              </div>
            );
          })}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Booking;
