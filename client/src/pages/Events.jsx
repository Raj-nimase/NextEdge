import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import CountdownTimer from "../components/CountdownTimer";
import RegistrationWindow from "../components/RegistrationWindow";
import { api } from "../api/axios.js";
import { eventsCacheStore } from "../cache/eventsGalleryCache";
import { getErrorMessage, logError } from "../utils/errorHandler";
import { AlertCircle, Loader2 } from "lucide-react";

function EventsSkeleton() {
  return (
    <div className="w-full mx-auto space-y-14 md:px-30">
      <section>
        <div className="h-9 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden"
            >
              <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="p-5 space-y-2">
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="h-9 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4"
            >
              <div className="space-y-2">
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function EventsErrorBlock({ message, onRetry, isRetrying }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-8 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          We could not load events
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {isRetrying && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Try again
        </button>
      </div>
    </div>
  );
}

const Events = () => {
  const [events, setEvents] = useState(() => eventsCacheStore.get() ?? []);
  const [loading, setLoading] = useState(() => eventsCacheStore.get() === null);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  const fetchEvents = useCallback(
    async (isRetry = false) => {
      if (isRetry) setRetrying(true);
      else setLoading(true);
      setError(null);

      try {
        const res = await api.get("/events", { timeout: 8000 });

        // Validate response structure
        if (!res || !res.data) {
          throw new Error("Invalid response format from server");
        }

        // Extract events array from response
        let data = [];
        if (Array.isArray(res.data)) {
          data = res.data;
        } else if (Array.isArray(res.data?.events)) {
          data = res.data.events;
        } else if (res.data?.success === false) {
          // Handle API error response
          throw new Error(res.data.message || "Failed to fetch events");
        }

        // Validate data is an array before setting
        if (!Array.isArray(data)) {
          console.warn("Events data is not an array:", data);
          data = [];
        }

        setEvents(data);
        eventsCacheStore.set(data);
      } catch (err) {
        logError("Events Fetch", err);
        const errorMessage = getErrorMessage(
          err,
          "Unable to load events right now.",
        );
        setError(errorMessage);

        // Don't clear cache on error - keep showing last successful data if available
        // Only clear cache if this was a retry and we want fresh data
        if (isRetry && events.length === 0) {
          eventsCacheStore.set(null);
        }
      } finally {
        setLoading(false);
        setRetrying(false);
      }
    },
    [events.length],
  );

  useEffect(() => {
    if (eventsCacheStore.get() !== null) return;
    fetchEvents();
  }, [fetchEvents]);

  const now = new Date();
  const getEventStart = (event) =>
    event.eventStartDate ? new Date(event.eventStartDate) : new Date(event.date);

  const categorizeEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOngoing = [];
    const todayPast = [];
    const upcoming = [];
    const past = [];

    events.forEach((event) => {
      const eventDate = getEventStart(event);
      const eventDateOnly = new Date(eventDate);
      eventDateOnly.setHours(0, 0, 0, 0);
      const isToday = eventDateOnly.getTime() === today.getTime();

      if (isToday) {
        if (eventDate > now) todayOngoing.push(event);
        else todayPast.push(event);
      } else if (eventDate > now) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    return { todayOngoing, todayPast, upcoming, past };
  };

  const { todayOngoing, todayPast, upcoming, past } = categorizeEvents();

  // Combine today ongoing + upcoming for "Upcoming Events" section
  const upcomingEvents = [...todayOngoing, ...upcoming];

  // Combine today past + past for "Past Events" section
  const pastEvents = [...todayPast, ...past];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen pt-30">
          <EventsSkeleton />
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="min-h-screen pt-30">
          <EventsErrorBlock
            message={error}
            onRetry={() => fetchEvents(true)}
            isRetrying={retrying}
          />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen pt-30">
        <div className="w-full mx-auto space-y-14 md:px-30">
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
                {upcomingEvents.map((event) => {
                  const start = getEventStart(event);
                  return (
                    <motion.div
                      key={event._id}
                      variants={item}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden transition"
                    >
                      <Link to={`/events/${event._id}`} className="block">
                        {event.coverImage?.url ? (
                          <img
                            src={event.coverImage.url}
                            alt={event.title}
                            className="h-48 w-full object-cover"
                          />
                        ) : (
                          <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}

                        <div className="p-5">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                                (event.accessType || "public") === "members"
                                  ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {(event.accessType || "public") === "members" ? "Members only" : "Public"}
                            </span>
                          </div>
                          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {start.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {start.toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Starts in</p>
                            <CountdownTimer
                              targetDate={event.eventStartDate || event.date}
                              endedLabel="Started"
                              compact
                            />
                          </div>
                          {(event.registrationStartDate || event.registrationEndDate) && (
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Registration</p>
                              <RegistrationWindow
                                registrationStartDate={event.registrationStartDate}
                                registrationEndDate={event.registrationEndDate}
                                compact
                              />
                            </div>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </section>

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
                {pastEvents.map((event) => {
                  const start = getEventStart(event);
                  return (
                    <motion.div
                      key={event._id}
                      variants={item}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4 hover:shadow-lg transition"
                    >
                      <Link to={`/events/${event._id}`} className="block">
                        <div>
                          <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {start.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {start.toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                        </div>

                        {event.coverImage?.url ? (
                          <img
                            src={event.coverImage.url}
                            alt={event.title}
                            className="h-48 w-full object-cover"
                          />
                        ) : (
                          <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Events;
