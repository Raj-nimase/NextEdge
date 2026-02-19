import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios.js";
import AdminEventForm from "./AdminEventForm";
import AdminEventTable from "./AdminEventTable";
import AdminEventEditModal from "./AdminEventEditModal";
import { MessageSquare, Calendar } from "lucide-react";

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data.events || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 md:mt-14 p-6 md:p-8">
      {/* Header with Navigation */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            Events Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create and manage events for your organization
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/contacts")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <MessageSquare className="w-5 h-5" />
          View Contacts
        </button>
      </div>

      <div className="space-y-8">
        <AdminEventForm onSuccess={fetchEvents} />

        <AdminEventTable
          events={events}
          onEdit={setSelectedEvent}
          onDelete={fetchEvents}
        />

        {selectedEvent && (
          <AdminEventEditModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onUpdated={fetchEvents}
          />
        )}
      </div>
    </div>
  );
};

export default AdminEventsPage;
