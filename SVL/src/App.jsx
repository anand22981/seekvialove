import "./App.css";
import img from "./assets/b89e4f9c-86be-45f7-991d-139456606a16.jpeg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import aboutImg from "./assets/4869d4b2-4d8e-4112-bef9-46defa578b5d.jpeg";
import Card3 from "./assets/bg.jpeg";
import Card1 from "./assets/791da27d-feb8-47ae-9c10-99d5c5595f3c.jpeg";
import Card4 from "./assets/energy.jpeg";
import Card5 from "./assets/Carreir.jpeg";
import Card2 from "./assets/Card2.jpeg";
import Signin from "./auth/Signin";
import Booking from "./pages/Bookings";
import Protectedroute from "./components/Protectedroute";
import Signup from "./auth/Signup";

function Home() {
  const navigate = useNavigate();
  const handleBooknow = (service) => {
    localStorage.setItem("seletedBooking", JSON.stringify(service));
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
    
  };

  const services = [
    {
      title: "💼 Career & Purpose Reading",
      description:
        "For career confusion, direction, decisions, and growth blocks.",
      ideal: "Job change, purpose, stagnation",
      duration: "30–45 minutes",
      mode: "Chat / Audio",
      price: "₹1",
      image: Card1,
    },
    {
      title: "💖 Love & Relationship Reading",
      description:
        "For confusion, emotional blocks, partner intentions, or healing.",
      ideal: "Love future, connection clarity, emotional energy",
      duration: "30–45 minutes",
      mode: "Chat / Audio",
      price: "₹1500",
      image: Card3,
    },
    {
      title: "🔥 Energy Check / No-Contact Reading",
      description: "To understand emotional distance and unspoken feelings.",
      ideal: "Current energy, emotional status",
      duration: "30–45 minutes",
      mode: "Chat / Audio",
      price: "₹555",
      image: Card4,
    },
    {
      title: "🌿 Life Path & Confusion Reading",
      description: "When nothing feels clear and you need grounding.",
      ideal: "Life direction, inner blockages",
      duration: "30–45 minutes",
      mode: "Chat / Audio",
      price: "₹400",
      image: Card5,
    },
  ];

  return (
    <div>
      <div className="relative border min-h-screen text-black flex items-center justify-center">
        <img
          src={img}
          alt="homepage"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 z-10">
          {/* LEFT */}
          <h1
            className="font-bold text-amber-400  
[text-shadow:_2px_2px_6px_black]
text-3xl sm:text-4xl md:text-5xl lg:text-6xl
text-center md:text-left leading-tight"
          >
            Seek via Love{" "}
            <span className="block text-xl text-yellow-300 sm:text-2xl md:text-3xl">
              Tarot & Soul Guidance
            </span>
          </h1>

          {/* RIGHT */}
          <div
            className=" w-full max-w-sm
  mx-auto
  rounded-xl
  shadow-lg
  p-6
  bg-cover bg-center
  text-white
  [text-shadow:_2px_2px_9px_black]  max-w-xls p-8 rounded-lg shadow-lg"
            style={{ backgroundImage: `url(${Card2})` }}
          >
            <p className="mb-4 font-bold   rounded-xl w-full flex items-center">
              When life feels confusing, the cards speak clarity. I am Anisha
              Jha — an intuitive tarot reader and soul guide. I don’t predict
              fear. I guide you toward understanding, healing, and empowered
              choices.
            </p>

            <ul className="space-y-2 mb-6">
              <li>✨ Non-judgmental</li>
              <li>✨ Confidential & compassionate</li>
              <li>✨ Energy-based, soul-led readings</li>
            </ul>

            <a className="flex justify-center" href="#services">
              <button className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold">
                👉 Book a Reading
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* About */}

      {/* Tarot Services */}

      <div id="services" className="bg-white py-12 px-6">
        <h2 className="font-bold text-center text-3xl py-12 px-6">
          🃏 Tarot Readings & Services
        </h2>

        <div className="  max-w-6xl  mx-auto grid grid-cols-1  md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className=" w-full max-w-sm mx-auto rounded-xl  shadow-lgp-6 bg-cover bg-center text-white [text-shadow:_2px_2px_8px_black]"
              style={{ backgroundImage: `url(${service.image})` }}
            >
              <h3 className="text-xl font-bold mb-3 text-yellow-400">
                {service.title}
              </h3>
              <p className="mb-4  mb-4">{service.description}</p>
              <p className="text-sm  mb-2">
                <strong>Ideal for:</strong> {service.ideal}
              </p>
              <p className="text-sm  mb-2">
                <strong>Duration:</strong> {service.duration}
              </p>
              <p className="text-sm  mb-2">
                <strong>Mode:</strong> {service.mode}
              </p>
              <p className="text-3xl font-bold  mb-4">{service.price}</p>

              <div className="flex justify-center">
                <button
                  className="bg-red-500 text-white px-6 py-2 mb-4 rounded-md font-semibold"
                  onClick={() => handleBooknow(service)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white py-12 px-6 flex justify-center bg-cover bg-center">
        <div
          className=" relative  w-full max-w-sm bg-white border font-bold  text-l font-bold text-white 
  [text-shadow:_2px_2px_8px_black] max-w-xl p-8 rounded-lg shadow-lg "
          style={{ backgroundImage: `url(${aboutImg})` }}
        >
          <h1
            className="text-3xl font-bold text-amber-400 
  [text-shadow:_2px_2px_6px_black]"
          >
            {" "}
            🔮 ABOUT ME
          </h1>
          <p
            className="mt-4 text-l font-bold text-white 
  [text-shadow:_2px_2px_6px_black]"
          >
            My journey into tarot did not begin with cards. It began with a
            pause. From 2021, life slowed down in ways I did not expect.
            Externally everything seemed normal, but internally I was going
            through confusion, emotional exhaustion, unanswered questions, and
            repeated delays. Plans did not move forward, motivation fluctuated,
            and I often found myself asking — why is nothing changing despite
            effort? That phase was uncomfortable, but it became deeply
            transformative. It taught me patience, emotional awareness, and the
            ability to sit with uncertainty without escaping it. During this
            period, spirituality entered my life naturally — not as belief, but
            as experience. Tarot came to me first as a tool for
            self-understanding. I did not approach it to predict the future, but
            to understand the present. What surprised me was the emotional
            accuracy of the cards. Tarot helped me recognise repeating patterns,
            inner blocks, attachment wounds, and the real reasons behind delays.
            Through this process, I healed heartbreak, rebuilt self-worth, and
            slowly regained clarity and inner strength. As my own understanding
            deepened, people around me began approaching me for guidance. These
            were not dramatic sessions — they were calm, honest conversations
            that left people feeling lighter and clearer. I realised then that
            tarot, for me, was not about answers alone — it was about holding
            space. I consciously chose to walk this path with responsibility and
            ethics. My readings are non-judgmental, confidential, and fear-free.
            I do not exaggerate timelines or create dependency. My intention is
            always empowerment — helping you reconnect with your own intuition
            and make aligned choices. Today, I guide people who feel emotionally
            overwhelmed, mentally exhausted, or stuck between heart and logic.
            People who are tired of overthinking and simply want clarity that
            feels grounding, not scary. I believe tarot does not change destiny
            overnight. Awareness does. Choice does. Aligned action does. Tarot
            simply helps you see clearly — so you can move forward with
            confidence. I don’t tell you what will happen to you. I help you
            understand yourself — so you stop giving your power away. With love
            and clarity, Anisha Tarot & Soul Guidance
          </p>
          <h1 className="font-bold mt-4">
            With love and clarity,
            <br /> Anisha Jha <br />
            Tarot & Soul Guidance
          </h1>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin/>} />
        <Route path ="/signup" element={<Signup/>}/>
        <Route path="/booking" element={
           <Protectedroute>
           <Booking/>
           </Protectedroute>
          } />
      </Routes>
    </Router>
  );
};

export default App;
