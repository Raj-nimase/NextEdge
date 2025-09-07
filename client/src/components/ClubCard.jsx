// components/ClubCard.jsx

const ClubCard = ({ name, logo, description, color }) => {
  return (
    <div className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-md backdrop-blur-sm transition-transform hover:scale-[1.02]">
      
      {/* Header: Icon + Title */}
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white text-xl`}>
          {logo || "🎯"}
        </div>
        <h3 className="text-black dark:text-white text-xl font-semibold">
          {name || "Club Name"}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
        {description || "Club description goes here, explaining what the club does."}
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md text-sm font-medium transition hover:opacity-80">
          Join Now
        </button>
        <a
          href="#"
          className="text-black dark:text-white text-sm font-medium hover:underline flex items-center gap-1"
        >
          Learn More →
        </a>
      </div>
    </div>
  );
};

export default ClubCard;
