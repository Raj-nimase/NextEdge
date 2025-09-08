// components/ClubPage.jsx
const clubs = [
  {
    id: 1,
    name: "CodeForge Tech",
    category: "Tech",
    description:
      "Empowering students with coding skills and technical knowledge...",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 2,
    name: "LaunchLab",
    category: "Business",
    description:
      "Fostering innovation and business acumen through startup challenges...",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 3,
    name: "ReadLoop",
    category: "Communication",
    description:
      "Enhancing communication skills through debates and public speaking...",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    name: "FitForge",
    category: "Sports",
    description:
      "Promoting physical fitness and engagement through tournaments...",
    color: "from-red-500 to-pink-500",
  },
  {
    id: 5,
    name: "Craftory",
    category: "Arts",
    description:
      "Nurturing creativity through art exhibitions, workshops, and projects...",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 6,
    name: "ImpactCore",
    category: "Social",
    description:
      "Driving change through community service and awareness campaigns...",
    color: "from-green-500 to-emerald-500",
  },
];

const ClubPage = () => {
  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">Our Clubs</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore student-led clubs designed to grow your skills, network, and
            passions.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="break-inside-avoid relative group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Accent Gradient Bar */}
              <div
                className={`h-2 w-full bg-gradient-to-r ${club.color}`}
              ></div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{club.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {club.description}
                </p>

                {/* Hover Buttons */}
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                    Join Club
                  </button>
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                    Explore →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubPage;
