import { useEffect, useState } from "react";
import axios from "axios";
import AdminEventForm from "./AdminEventForm";
import AdminEventTable from "./AdminEventTable";
import AdminEventEditModal from "./AdminEventEditModal";

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:3000/api/events");
    setEvents(res.data.events || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-8 space-y-10">
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
  );
};

export default AdminEventsPage;
