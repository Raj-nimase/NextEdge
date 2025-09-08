import React from "react";
import { ArrowRight } from "lucide-react";
import FeaturesSection from "../components/FeaturesSection";
import Clubs from "../components/Clubs";
import UpcomingEvents from "../components/UpcomingEvents";
import Cta from "../components/Cta";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const Navigate = useNavigate();
  return (
    <div className="transition-colors duration-500">
      {/* HERO SECTION START */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background for light mode */}
        <div className="absolute inset-0 dark:hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        </div>

        {/* Background for dark mode */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="w-full h-full bg-gradient-to-r from-black via-blue-950 to-purple-950"></div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <section className="relative z-10 flex flex-col items-start justify-center px-6 md:px-20 h-screen text-white">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Edge of <span className="text-white">Innovation.</span> <br />
            <span className="text-blue-400">Core of Learning.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl max-w-2xl">
            A dynamic student organization dedicated to promoting
            interdisciplinary learning and innovation through various
            student-led sub-clubs and events.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg">
              <span>Join Us</span>
            </button>
            <button
              className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg"
              onClick={() => Navigate("/clubs")}
            >
              <span>Explore Clubs</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>
      {/* HERO SECTION END */}
      {/* Features Section */}
      <FeaturesSection />
      <Clubs /> <UpcomingEvents />
      <Cta />
      <Footer />
    </div>
  );
};

export default Home;
