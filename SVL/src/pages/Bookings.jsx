import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from '../assets/bg.jpeg';

const Booking = () => {
  const navigate = useNavigate();

  const [card] = useState(() => {
    const data = localStorage.getItem("seletedBooking");
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      localStorage.setItem("redirectAfterLogin", "/booking");
      navigate("/login");
      return;
    }
    if (!card) {
      navigate("/");
    }
  }, [card, navigate]);

  if (!card) return null;

  const UPI_VPA = "yourvpa@bank"; // replace with your UPI ID
  const UPI_NAME = "Anisha Jha";
  const UPI_AMOUNT = card.price.replace("₹", "");
  const UPI_NOTE = encodeURIComponent(card.title);
  const upiLink = `upi://pay?pa=${UPI_VPA}&pn=${encodeURIComponent(UPI_NAME)}&am=${UPI_AMOUNT}&cu=INR&tn=${UPI_NOTE}`;

  return (
    <div className="text-white" style={{ backgroundImage: `url(${img})` }}>
      <h1 className="font-bold text-center text-3xl py-12 px-6">Booking Confirmation</h1>
      <div className="min-h-screen flex mt-3 items-center justify-center relative">
        <div className="relative bg-white text-black max-w-sm shadow-lg mt-4 border p-8 rounded-xl items-center justify-center w-full">
          <img src={card.image} alt={card.title} />
          <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
          <p className="text-3xl font-bold mb-4">{card.price}</p>
          <a href={upiLink}>
            <button className="text-white mt-4 bg-red-600 px-4 py-2 rounded">
              Pay Via UPI
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Booking;
