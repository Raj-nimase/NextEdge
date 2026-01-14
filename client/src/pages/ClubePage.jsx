import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Rocket,
  MessageSquare,
  HeartHandshake,
  Compass,
  Palette,
  Theater,
  Dumbbell,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import Footer from "../components/Footer";
const clubs = [
  {
    name: "CodeForge Tech",
    tag: "CodeForge",
    description:
      "Empowering students with coding skills through workshops and hackathons.",
    gradient: "from-blue-200 to-indigo-200",
    icon: Code,
    activities: [
      "Weekly coding workshops",
      "Hackathons and coding challenges",
      "Peer-to-peer learning sessions",
      "Collaborative software projects",
    ],
    benefits: [
      "Hands-on programming experience",
      "Improved problem-solving skills",
      "Exposure to real-world development workflows",
      "Stronger technical portfolio",
    ],
  },
  {
    name: "LaunchLab Entrepreneurship",
    tag: "LaunchLab",
    description:
      "Fostering innovation through startup challenges and mentorship.",
    gradient: "from-orange-200 to-amber-200",
    icon: Rocket,
    activities: [
      "Startup idea pitching sessions",
      "Mentorship from founders and professionals",
      "Business model workshops",
      "Startup and case competitions",
    ],
    benefits: [
      "Practical entrepreneurial experience",
      "Improved leadership and decision-making skills",
      "Professional networking opportunities",
      "Understanding of startup ecosystems",
    ],
  },
  {
    name: "ReadLoop Communication",
    tag: "ReadLoop",
    description: "Enhancing communication through debates and public speaking.",
    gradient: "from-purple-200 to-fuchsia-200",
    icon: MessageSquare,
    activities: [
      "Debate and discussion forums",
      "Public speaking practice sessions",
      "Group reading and analysis",
      "Presentation skill workshops",
    ],
    benefits: [
      "Improved verbal communication",
      "Increased confidence in public speaking",
      "Critical thinking development",
      "Stronger articulation of ideas",
    ],
  },
  {
    name: "ImpactCore Social Welfare",
    tag: "ImpactCore",
    description: "Driving community service and social impact initiatives.",
    gradient: "from-emerald-200 to-green-200",
    icon: HeartHandshake,
    activities: [
      "Community outreach programs",
      "Volunteer service drives",
      "Awareness and fundraising campaigns",
      "Collaboration with NGOs",
    ],
    benefits: [
      "Real-world social impact experience",
      "Stronger sense of civic responsibility",
      "Teamwork and coordination skills",
      "Leadership through service",
    ],
  },
  {
    name: "SkillQuest Life Skills",
    tag: "SkillQuest",
    description: "Building essential life skills through practical learning.",
    gradient: "from-sky-200 to-cyan-200",
    icon: Compass,
    activities: [
      "Time management workshops",
      "Financial literacy sessions",
      "Career readiness programs",
      "Problem-solving exercises",
    ],
    benefits: [
      "Better personal organization",
      "Improved decision-making skills",
      "Increased self-confidence",
      "Preparation for professional life",
    ],
  },
  {
    name: "Craftory Art & Craft",
    tag: "Craftory",
    description: "Nurturing creativity through art and collaborative projects.",
    gradient: "from-pink-200 to-rose-200",
    icon: Palette,
    activities: [
      "Art and craft workshops",
      "Collaborative creative projects",
      "Exhibitions and showcases",
      "Creative challenges",
    ],
    benefits: [
      "Enhanced creativity and expression",
      "Stress relief through artistic work",
      "Collaboration and teamwork",
      "Portfolio-worthy creative pieces",
    ],
  },
  {
    name: "StageFlow Drama & Dance",
    tag: "StageFlow",
    description: "Expressing creativity through drama and dance performances.",
    gradient: "from-rose-200 to-red-200",
    icon: Theater,
    activities: [
      "Theatre and dance rehearsals",
      "Stage performances",
      "Acting and movement workshops",
      "Inter-club cultural events",
    ],
    benefits: [
      "Improved stage confidence",
      "Physical and emotional expression",
      "Team coordination skills",
      "Performance experience",
    ],
  },
  {
    name: "FitForge Sports",
    tag: "FitForge",
    description: "Promoting fitness through sports and athletic training.",
    gradient: "from-red-200 to-orange-200",
    icon: Dumbbell,
    activities: [
      "Regular sports practice sessions",
      "Fitness and conditioning workouts",
      "Inter-college tournaments",
      "Wellness and nutrition talks",
    ],
    benefits: [
      "Improved physical fitness",
      "Discipline and resilience",
      "Team spirit and sportsmanship",
      "Stress management through activity",
    ],
  },
  {
    name: "FlavorLab Cooking",
    tag: "FlavorLab",
    description: "Exploring culinary arts through cooking and food innovation.",
    gradient: "from-amber-200 to-yellow-200",
    icon: UtensilsCrossed,
    activities: [
      "Hands-on cooking sessions",
      "Recipe experimentation",
      "Food presentation workshops",
      "Culinary competitions",
    ],
    benefits: [
      "Practical cooking skills",
      "Creativity in food preparation",
      "Understanding of nutrition basics",
      "Confidence in culinary techniques",
    ],
  },
];

export default function ClubsPage() {
  const [activeClub, setActiveClub] = useState(null);

  return (
    <>
      <div
        className="
        min-h-screen px-8 py-20 transition-colors
        bg-zinc-50 text-zinc-900
        dark:bg-zinc-950 dark:text-zinc-100
      "
      >
        <h1 className="text-8xl font-semibold mb-25 text-center">Clubs</h1>

        {/* Grid aligned like reference */}
        <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:px-10">
          {clubs.map((club, i) => (
            <motion.div
              key={i}
              onClick={() => setActiveClub(club)}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className={`
              relative rounded-3xl p-8 cursor-pointer
              bg-gradient-to-br ${club.gradient}
              text-zinc-900
              shadow-md
              dark:shadow-none 
            `}
            >
              <div className="relative z-10 flex  gap-10 justify-between h-48 ">
                <div>
                  <club.icon />
                  <h2 className="text-2xl font-bold leading-tight">
                    {club.tag}
                  </h2>
                  <p className="text-md mt-2 opacity-70">{club.name}</p>
                </div>

                <div className="flex items-center">
                  <div
                    className="
                    text-md  h-1/2
                  font-semibold
                  "
                  >
                    {club.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {activeClub && (
            <motion.div
              className="
      fixed inset-0 z-50 flex items-center justify-center px-4 md:px-10
      bg-black/50 backdrop-blur-sm
    "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveClub(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 30, scale: 0.96 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 30, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
                className={`
        w-full max-w-5xl overflow-hidden rounded-3xl
        dark:bg-zinc-900 bg-gradient-to-r ${activeClub.gradient}
        shadow-2xl dark:text-black
      `}
              >
                {/* Header */}
                <div className={`relative px-10 py-8`}>
                  <button
                    onClick={() => setActiveClub(null)}
                    className="absolute right-6 top-6 rounded-full bg-white/20 p-2 hover:bg-white/30"
                  >
                    ✕
                  </button>

                  <div className="flex items-center gap-4 text-black">
                    <activeClub.icon className="w-10 h-10 " />
                    <div>
                      <p className="text-sm ">{activeClub.tag}</p>
                      <h2 className="text-3xl md:text-4xl font-bold ">
                        {activeClub.name}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-10 py-8 space-y-8">
                  {/* About */}
                  <section>
                    <h3 className="text-xl font-semibold mb-2">
                      About the Club
                    </h3>
                    <p className="leading-relaxed">
                      {activeClub.description}
                    </p>
                  </section>

                  {/* Activities + Benefits */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <section>
                      <h3 className="text-lg font-semibold mb-3">Activities</h3>
                      <ul className="space-y-2  list-disc list-inside">
                        {activeClub.activities?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                      <ul className="space-y-2 list-disc list-inside">
                        {activeClub.benefits?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <button
                      className="
              rounded-xl px-6 py-3 font-medium
              bg-blue-600 hover:bg-blue-500 text-white transition
            "
                    >
                      Join This Club
                    </button>

                    <button
                      onClick={() => setActiveClub(null)}
                      className="
              rounded-xl px-6 py-3 font-medium
              border border-black/20 dark:border-white/20 hover:bg-white/5 transition
            "
                    >
                      Back to All Clubs
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}
