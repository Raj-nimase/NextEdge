import React, { useState } from 'react';
import { Code, Rocket, BookOpen, Heart, TrendingUp, Paintbrush, Zap, Activity, Utensils, X, ArrowRight, UserPlus } from 'lucide-react';

// --- Club Data ---
// Accent now includes the main text color and the block background color
const CLUBS = [
  {
    id: 'codeforge',
    title: 'CodeForge Tech',
    subtitle: 'Empowering students with coding skills and technical knowledge through workshops, hackathons, and collaborative projects.',
    accent: 'bg-blue-600 text-blue-600',
    icon: Code,
    details: {
      about: 'Empowering students with coding skills and technical knowledge through workshops, hackathons, and collaborative projects.',
      activities: [
        'Regular workshops and skill-building sessions',
        'Guest speaker sessions and industry networking',
        'Collaborative projects with other clubs',
        'Competitions and challenges',
      ],
      benefits: [
        'Develop practical skills in a supportive environment',
        'Build a portfolio of real-world projects',
        'Network with peers and professionals',
        'Leadership and organizational experience',
      ],
      schedule: 'This club meets every Tuesday at 5:00 PM in the Student Center, Room 205. All students are welcome regardless of experience level.',
    },
  },
  {
    id: 'launchlab',
    title: 'LaunchLab Entrepreneurship',
    subtitle: 'Fostering innovation and business acumen through startup challenges, mentorship programs, and networking events.',
    accent: 'bg-red-600 text-red-600',
    icon: Rocket,
    details: {
      about: 'Fostering innovation and business acumen through startup challenges, mentorship programs, and networking events.',
      activities: [
        'Business plan competitions',
        'Pitch workshops with VCs',
        'Mentorship with successful alumni entrepreneurs',
        'Networking with local business leaders',
      ],
      benefits: [
        'Develop a business mindset',
        'Access to funding opportunities',
        'Learn market analysis and strategy',
        'Team-building and problem-solving skills',
      ],
      schedule: 'The committee meets every Thursday at 6:00 PM in the Business School Lounge. Open sessions are held monthly.',
    },
  },
  {
    id: 'readloop',
    title: 'ReadLoop Communication',
    subtitle: 'Enhancing communication skills through debates, public speaking sessions, and literary discussions.',
    accent: 'bg-purple-600 text-purple-600',
    icon: BookOpen,
    details: {
      about: 'Enhancing communication skills through debates, public speaking sessions, and literary discussions.',
      activities: [
        'Weekly debate and public speaking practice',
        'Hosting campus literary events',
        'Critique and analysis of communication strategies',
        'Workshops on clear and persuasive writing',
      ],
      benefits: [
        'Improved confidence in public speaking',
        'Enhanced critical thinking',
        'Stronger argumentation skills',
        'A deeper appreciation for literature and rhetoric',
      ],
      schedule: 'ReadLoop meets every Wednesday at 4:30 PM in the Library Auditorium.',
    },
  },
  {
    id: 'impactcore',
    title: 'ImpactCore Social Welfare',
    subtitle: 'Making a difference through community service, awareness campaigns, and social impact projects.',
    accent: 'bg-green-600 text-green-600',
    icon: Heart,
    details: {
      about: 'Making a difference through community service, awareness campaigns, and social impact projects.',
      activities: [
        'Organizing local clean-up drives',
        'Running awareness campaigns on social issues',
        'Fundraisers for local non-profits',
        'Volunteering at shelters and food banks',
        
      ],
      benefits: [
        'Contribute positively to the community',
        'Develop empathy and social awareness',
        'Gain experience in non-profit management',
        'Be part of a socially conscious peer group',
      ],
      schedule: 'Monthly planning meetings are held on the first Monday of the month at 7:00 PM.',
    },
  },
  {
    id: 'skillquest',
    title: 'SkillQuest Life Skills',
    subtitle: 'Building essential life skills through interactive workshops, simulations, and practical learning.',
    accent: 'bg-yellow-600 text-yellow-600',
    icon: TrendingUp,
    details: {
      about: 'Building essential life skills through interactive workshops, simulations, and practical learning.',
      activities: [
        'Financial literacy workshops',
        'Career planning and resume reviews',
        'Basic home repair and auto maintenance sessions',
        'Mental health and stress management seminars',
      ],
      benefits: [
        'Practical knowledge for post-graduate life',
        'Increased personal competence and confidence',
        'Reduced anxiety about adult responsibilities',
        'Direct access to professional skill coaches',
      ],
      schedule: 'Workshops are scheduled flexibly; check the club calendar for weekly events.',
    },
  },
  {
    id: 'craftory',
    title: 'Craftory Art & Craft',
    subtitle: 'Nurturing creativity through art exhibitions, craft workshops, and collaborative artistic projects.',
    accent: 'bg-pink-600 text-pink-600',
    icon: Paintbrush, 
    details: {
      about: 'Nurturing creativity through art exhibitions, craft workshops, and collaborative artistic projects.',
      activities: [
        'Weekly themed craft sessions (knitting, pottery, painting)',
        'Organizing campus art exhibitions',
        'Collaborative murals and installations',
        'Selling creations at student markets',
      ],
      benefits: [
        'Stress relief and creative expression',
        'Opportunity to learn new artistic mediums',
        'Showcasing personal artwork',
        'Building a network of creative peers',
      ],
      schedule: 'Open studio hours are Monday and Friday, 2:00 PM - 5:00 PM in the Arts Annex.',
    },
  },
  {
    id: 'stageflow',
    title: 'StageFlow Drama & Dance',
    subtitle: 'Expressing through performing arts with theatrical productions, dance performances, and creative workshops.',
    accent: 'bg-orange-600 text-orange-600',
    icon: Zap,
    details: {
      about: 'Expressing through performing arts with theatrical productions, dance performances, and creative workshops.',
      activities: [
        'Rehearsals for major theatrical productions',
        'Improvisation and scene study workshops',
        'Modern and contemporary dance classes',
        'Campus performances and showcases',
      ],
      benefits: [
        'Improved stage presence and confidence',
        'Physical fitness and coordination',
        'Learning technical theatre skills',
        'Creative collaboration in a supportive group',
      ],
      schedule: 'Rehearsals vary based on production schedule; weekly dance workshops are Tuesday nights.',
    },
  },
  {
    id: 'fitforge',
    title: 'FitForge Sports',
    subtitle: 'Promoting physical fitness and sportsmanship through tournaments, training sessions, and wellness programs.',
    accent: 'bg-cyan-600 text-cyan-600',
    icon: Activity,
    details: {
      about: 'Promoting physical fitness and sportsmanship through tournaments, training sessions, and wellness programs.',
      activities: [
        'Intramural sports leagues (soccer, basketball)',
        'Weekly functional fitness training',
        'Organized hiking and outdoor activities',
        'Nutrition and wellness seminars',
      ],
      benefits: [
        'Maintaining a healthy lifestyle',
        'Teamwork and competitive spirit',
        'Access to training resources and coaches',
        'Stress reduction through physical activity',
      ],
      schedule: 'Daily training sessions are available; check the gym board for schedules.',
    },
  },
  {
    id: 'flavorlab',
    title: 'FlavorLab Cooking',
    subtitle: 'Exploring culinary arts through cooking competitions, food festivals, and gastronomic experiments.',
    accent: 'bg-lime-600 text-lime-600',
    icon: Utensils,
    details: {
      about: 'Exploring culinary arts through cooking competitions, food festivals, and gastronomic experiments.',
      activities: [
        'Themed cooking classes (e.g., Italian, Asian)',
        'Hosting campus food tasting events',
        'Friendly cooking competitions (Iron Chef style)',
        'Guest chef demonstrations',
      ],
      benefits: [
        'Learning practical cooking skills',
        'Exploring diverse global cuisines',
        'Networking with local food industry professionals',
        'Enjoying delicious food!',
      ],
      schedule: 'Cooking workshops are held every Friday evening in the campus kitchen lab.',
    },
  },
];

// --- Modal Component ---

const ClubModal = ({ club, onClose }) => {
  if (!club) return null;
  const Icon = club.icon;
  const accentBgClass = club.accent.split(' ').filter(c => c.startsWith('bg-')).join(' ');
  const accentTextClass = club.accent.split(' ').filter(c => c.startsWith('text-')).join(' ');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex justify-center items-center p-4">
      {/* Reduced max-w-4xl to max-w-3xl */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl transform transition-all duration-300 scale-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        
        {/* Header with Title */}
        {/* Reduced p-6/p-8 padding to p-5/p-6 */}
        <div className={`p-5 sm:p-6 rounded-t-3xl border-b border-gray-200 dark:border-gray-700 ${accentBgClass}`}>
          <div className="flex justify-between items-center">
            {/* Reduced text-4xl to text-3xl */}
            <h2 className="text-3xl font-extrabold flex items-center tracking-tight text-white">
              <Icon className="w-8 h-8 mr-4 stroke-2 text-white" />
              {club.title}
            </h2>
            <button
              onClick={onClose}
              className="p-3 rounded-full text-white bg-black/20 hover:bg-black/40 transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        {/* Reduced p-6/p-8 padding to p-5/p-6 */}
        <div className="p-5 sm:p-6 text-gray-800 dark:text-gray-200">
          
          <section className="mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">
            {/* Reduced text-2xl to text-xl */}
            <h3 className={`text-xl font-bold mb-2 ${accentTextClass} pb-1 inline-block`}>Overview</h3>
            {/* Reduced text-lg to text-base */}
            <p className="text-base leading-relaxed mt-2 text-gray-700 dark:text-gray-300">{club.details.about}</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Activities */}
            <div className="p-4 bg-gray-50 rounded-xl shadow-inner dark:bg-gray-700">
              {/* Reduced text-2xl to text-xl */}
              <h3 className={`text-xl font-bold mb-3 ${accentTextClass} pb-2 flex items-center`}>
                Activities
              </h3>
              <ul className="space-y-3 list-none p-0">
                {club.details.activities.map((item, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <span className={`w-2 h-2 rounded-full ${accentBgClass.replace('bg-', 'bg-')} flex-shrink-0 mr-3 mt-2 shadow-md`}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="p-4 bg-gray-50 rounded-xl shadow-inner dark:bg-gray-700">
              {/* Reduced text-2xl to text-xl */}
              <h3 className={`text-xl font-bold mb-3 ${accentTextClass} pb-2 flex items-center`}>
                Benefits
              </h3>
              <ul className="space-y-3 list-none p-0">
                {club.details.benefits.map((item, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <span className={`w-2 h-2 rounded-full ${accentBgClass.replace('bg-', 'bg-')} flex-shrink-0 mr-3 mt-2 shadow-md`}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Meeting Schedule */}
          <section className={`p-4 rounded-xl border-l-4 ${accentBgClass.replace('bg-', 'border-')} bg-gray-100 dark:bg-gray-700 shadow-md`}>
            <h3 className={`text-lg font-bold mb-2 ${accentTextClass} flex items-center`}>
                <Icon className='w-5 h-5 mr-2' />
                Meeting & Schedule
            </h3>
            {/* Reduced text-lg to text-base */}
            <p className="text-base text-gray-700 dark:text-gray-300">{club.details.schedule}</p>
          </section>

          {/* Action Button */}
          <div className="mt-8 text-center">
            {/* Reduced text-xl to text-lg and py-4 to py-3 */}
            <button
              onClick={onClose} 
              className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-bold rounded-xl shadow-lg text-white ${accentBgClass} hover:${accentBgClass.replace('600', '700')} transition duration-300 ease-in-out transform hover:scale-[1.03] focus:outline-none focus:ring-4 ${accentBgClass.replace('bg-', 'focus:ring-')} focus:ring-opacity-70`}
            >
              Sign Up / Apply 
              <UserPlus className='w-5 h-5 ml-3' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Club Card Component ---

const ClubCard = ({ club, onClick }) => {
  const Icon = club.icon;
  const accentBgClass = club.accent.split(' ').filter(c => c.startsWith('bg-')).join(' ');
  const accentTextClass = club.accent.split(' ').filter(c => c.startsWith('text-')).join(' ');

  return (
    <div 
      className={`
        rounded-xl shadow-2xl overflow-hidden cursor-pointer 
        transition-all duration-300 transform 
        bg-white dark:bg-gray-800 
        hover:translate-y-[-8px] 
        group relative
        hover:shadow-gray-400/50 dark:hover:shadow-black/70
        ring-1 ring-gray-100 dark:ring-gray-700
      `}
      onClick={() => onClick(club)}
    >
      
      {/* Colored Top Block */}
      {/* Reduced p-6 padding to p-5 */}
      <div className={`p-5 ${accentBgClass}`}>
        <div className="flex items-center justify-between">
            <Icon className="w-7 h-7 stroke-2 text-white" />
            <span className="text-white text-xs font-semibold opacity-80">
                {/* ID text looks better with the geometric font */}
                {club.id.toUpperCase()}
            </span>
        </div>
        {/* Reduced text-3xl to text-2xl */}
        <h3 className="text-2xl font-extrabold leading-tight text-white mt-4">{club.title}</h3>
      </div>
      
      {/* Description Body */}
      {/* Reduced p-6 padding to p-5 */}
      <div className="p-5 text-gray-600 dark:text-gray-300">
        {/* Reduced text-base to text-sm */}
        <p className="text-sm leading-relaxed mb-5">
          {club.subtitle}
        </p>
        
        {/* Call to Action */}
        <div className={`flex items-center font-bold text-sm ${accentTextClass} transition-colors duration-300`}>
          View Club Details
          <ArrowRight className={`w-4 h-4 ml-2 transition-transform group-hover:translate-x-1`} />
        </div>
      </div>
    </div>
  );
};


// --- Main Directory Component ---

const ClubePage = () => {
  const [selectedClub, setSelectedClub] = useState(null);

  const openModal = (club) => {
    setSelectedClub(club);
  };

  const closeModal = () => {
    setSelectedClub(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-500 font-montserrat text-gray-800 dark:text-gray-100">
      
      {/* Style block to inject the custom font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800;900&display=swap');
          .font-montserrat {
            font-family: 'Montserrat', sans-serif;
          }
        `}
      </style>

      {/* Header Section - Geometric Focus */}
      {/* Reduced py-24 padding to py-16 */}
      <header className="py-16 bg-white dark:bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Reduced text-5xl/6xl to text-4xl/5xl */}
          <h1 className="text-4xl sm:text-5xl font-black mb-3 tracking-tight text-gray-900 dark:text-white">
            Campus Club Explorer
          </h1>
          {/* Reduced text-xl to text-lg */}
          <p className="text-lg font-light max-w-4xl mx-auto text-gray-600 dark:text-gray-400">
            Find your passion, connect with peers, and build something meaningful.
          </p>
          {/* Geometric Separator */}
          <div className="w-1/3 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto mt-4 rounded-sm transform skew-x-[-12deg]"></div>
        </div>
      </header>

      {/* Main Content: Club Grid */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {CLUBS.map((club) => (
            <ClubCard key={club.id} club={club} onClick={openModal} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500 text-sm font-medium">Club Directory UI. All rights reserved.</p>
          </div>
      </footer>
      
      {/* Modal for detailed club view */}
      <ClubModal club={selectedClub} onClose={closeModal} />

    </div>
  );
};

export default ClubePage;
