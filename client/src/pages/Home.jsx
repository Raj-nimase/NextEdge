import React, { useRef, useLayoutEffect } from "react";
import { ArrowRight, Lightbulb, Code2, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Import components (assuming paths are correct)
import FeaturesSection from "../components/FeaturesSection";
import Clubs from "../components/Clubs";
import UpcomingEvents from "../components/UpcomingEvents";
import Cta from "../components/Cta";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const mainRef = useRef(null);

  // Refs for animation targeting
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const descRef = useRef(null);
  const btnGroupRef = useRef(null);
  const visualsRef = useRef(null); // Ref for the asymmetric grid items

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Initial State Set
      gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
        y: 200,
        opacity: 0,
      });
      gsap.set(descRef.current, { opacity: 0 });
      gsap.set(btnGroupRef.current, { opacity: 0, y: 20 });
      gsap.set(visualsRef.current.children, {
        opacity: 0,
        scale: 0.8,
        rotation: "random(-5, 5)",
      });

      // 2. The Animation Sequence

      // Step A: Background Visuals Pop
      tl.to(visualsRef.current.children, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });

      // Step B: Text "Mask Reveal" (Slide up)
      tl.to(
        [titleLine1Ref.current, titleLine2Ref.current],
        {
          y: 0,
          stagger: 0.1,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.6"
      );

      // Step C: Description fades in
      tl.to(
        descRef.current,
        {
          opacity: 1,
          duration: 0.8,
        },
        "-=0.5"
      );

      // Step D: Buttons pop up
      tl.to(
        btnGroupRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    // Minimalist theme: High contrast and clean background
    <div
      ref={mainRef}
      className="home-page-containerdark:bg-black transition-colors duration-500 font-body h-screen bg-[url(/bg1.png)] bg-cover dark:bg-[url(/dark-bg.png)]"
    >
      {/* HERO SECTION */}
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 md:py-0">
        {/* === BACKGROUND VISUALS (The Asymmetric Elements) === */}
        <div
          ref={visualsRef}
          className="absolute inset-0 max-w-7xl mx-auto pointer-events-none"
        >
          {/* Visual 1: Top Left - Abstract Code Block */}
          <div className="absolute top-[15%] -left-[20%] w-48 h-48 bg-gradient-to-tr from-indigo-800 to-indigo-400 dark:bg-gray-800 rounded-lg shadow-xl p-6 transform rotate-[-8deg] ">
            <Code2 className="w-12 h-14 text-yellow-600 dark:text-cyan-400 opacity-60" />
            <p className="text-2xl mt-2 font-bold text-white">
              Learning
            </p>
          </div>
          {/* Visual 2: Bottom Left - Tagline Box */}
          <div className="absolute bottom-[10%] -left-[20%] w-80 p-6 bg-blue-100/70 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700 rounded-md transform rotate-[40deg]">
            <p className="text-m font-semibold text-blue-800 dark:text-blue-300">
              "Good Ideas Modus"
            </p>
          </div>
          {/* Visual 3: Bottom Right - Abstract Idea Bulb */}
          <div className="absolute bottom-[20%] right-[-15%] w-56 h-36 bg-gradient-to-br from-red-400 to-yellow-400 dark:bg-gray-800 rounded-xl shadow-2xl p-4 flex items-center justify-end gap-2 transform rotate-[4deg]">
            <span className="font-bold text-2xl text-white">Innovation</span>
            <Lightbulb className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* === CONTENT LAYER (Center Focus) === */}
        <section className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-widest mb-10">
            Student Innovation Hub
          </div>

          {/* Heading with MASK REVEAL effect - Big and Bold */}
          <h1 className="font-heading text-6xl md:text-9xl font-black leading-none text-gray-900 dark:text-white mb-6 tracking-tighter uppercase">
            {/* Line 1 Wrapper: Tilted left with a subtle purple/blue gradient glow */}
            <div
              className="overflow-hidden transform -rotate-1 skew-x-1 relative z-10 
               bg-gradient-to-bl from-red-200 dark:from-purple-700 to-white dark:to-gray-500 mb-4
               p-6 rounded-xl shadow-xl"
            >
              <div ref={titleLine1Ref} className="block">
                Edge of Innovation.
              </div>
            </div>

            {/* Line 2 Wrapper: Tilted right, pulled up, with a cyan/blue ambient glow */}
            <div
              className="overflow-hidden transform rotate-1 -mt-8 relative z-0 
               bg-gradient-to-br from-cyan-200 dark:from-sky-400 to-white dark:to-gray-900
               p-6 rounded-xl shadow-xl"
            >
              <div
                ref={titleLine2Ref}
                className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text dark:text-yellow-300/70 text-transparent"
              >
                Core of Learning.
              </div>
            </div>
          </h1>

          {/* Subtitle/Description - Centered below the bold text */}
          <p
            ref={descRef}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto leading-relaxed mt-8"
          >
            A dynamic student organization dedicated to promoting
            interdisciplinary learning and innovation through various
            student-led sub-clubs and events.
          </p>

          {/* Action Buttons */}
          <div
            ref={btnGroupRef}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex gap-4">
              <UsersRound />
              JOIN US
            </button>

            <button
              onClick={() => navigate("/clubs")}
              className="px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 flex items-center gap-2 group"
            >
              <span>Explore Clubs</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </section>
      </main>

      {/* Main Content Sections */}
      <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <FeaturesSection />
        <Clubs />
        <UpcomingEvents />
        <Cta />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
