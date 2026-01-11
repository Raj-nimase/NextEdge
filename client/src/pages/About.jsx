import {
  Users,
  Target,
  Lightbulb,
  Layers,
  TrendingUp,
  Handshake,
  Globe2,
  Flag,
  UserCheck,
  Crown,
  Briefcase,
  ClipboardList,
} from "lucide-react";
import Footer from "../components/Footer";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "Encouraging creative thinking and novel approaches to solving problems.",
  },
  {
    icon: Layers,
    title: "Interdisciplinary",
    text: "Breaking down silos for integrated and holistic learning experiences.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    text: "Promoting lifelong learning and continuous self-development.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    text: "Building environments where diverse perspectives come together.",
  },
  {
    icon: Globe2,
    title: "Inclusivity",
    text: "Ensuring equal opportunities for all students to learn and engage.",
  },
  {
    icon: Target,
    title: "Purpose-Driven",
    text: "Aligning our activities with meaningful outcomes and real impact.",
  },
];

const roles = [
  {
    icon: Crown,
    title: "President",
    text: "Leads the society, oversees activities, and ensures smooth functioning.",
  },
  {
    icon: UserCheck,
    title: "Vice President",
    text: "Supports the president and manages delegated responsibilities.",
  },
  {
    icon: Briefcase,
    title: "Treasurer",
    text: "Manages funds, maintains records, and ensures financial transparency.",
  },
  {
    icon: Users,
    title: "Event Coordinator",
    text: "Plans and executes events, workshops, and competitions.",
  },
  {
    icon: ClipboardList,
    title: "General Secretary",
    text: "Handles documentation, communications, and scheduling.",
  },
];

export default function About() {
  return (
    <main className="">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 ">
  <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-20 sm:py-20 lg:py-24 flex flex-col lg:flex-row gap-16 lg:gap-20">

    {/* LEFT COLUMN */}
    <div className="flex-1 flex flex-col gap-10 sm:gap-20 lg:gap-15">
      <h1 className="text-4xl sm:text-5xl md:text-[4rem] lg:text-[7rem] uppercase leading-[0.9] lg:leading-[0.85] font-extrabold tracking-tight">
        About
        <span className="block pl-0 sm:pl-6 lg:pl-12 text-blue-600 dark:text-blue-400">
          NextEdge Society
        </span>
      </h1>

      {/* STORY CARD */}
      <div
        className="relative rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-900 
        border border-neutral-200 dark:border-neutral-800 
        shadow-md sm:shadow-lg dark:shadow-none 
        p-6 sm:p-8 lg:p-12 max-w-full lg:max-w-3xl"
      >
        {/* Blue Accent Bar */}
        <div className="absolute top-0 left-0 h-full w-1 bg-blue-600/80 dark:bg-blue-500/70 rounded-l-xl sm:rounded-l-2xl" />

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          Our Story
        </h2>

        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed text-justify">
          NextEdge Society was founded in 2025 by a group of passionate students
          who saw the need for a more interconnected learning experience across
          disciplines. What started as a small innovation club has grown into a
          comprehensive society with multiple specialized sub-clubs serving
          students from all faculties. Our name reflects our commitment to
          keeping students at the edge of innovation while maintaining a strong
          foundation in core academic learning. We believe that the most
          creative solutions emerge when different disciplines interact and
          collaborate. Today, NextEdge Society is recognized as one of the most
          active and impactful student organizations on campus, hosting over 50
          events annually and managing 9 specialized sub-clubs that cater to
          diverse student interests.
        </p>
      </div>
    </div>

    {/* RIGHT COLUMN */}
    <div className="flex-1 flex flex-col gap-10 sm:gap-12 lg:gap-16">

      {/* VISION CARD */}
      <div
        className="rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-900 
        border border-neutral-200 dark:border-neutral-800 
        p-6 sm:p-8 lg:p-10 shadow-sm sm:shadow-md dark:shadow-none 
        hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
      >
        <span className="text-xs sm:text-sm uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-3 sm:mb-4">
          Vision
        </span>

        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Where We’re Headed
        </h2>

        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          To create a vibrant ecosystem where interdisciplinary learning
          flourishes, innovation is nurtured, and students are empowered to
          become the next generation of leaders, problem-solvers, and
          change-makers.
        </p>
      </div>

      {/* MISSION CARD */}
      <div
        className="rounded-xl sm:rounded-2xl 
        bg-gradient-to-br from-blue-50 to-white 
        dark:from-blue-950/40 dark:to-neutral-900 
        border border-neutral-200 dark:border-neutral-800 
        p-6 sm:p-8 lg:p-10 shadow-sm sm:shadow-md dark:shadow-none"
      >
        <span className="text-xs sm:text-sm uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-3 sm:mb-4">
          Mission
        </span>

        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          What We Do Daily
        </h2>

        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Our mission is to foster innovation and interdisciplinary learning
          through student-led clubs, workshops, and collaborative events that
          bridge academic boundaries, develop practical skills, and create
          meaningful connections within our community.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* ================= CORE VALUES ================= */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-semibold text-cyan-300">
            Our Core Values
          </h2>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <div
                key={i}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg">
                  <v.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-blue-100">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STRUCTURE ================= */}
      <section className="py-28 bg-gradient-to-b from-[#050f2a] to-[#030b1a]">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-semibold text-cyan-300">
            Our Society Structure
          </h2>

          <div className="relative mt-20 border-l border-cyan-500/40 pl-10">
            {roles.map((role, i) => (
              <div key={i} className="relative mb-14">
                <span className="absolute -left-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg">
                  <role.icon className="h-5 w-5 text-white" />
                </span>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <h3 className="font-semibold">{role.title}</h3>
                  <p className="mt-2 text-sm text-blue-100">{role.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="py-28 bg-gradient-to-r from-blue-800 via-indigo-800 to-cyan-800">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-semibold text-white">Our Impact</h2>

          <div className="mt-16 grid gap-10 sm:grid-cols-3">
            {[
              { num: "100+", label: "Active Members" },
              { num: "50+", label: "Annual Events" },
              { num: "9", label: "Specialized Clubs" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white/10 p-10 backdrop-blur-xl shadow-lg"
              >
                <h3 className="text-4xl font-extrabold">{item.num}</h3>
                <p className="mt-2 text-sm text-blue-100">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
