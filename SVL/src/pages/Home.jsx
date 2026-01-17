import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import img from "../assets/Desktop_wall.jpg";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:7777/v1/serviceList");
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  const handleBookNow = (service) => {
    navigate("/booking", { state: { service } });
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${img})` }}
    >
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-screen text-black flex items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 z-10">
          <h1 className="font-bold text-yellow-300 text-4xl md:text-5xl lg:text-6xl text-center md:text-left leading-tight [text-shadow:_2px_2px_6px_black]">
            Seek via Love{" "}
            <span className="block text-xl text-white sm:text-2xl md:text-3xl">
              Tarot & Soul Guidance
            </span>
          </h1>

          <div className="w-full max-w-sm mx-auto rounded-xl shadow-lg p-6 bg-cover bg-center text-white [text-shadow:_2px_2px_9px_black]">
            <p className="mb-4 font-bold">
              When life feels confusing, the cards speak clarity. I am Anisha Jha — an intuitive tarot reader and soul guide. I guide you toward understanding, healing, and empowered choices.
            </p>

            <ul className="space-y-2 mb-6">
              <li>✨ Non-judgmental</li>
              <li>✨ Confidential & compassionate</li>
              <li>✨ Energy-based, soul-led readings</li>
            </ul>

            <a href="#services">
              <button className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold">
                👉 Book a Reading
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-12 px-6">
        <h2 className="font-bold text-white text-center text-3xl py-12">
          🃏 Tarot Readings & Services
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((serviceItem) => (
            <div
              key={serviceItem._id}
              className="w-full max-w-sm mx-auto rounded-xl shadow-lg p-6 bg-cover bg-center text-white [text-shadow:_2px_2px_8px_black]"
              style={{ backgroundImage: `url(${serviceItem.image})` }}
            >
              <h3 className="text-xl font-bold mb-3 text-yellow-400">{serviceItem.title}</h3>
              <p className="mb-4">{serviceItem.description}</p>
              <p className="text-sm mb-2"><strong>Ideal for:</strong> {serviceItem.ideal}</p>
              <p className="text-sm mb-2"><strong>Duration:</strong> {serviceItem.duration}</p>
              <p className="text-sm mb-2"><strong>Mode:</strong> {serviceItem.mode}</p>
              <span className="text-3xl font-bold mb-4 bg-black block w-fit px-2">₹{serviceItem.price}</span>

              <div className="flex justify-center">
                <button
                  className="bg-red-500 text-white px-6 py-2 mb-4 rounded-md font-semibold"
                  onClick={() => handleBookNow(serviceItem)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Home;
