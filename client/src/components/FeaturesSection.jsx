import React from "react";
import {
  Lightbulb,
  Users,
  BookOpen,
  Share2,
} from "lucide-react";

const features = [
  {
    title: "Innovation",
    description:
      "Fostering innovative thinking across disciplines through collaborative and interdisciplinary learning experiences.",
    icon: <Lightbulb className="w-8 h-8 text-white" />,
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    title: "Community",
    description:
      "Building a vibrant community of like-minded students, creators, and future leaders.",
    icon: <Users className="w-8 h-8 text-white" />,
    gradient: "from-orange-400 to-pink-500",
  },
  {
    title: "Learning",
    description:
      "Creating opportunities for learning experiences beyond traditional classroom boundaries.",
    icon: <BookOpen className="w-8 h-8 text-white" />,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Networking",
    description:
      "Connecting students with peers, faculty, and industry professionals.",
    icon: <Share2 className="w-8 h-8 text-white" />,
    gradient: "from-teal-400 to-green-500",
  },
];

const FeaturesSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-white dark:bg-black transition-colors duration-500 py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-8 text-gray-900 dark:text-white">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
            NextEdge Society
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-16">
          We're a dynamic student organization fostering innovation, collaboration,
          and interdisciplinary learning through diverse student-led clubs and events.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-6 py-8 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
            >
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr ${feature.gradient} mb-6 shadow-md`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-400 text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
