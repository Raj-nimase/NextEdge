import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Thumbs, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const events = [
  {
    title: "Startup Pitch Competition",
    date: "Oct 12, 2025 09:00:00",
    location: "Business School Auditorium",
    description:
      "Showcase your business ideas to potential investors and win seed funding to kickstart your entrepreneurial journey.",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Upcoming Event",
  },
  {
    title: "Dance Competition",
    date: "Sep 15, 2025 11:00:00",
    location: "Business School Auditorium",
    description:
      "Showcase your Dance skills to potential investors and win seed funding to kickstart your journey.",
    image:
      "https://images.unsplash.com/photo-1537365587684-f490102e1225?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Upcoming Event",
  },
  // Add more events...
];

const UpcomingEvents = () => {
  const thumbsSwiperRef = useRef(null);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Track which event is active
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const targetDate = new Date(events[activeIndex].date).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    updateCountdown(); // Run immediately once
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [activeIndex]); // Re-run when active event changes

  return (
    <section className="py-20 px-4 sm:px-[5vw] bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Join us at our upcoming events and be part of the NextEdge experience.
        </p>

        {/* Countdown Timer */}
        <div className="inline-flex gap-6 bg-blue-100 dark:bg-blue-900 rounded-xl px-6 py-3 text-blue-800 dark:text-blue-300 font-semibold text-lg select-none justify-center w-full max-w-md mx-auto mb-12 shadow-md">
          <div className="flex flex-col items-center">
            <span>{timeLeft.days}</span>
            <small className="text-xs">Days</small>
          </div>
          <div className="flex flex-col items-center">
            <span>{timeLeft.hours.toString().padStart(2, "0")}</span>
            <small className="text-xs">Hours</small>
          </div>
          <div className="flex flex-col items-center">
            <span>{timeLeft.minutes.toString().padStart(2, "0")}</span>
            <small className="text-xs">Minutes</small>
          </div>
          <div className="flex flex-col items-center">
            <span>{timeLeft.seconds.toString().padStart(2, "0")}</span>
            <small className="text-xs">Seconds</small>
          </div>
        </div>
      </div>

      {/* Main Swiper */}
      <div className="max-w-5xl mx-auto mb-12">
        <Swiper
          modules={[EffectFade, Autoplay, Pagination, Thumbs]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiperRef.current }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (swiper?.thumbs && thumbsSwiperRef.current) {
                swiper.thumbs.swiper = thumbsSwiperRef.current;
              }
            }, 0);
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // 🔥 Update active event
          className="rounded-xl overflow-hidden"
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row bg-white dark:bg-white/5 shadow-md rounded-xl overflow-hidden transition-colors duration-300">
                <div className="md:w-1/2 h-60 md:h-auto">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-white text-xs font-medium px-3 py-1 rounded-full mb-3 w-fit">
                    {event.badge}
                  </span>
                  <h3 className="text-2xl font-semibold mb-3">{event.title}</h3>

                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <FaCalendarAlt className="mr-2" /> {event.date}
                  </div>

                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <FaMapMarkerAlt className="mr-2" /> {event.location}
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  <a
                    href="#"
                    className="inline-block bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600 w-fit"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* See All Events Button */}
      <div className="flex justify-center mt-10">
        <a
          href="/events"
          className="inline-block px-6 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          See All Events →
        </a>
      </div>
    </section>
  );
};

export default UpcomingEvents;
