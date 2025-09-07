// components/Clubs.jsx

import ClubCard from "./ClubCard";

const Clubs = () => {
  const clubs = [
    {
      logo: "💻",
      name: "CodeForge",
      description:
        "Empowering students with coding skills and technical knowledge through workshops, hackathons, and peer learning.",
      color: "bg-blue-500",
    },
    {
      logo: "🚀",
      name: "LaunchLab",
      description:
        "Fostering innovation through startup challenges, mentorship, and networking.",
      color: "bg-orange-500",
    },
    {
      logo: "📖",
      name: "ReadLoop",
      description:
        "Enhancing communication skills through public speaking and literary discussions.",
      color: "bg-purple-500",
    },
    {
      logo: "🌱",
      name: "ImpactCore",
      description:
        "Making a difference through community service and awareness campaigns.",
      color: "bg-green-500",
    },
    {
      logo: "🛠",
      name: "SkillQuest",
      description:
        "Building essential life skills through workshops, simulations, and hands-on practice.",
      color: "bg-cyan-500",
    },
    {
      logo: "🎨",
      name: "Craftory",
      description:
        "Nurturing creativity through art exhibitions, workshops, and collaborative projects.",
      color: "bg-pink-500",
    },
  ];

  return (
    <section className="py-16 px-[5vw] bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Clubs</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore student-led clubs designed to grow your skills, network, and interests.
          </p>
        </div>

        {/* Grid of Club Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club, idx) => (
            <ClubCard key={idx} {...club} />
          ))}
        </div>
      </div>

      {/* Explore All Clubs button */}
      <div className="flex justify-center mt-12">
        <button className="text-black dark:text-white border border-black/30 dark:border-white/30 rounded-lg px-6 py-2 hover:bg-black/10 dark:hover:bg-white/10 transition">
          Explore All Clubs →
        </button>
      </div>
    </section>
  );
};

export default Clubs;
