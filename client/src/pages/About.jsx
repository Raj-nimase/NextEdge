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

export default function About() {
  return (
    <main className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-indigo-100 dark:selection:bg-indigo-900">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        

        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-12">
              About <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                Next Edge Society
              </span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <div className="relative p-1 group">
                <div className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 md:p-12">
                  <h2 className="text-2xl font-bold mb-6">Our Story</h2>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg italic">
                    NextEdge Society was founded in 2022 by a group of
                    passionate students who saw the need for a more
                    interconnected learning experience across disciplines. What
                    started as a small innovation club has grown into a
                    comprehensive society with multiple specialized sub-clubs
                    serving students from all faculties. Our name reflects our
                    commitment to keeping students at the edge of innovation
                    while maintaining a strong foundation in core academic
                    learning. We believe that the most creative solutions emerge
                    when different disciplines interact and collaborate.
                  </p>
                  <p className="mt-6  dark:text-neutral-400 leading-relaxed">
                    Today, NextEdge Society is recognized as one of the most
                    active and impactful student organizations on campus,
                    hosting over 50 events annually and managing 9 specialized
                    sub-clubs that cater to diverse student interests.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="p-8 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition">
                <h3 className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-tighter mb-2">
                  Vision
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  To create a vibrant ecosystem where interdisciplinary learning
                  flourishes, innovation is nurtured, and students are empowered
                  to become the next generation of leaders, problem-solvers, and
                  change-makers
                </p>
              </div>
              <div className="p-8 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition">
                <h3 className="text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-tighter mb-2">
                  Mission
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Our mission is to foster innovation and interdisciplinary
                  learning through student-led clubs, workshops, and
                  collaborative events that bridge academic boundaries, develop
                  practical skills, and create meaningful connections within our
                  community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The Values We Live By
              </h2>
              <p className="text-neutral-500">
                Our culture is defined by these six core pillars, ensuring every
                member finds purpose and growth.
              </p>
            </div>
            <div className="hidden md:block h-[1px] flex-grow mx-8 bg-neutral-200 dark:bg-neutral-800 mb-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
              >
                <v.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-500 mb-6" />
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STRUCTURE ================= */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 italic tracking-tight">
              The Backbone of NextEdge
            </h2>
            <p className="text-neutral-500">
              Our leadership structure is designed for agility and clear
              communication.
            </p>
          </div>

          <div className="space-y-4">
            {roles.map((role, i) => (
              <div
                key={i}
                className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all duration-300"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 group-hover:bg-white/20 transition-colors">
                  <role.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 group-hover:text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold group-hover:text-white">
                    {role.title}
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 group-hover:text-indigo-100 transition-colors">
                    {role.text}
                  </p>
                </div>
                <ArrowRight className="hidden md:block h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all transform group-hover:translate-x-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-indigo-600 rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"></div>

            <div className="relative grid md:grid-cols-3 gap-12 text-center">
              {[
                { num: "100+", label: "Active Members" },
                { num: "50+", label: "Annual Events" },
                { num: "9", label: "Specialized Clubs" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <h3 className="text-5xl md:text-7xl font-black text-white mb-2">
                    {item.num}
                  </h3>
                  <p className="text-indigo-100 font-medium tracking-widest uppercase text-sm">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
