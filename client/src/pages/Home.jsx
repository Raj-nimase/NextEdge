import React from "react";
import { ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import FeaturesSection from "../components/FeaturesSection";
import Clubs from "../components/Clubs";
import UpcomingEvents from "../components/UpcomingEvents";
import Cta from "../components/Cta";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRefs = useRef([]);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const stickerRefs = useRef([]);
  const cardRefs = useRef([]);

  headlineRefs.current = [];
  stickerRefs.current = [];
  cardRefs.current = [];

  const addHeadline = (el) => el && headlineRefs.current.push(el);
  const addSticker = (el) => el && stickerRefs.current.push(el);
  const addCard = (el) => el && cardRefs.current.push(el);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Initial states
      gsap.set(badgeRef.current, { opacity: 0, y: 20 });
      gsap.set(headlineRefs.current, { y: 120, opacity: 0 });
      gsap.set(stickerRefs.current, { scale: 0.8, opacity: 0 });
      gsap.set(descRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      gsap.set(cardRefs.current, { opacity: 0, y: 40 });

      // Timeline
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      })
        .to(
          headlineRefs.current,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
          },
          "-=0.2"
        )
        .to(
          stickerRefs.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
          },
          "-=0.6"
        )
        .to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
        })
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.3"
        )
        .to(
          cardRefs.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
          },
          "-=0.2"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#0B0B0F] text-white font-body">
      {/* ================= HERO ================= */}
      <section
        className="relative min-h-screen bg-[#0A4BFF] overflow-hidden"
        ref={heroRef}
      >
        {/* grid texture */}
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 text-white">
          {/* Badge */}
          <span
            className="inline-block mb-3 px-2 md:mb-6 md:px-4 md:py-1 rounded-full font-bold bg-white text-blue-600 text-xs uppercase "
            ref={badgeRef}
          >
            Student Innovation Hub
          </span>

          {/* Headline */}
          <h1 className="leading-[0.95] uppercase">
            <span
              className="block font-heading text-5xl md:text-8xl"
              ref={addHeadline}
            >
              Edge of
            </span>
            <span
              className="block font-heading text-5xl tracking-wide md:text-8xl"
              ref={addHeadline}
            >
              Innovation
            </span>
            <span
              className="block font-accent text-6xl tracking-wide md:text-9xl text-lime-300"
              ref={addHeadline}
            >
              Core of Learning
            </span>
          </h1>

          {/* Floating stickers */}
          <div
            className="absolute top-28 right-20 rotate-12 bg-white text-black px-4 py-2 rounded-xl font-bold shadow-xl hidden md:block"
            ref={addSticker}
          >
            Learning
          </div>

          <div
            className="absolute  -left-40 bottom-90 -rotate-30 bg-lime-400 text-black px-4 py-2 rounded-full font-bold shadow-xl hidden md:block"
            ref={addSticker}
          >
            Innovation
          </div>

          {/* Description */}
          <p
            className="mt-8 max-w-xl text-sm md:text-lg text-blue-100"
            ref={descRef}
          >
            A dynamic student organization dedicated to promoting
            interdisciplinary learning and innovation through various
            student-led sub-clubs and events.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4" ref={ctaRef}>
            <button className="px-8 py-4 bg-black text-white rounded-full font-bold hover:scale-[1.03] transition">
              Join Us
            </button>

            <button
              onClick={() => navigate("/clubs")}
              className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:scale-[1.03] transition"
            >
              Explore Clubs →
            </button>
          </div>

          {/* Value Cards */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="bg-white text-black rounded-2xl p-6 shadow-xl"
              ref={addCard}
            >
              <h3 className="font-bold text-lg mb-2">Learn</h3>
              <p className="text-sm text-gray-700">
                Interdisciplinary learning through hands-on collaboration.
              </p>
            </div>

            <div
              className="bg-white text-black rounded-2xl p-6 shadow-xl"
              ref={addCard}
            >
              <h3 className="font-bold text-lg mb-2">Build</h3>
              <p className="text-sm text-gray-700">
                Student-led clubs working on real ideas and projects.
              </p>
            </div>

            <div
              className="bg-white text-black rounded-2xl p-6 shadow-xl"
              ref={addCard}
            >
              <h3 className="font-bold text-lg mb-2">Innovate</h3>
              <p className="text-sm text-gray-700">
                Events and initiatives that push creativity forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-white text-gray-900">
        <FeaturesSection />
      </section>

      {/* ================= CLUBS ================= */}
      <section className="bg-white text-gray-900">
        <Clubs />
      </section>

      {/* ================= EVENTS ================= */}
      <section className="bg-white text-gray-900">
        <UpcomingEvents />
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#0B0B0F]">
        <Cta />
      </section>

      <Footer />
    </div>
  );
};

export default Home;
