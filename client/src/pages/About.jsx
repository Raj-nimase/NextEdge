import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Lightbulb,
  Layers,
  TrendingUp,
  Handshake,
  Globe2,
  UserCheck,
  Crown,
  Briefcase,
  ClipboardList,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Footer from "../components/Footer";

// Data remains identical to your source
const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "Encouraging creative thinking and novel approaches to solving problems.",
    color: "text-amber-500",
  },
  {
    icon: Layers,
    title: "Interdisciplinary",
    text: "Breaking down silos for integrated and holistic learning experiences.",
    color: "text-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    text: "Promoting lifelong learning and continuous self-development.",
    color: "text-emerald-500",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    text: "Building environments where diverse perspectives come together.",
    color: "text-indigo-500",
  },
  {
    icon: Globe2,
    title: "Inclusivity",
    text: "Ensuring equal opportunities for all students to learn and engage.",
    color: "text-pink-500",
  },
  {
    icon: Target,
    title: "Purpose-Driven",
    text: "Aligning our activities with meaningful outcomes and real impact.",
    color: "text-cyan-500",
  },
];

const roles = [
  {
    icon: Crown,
    title: "President",
    text: "Leads the society and oversees strategic activities.",
  },
  {
    icon: UserCheck,
    title: "Vice President",
    text: "Supports the president and manages delegated responsibilities.",
  },
  {
    icon: Briefcase,
    title: "Treasurer",
    text: "Maintains financial records and ensures transparency.",
  },
  {
    icon: Users,
    title: "Event Coordinator",
    text: "Plans and executes impactful events and workshops.",
  },
  {
    icon: ClipboardList,
    title: "General Secretary",
    text: "Handles documentation and organizational scheduling.",
  },
];

// Animation helper
const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export default function About() {
  return (
    <>
      <main className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-indigo-100 dark:selection:bg-indigo-900 overflow-x-hidden">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-40 pb-24 overflow-hidden">
          {/* Background Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-cyan-100/50 dark:bg-cyan-900/20 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-6 lg:px-12">
            <FadeIn>
              <h1 className="text-5xl md:text-8xl lg:tracking-tight lg:leading-[0.9] mb-16 font-bold lg:font-next3">
                About <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500">
                  Next Edge Society
                </span>
              </h1>
            </FadeIn>

            {/* BENTO GRID: Story, Vision, Mission */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Story - Main Bento Card */}
              <div className="lg:col-span-8 group">
                <FadeIn delay={0.2}>
                  <div className="h-full relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-8 md:p-12 overflow-hidden hover:border-indigo-500/50 transition-colors duration-500">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                      Our Story
                      <span className="h-px w-12 bg-neutral-200 dark:bg-neutral-700"></span>
                    </h2>
                    <div className="space-y-6 text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
                      <p className="italic font-medium text-neutral-800 dark:text-neutral-200">
                        NextEdge Society was founded in 2025 by a group of
                        passionate students who saw the need for a more
                        interconnected learning experience across disciplines.
                      </p>
                      <p>
                        What started as a small innovation club has grown into a
                        comprehensive society with multiple specialized
                        sub-clubs serving students from all faculties. Our name
                        reflects our commitment to keeping students at the edge
                        of innovation while maintaining a strong foundation in
                        core academic learning.
                      </p>
                      <p>
                        Today, NextEdge Society is recognized as one of the most
                        active and impactful student organizations on campus,
                        hosting <strong>over 50 events </strong>annually and
                        managing <strong> 9 specialized sub-clubs</strong>.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Vision & Mission - Side Bento Cards */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <FadeIn delay={0.3}>
                  <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/50 p-8 rounded-[2rem] hover:shadow-2xl hover:shadow-indigo-500/10 transition-all">
                    <h3 className="text-indigo-600 dark:text-yellow-400 font-bold uppercase tracking-widest text-xs mb-3">
                      Vision
                    </h3>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium leading-snug">
                      To create a vibrant ecosystem where interdisciplinary
                      learning flourishes, innovation is nurtured, and students
                      are empowered.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.4}>
                  <div className="bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-800/50 p-8 rounded-[2rem] hover:shadow-2xl hover:shadow-cyan-500/10 transition-all">
                    
                    <h3 className="text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-widest text-xs mb-3">
                      Mission
                    </h3>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium leading-snug">
                      To foster innovation and interdisciplinary learning
                      through student-led clubs, workshops, and collaborative
                      events that bridge boundaries.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ================= IMPACT COUNTER ================= */}
        <section className="py-12">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="bg-neutral-900 dark:bg-white rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 grid md:grid-cols-3 gap-12 text-center items-center">
                {[
                  { num: "100+", label: "Active Members" },
                  { num: "50+", label: "Annual Events" },
                  { num: "9", label: "Specialized Clubs" },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <h3 className="text-5xl md:text-7xl font-black text-white dark:text-neutral-900 mb-2 group-hover:scale-110 transition-transform duration-500">
                      {item.num}
                    </h3>
                    <p className="text-neutral-400 dark:text-neutral-500 font-bold tracking-widest uppercase text-[10px]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= CORE VALUES ================= */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-20">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  The Values We Live By
                </h2>
                <p className="text-neutral-500 max-w-xl text-lg">
                  Our culture is defined by these six core pillars, ensuring
                  every member finds purpose and growth.
                </p>
              </FadeIn>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group h-full bg-white dark:bg-neutral-900 p-10 rounded-[2rem] border border-neutral-200 dark:border-neutral-800 hover:border-indigo-500 transition-all duration-300 hover:-translate-y-2">
                    <div
                      className={`mb-8 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 w-fit group-hover:scale-110 transition-transform`}
                    >
                      <v.icon className={`h-8 w-8 ${v.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {v.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ================= STRUCTURE ================= */}
        <section className="py-32 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <FadeIn>
                  <h2 className="text-4xl md:text-6xl mb-8 tracking-tighter">
                    The <span className="">Backbone</span> of
                    NextEdge
                  </h2>
                  <p className="text-neutral-500 text-lg mb-12">
                    Our leadership structure is designed for agility and clear
                    communication, empowering every role to drive innovation.
                  </p>
                  <div className="p-8 bg-indigo-600 rounded-3xl text-white">
                    <h4 className="text-xl mb-2 flex items-center gap-2">
                   Ready to lead?
                    </h4>
                    <p className="text-indigo-100 text-sm mb-6">
                      Join our executive board and help shape the future of
                      student innovation.
                    </p>
                    <button className="flex items-center gap-2 font-bold text-sm bg-white text-indigo-600 px-6 py-3 rounded-xl hover:bg-neutral-100 transition-colors">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </FadeIn>
              </div>

              <div className="space-y-4">
                {roles.map((role, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="group flex items-center gap-6 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all duration-500 cursor-default shadow-sm hover:shadow-indigo-500/20">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 group-hover:bg-white/20 transition-colors">
                        <role.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 group-hover:text-white" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold group-hover:text-white transition-colors">
                          {role.title}
                        </h3>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm group-hover:text-indigo-100 transition-colors">
                          {role.text}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>
    
      </main>
      <Footer />
    </>
  );
}
