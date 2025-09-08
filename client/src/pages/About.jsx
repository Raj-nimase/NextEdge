import { Users, Target, Lightbulb, Layers, TrendingUp, Handshake, Globe2, Flag, UserCheck, Crown,Briefcase,ClipboardList } from "lucide-react";
import Footer from "../components/Footer";
const About = () => {
    const values = [
    { 
      icon: Lightbulb, 
      title: "Innovation", 
      text: "Encouraging creative thinking and novel approaches to solving problems." 
    },
    { 
      icon: Layers, 
      title: "Interdisciplinary", 
      text: "Breaking down silos for integrated and holistic learning experiences." 
    },
    { 
      icon: TrendingUp, 
      title: "Growth", 
      text: "Promoting lifelong learning and continuous self-development." 
    },
    { 
      icon: Handshake, 
      title: "Collaboration", 
      text: "Building environments where diverse perspectives come together." 
    },
    { 
      icon: Globe2, 
      title: "Inclusivity", 
      text: "Ensuring equal opportunities for all students to learn and engage." 
    },
    { 
      icon: Target, 
      title: "Purpose-Driven", 
      text: "Aligning our activities with meaningful outcomes and real impact." 
    },
  ];

const roles = [
    { icon: Crown, title: "President", text: "Leads the society, oversees activities, and ensures smooth functioning." },
    { icon: UserCheck, title: "Vice President", text: "Supports the president and manages delegated responsibilities." },
    { icon: Briefcase, title: "Treasurer", text: "Manages funds, maintains records, and ensures financial transparency." },
    { icon: Users, title: "Event Coordinator", text: "Plans and executes events, workshops, and competitions." },
    { icon: ClipboardList, title: "General Secretary", text: "Handles documentation, communications, and scheduling." },
  ];

  return (
     <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About NextEdge Society
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Empowering students through innovation, collaboration, and growth.
          </p>
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition">
            Join Us Today
          </button>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
            <p className="mb-4 leading-relaxed">
              Founded in 2022, NextEdge Society began with a small group of passionate students 
              who wanted to break boundaries across disciplines and foster creativity.
            </p>
            <p className="leading-relaxed">
              Today, we host over <span className="font-semibold">50+ events</span> annually, 
              empower <span className="font-semibold">1000+ members</span>, and run 
              <span className="font-semibold"> 9 specialized sub-clubs</span> that connect students 
              from all faculties.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6"
            alt="Our Story"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Vision & Mission</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow p-8 text-center">
            <Target className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Vision</h3>
            <p>
              To create a vibrant ecosystem where learning flourishes, innovation is nurtured, 
              and students become change-makers.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow p-8 text-center">
            <Flag className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mission</h3>
            <p>
              To foster innovation and collaboration through clubs, workshops, and events that 
              bridge boundaries and build meaningful connections.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values (Timeline Style) */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Core Values</h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white mb-4 shadow-lg">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Society Structure as Accordion */}
       <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Society Structure</h2>

        <div className="relative border-l-4 border-indigo-600 dark:border-indigo-400 ml-6">
          {roles.map((role, idx) => (
            <div key={idx} className="mb-10 ml-6">
              {/* Circle Icon */}
              <span className="absolute -left-5 flex items-center justify-center w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white">
                <role.icon className="w-5 h-5" />
              </span>

              {/* Content */}
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-xl transition">
                <h3 className="text-lg font-semibold">{role.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{role.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Impact */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-12">Our Impact</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-8 shadow">
              <h3 className="text-4xl font-bold">1000+</h3>
              <p className="mt-2">Active Members</p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-8 shadow">
              <h3 className="text-4xl font-bold">50+</h3>
              <p className="mt-2">Annual Events</p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-8 shadow">
              <h3 className="text-4xl font-bold">9</h3>
              <p className="mt-2">Specialized Clubs</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
  