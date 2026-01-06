import { useEffect, useState } from "react";
import axios from "axios";
import EventDetailModal from "../components/EventDetailModal";
import Footer from "../components/Footer";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get("http://localhost:3000/api/events", {
          timeout: 8000,
        });

        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else if (Array.isArray(res.data?.events)) {
          setEvents(res.data.events);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("API failed:", err);
        setError("Unable to load events right now.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const now = new Date();

  const upcomingEvents = events.filter((e) => new Date(e.date) >= now);

  const pastEvents = events.filter((e) => new Date(e.date) < now);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-300">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="w-full mx-auto space-y-14 md:px-30">
        {/* ERROR */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event._id}
                  onClick={() => setSelectedEvent(event)}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden
  cursor-pointer hover:scale-[1.02] transition"
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
                </div>
              ))}
            </div>
          )}
        </section>

        {/* PAST EVENTS */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Past Events
          </h2>

          {pastEvents.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No past events.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <div
                  key={event._id}
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
                </div>
              ))}
            </div>
          )}
          {selectedEvent && (
            <EventDetailModal
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Events;
