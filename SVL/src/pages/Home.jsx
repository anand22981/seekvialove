import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import img from "../assets/Desktop_wall.jpg";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("https://seekvialove.com/v1/serviceList");
        setServices(res.data);

        const reviewRes = await axios.get("https://seekvialove.com/v1/reviews");
        setReviews(reviewRes.data.data);
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
      className="
    min-h-screen
    bg-cover
    bg-center
    bg-no-repeat
    relative
  "
      style={{ backgroundImage: `url(${img})` }}
    >
      <Navbar />

      {/* Hero Section */}
      <div className="min-h-screen pt-44 text-black flex items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 z-10">
          <h1 className="font-bold text-yellow-300 text-4xl md:text-5xl lg:text-6xl text-center md:text-left  [text-shadow:_2px_2px_6px_black]">
            Seek Via Love{" "}
            <span className="block text-xl text-white sm:text-2xl md:text-3xl">
              Tarot & Soul Guidance
            </span>
          </h1>

          <div className="w-full max-w-sm mx-auto rounded-xl  bg-black shadow-lg p-6 bg-cover bg-center text-white [text-shadow:_2px_2px_9px_black]">
            <p className="mb-4 font-bold">
              <h1 className="text-lg">About Reader </h1>
              When life feels confusing, the cards speak clarity. I am Anisha
              Jha — an intuitive tarot reader and soul guide. I guide you toward
              understanding, healing, and empowered choices.
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
      <div
        id="services"
        className="
    pt-32
    pb-20
    px-6
    scroll-mt-52
  "
      >
        <h2 className="font-bold text-white text-center text-3xl py-12">
          🃏 Tarot Readings & Services
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((serviceItem) => (
            <div
              key={serviceItem._id}
              className="
  w-full
  max-w-sm
  mx-auto
  p-6
  rounded-2xl
  bg-gradient-to-r
  from-black
  
  backdrop-blur-md
  border border-white/10
  shadow-2xl
  text-white
  transition-all
  duration-300
  hover:scale-105
  hover:shadow-orange-500/30
"
            // style={{ backgroundImage: `url(${img})` }}
            >
              <h3 className="text-xl font-bold mb-3 text-yellow-400">
                {serviceItem.title}
              </h3>
              <p className="mb-4">{serviceItem.description}</p>
              <p className="text-sm mb-2">
                <strong>Ideal for:</strong> {serviceItem.ideal}
              </p>
              <p className="text-sm mb-2 flex items-center gap-2 flex-wrap">
                <strong>Mode:</strong>

                {(Array.isArray(serviceItem.mode)
                  ? serviceItem.mode
                  : [serviceItem.mode]   // convert string → array safely
                ).map((m, i) => {
                  const mode = m?.toLowerCase();

                  if (mode.includes("chat"))
                    return (
                      <span key={i} className="px-2 py-1 rounded bg-pink-500/20 text-pink-300">
                        💬 Chat
                      </span>
                    );

                  if (mode.includes("audio"))
                    return (
                      <span key={i} className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-300">
                        🎧 Audio
                      </span>
                    );

                  if (mode.includes("video"))
                    return (
                      <span key={i} className="px-2 py-1 rounded bg-green-500/20 text-green-300">
                        📹 Video
                      </span>
                    );

                  return null;
                })}
              </p>
              <span className="text-3xl font-bold mb-4 block w-fit px-2">
                ₹{new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0
                }).format(serviceItem.price).replace("₹", "")}
              </span>

              <div className="flex justify-center">
                <button
                  className="bg-white text-black px-6 py-2 mb-4 rounded-md font-semibold"
                  onClick={() => handleBookNow(serviceItem)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-10 bg-black">
        <h2 className="text-3xl font-bold text-white">💖 Soul Stories</h2>
        <p className="text-gray-300 mt-2">
          Real experiences from our happy clients ✨
        </p>

        {/* Moving Reviews */}
        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-scroll">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="min-w-[300px] bg-gradient-to-r from-black to-orange-400/80
    backdrop-blur-md
    border border-white/10
    shadow-xl
    rounded-2xl
    px-4 py-2
    z-50 p-6 rounded-2xl shadow text-white"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">{review.name}</h3>
                  <span className="text-yellow-400">
                    {"⭐".repeat(review.rating)}
                  </span>
                </div>

                <p className="mt-3 text-sm">"{review.message}"</p>

                <div className="mt-4 text-xs">
                  <span>Mode:</span>
                  <span className="ml-2 px-2 py-1 bg-200 text-pink-600 rounded">
                    {review.mode === "Chat" ? "💬 Chat" : "🎧 Audio"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
