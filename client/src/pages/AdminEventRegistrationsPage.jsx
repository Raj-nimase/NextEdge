import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/axios.js";
import { Users, ArrowLeft, Loader2 } from "lucide-react";

const AdminEventRegistrationsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [eventRes, regRes] = await Promise.all([
          api.get(`/events/${eventId}`),
          api.get(`/events/${eventId}/registrations`),
        ]);
        setEvent(eventRes.data?.event ?? null);
        setRegistrations(regRes.data?.registrations ?? []);
      } catch {
        setEvent(null);
        setRegistrations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <p className="text-gray-600 dark:text-gray-400">Event not found.</p>
        <Link to="/admin/events" className="text-indigo-600 dark:text-indigo-400 hover:underline mt-2 inline-block">
          Back to Events
        </Link>
      </div>
    );
  }

  const eventTitle = event.title;
  const eventDate = event.eventStartDate || event.date;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 md:mt-14 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/admin/events"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              Registrations
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {eventTitle}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-0.5">
              {eventDate
                ? new Date(eventDate).toLocaleString(undefined, {
                    dateStyle: "long",
                    timeStyle: "short",
                  })
                : ""}
            </p>
          </div>

          <div className="p-6">
            {registrations.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No one has registered for this event yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                      <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300 rounded-tl-lg">
                        Name
                      </th>
                      <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </th>
                      <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                        Type
                      </th>
                      <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300 rounded-tr-lg">
                        Registered at
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((r) => (
                      <tr
                        key={r._id}
                        className="border-t border-gray-200 dark:border-gray-600"
                      >
                        <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                          {r.name}
                        </td>
                        <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                          {r.email}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                              r.type === "member"
                                ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {r.type === "member" ? "Member" : "Guest"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                          {r.registrationTimestamp
                            ? new Date(r.registrationTimestamp).toLocaleString(
                                undefined,
                                { dateStyle: "short", timeStyle: "short" }
                              )
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Total: {registrations.length} registration{registrations.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventRegistrationsPage;
