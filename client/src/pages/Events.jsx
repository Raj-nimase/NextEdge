import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import EventDetailModal from "../components/EventDetailModal";
import Footer from "../components/Footer";
import { api } from "../api/axios.js";

export const eventsLoader = async () => {
  try {
    const res = await api.get("/events", {
      timeout: 8000,
    });

    if (Array.isArray(res.data)) {
      return res.data;
    } else if (Array.isArray(res.data?.events)) {
      return res.data.events;
    } else {
      return [];
    }
  } catch (err) {
    console.error("API failed:", err);
    throw new Response("Unable to load events right now.", { status: 500 });
  }
};

const Events = () => {
  const events = useLoaderData();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const now = new Date();

  const upcomingEvents = events.filter((e) => new Date(e.date) >= now);

  const pastEvents = events.filter((e) => new Date(e.date) < now);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="min-h-screen pt-30">
        <div className="w-full mx-auto space-y-14 md:px-30">
          {/* ERROR */}

          {/* UPCOMING EVENTS */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Upcoming Events
            </h2>

            {upcomingEvents.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No upcoming events.
              </p>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {upcomingEvents.map((event) => (
                  <motion.div
                    key={event._id}
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedEvent(event)}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden
  cursor-pointer transition"
                  >
                    {/* ✅ EVENT IMAGE (FIRST IMAGE ONLY) */}
                    {event.images?.length > 0 ? (
                      <img
                        src={event.images[0].url}
                        alt={event.title}
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}

                    <div className="p-5">
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </section>

          {/* PAST EVENTS */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Past Events
            </h2>

            {pastEvents.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No past events.
              </p>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {pastEvents.map((event) => (
                  <motion.div
                    key={event._id}
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedEvent(event)}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4
  cursor-pointer hover:shadow-lg transition"
                  >
                    <div>
                      <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toDateString()}
                      </p>
                    </div>

                    {/* ✅ EVENT IMAGE (FIRST IMAGE ONLY) */}
                    {event.images?.length > 0 ? (
                      <img
                        src={event.images[0].url}
                        alt={event.title}
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
            {selectedEvent && (
              <EventDetailModal
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
              />
            )}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Events;
