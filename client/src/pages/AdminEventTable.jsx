import axios from "axios";

const AdminEventTable = ({ events, onEdit, onDelete }) => {
  const deleteEvent = async (id) => {
    if (!confirm("Delete this event?")) return;
    await axios.delete(`http://localhost:3000/api/events/${id}`);
    onDelete();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-4">Title</th>
            <th>Date</th>
            <th>Type</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event._id} className="border-t">
              <td className="p-4 font-medium">{event.title}</td>
              <td>{new Date(event.date).toDateString()}</td>
              <td>
                {new Date(event.date) >= new Date()
                  ? "Upcoming"
                  : "Past"}
              </td>
              <td className="p-4 flex gap-2 justify-end">
                <button
                  onClick={() => onEdit(event)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEvent(event._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEventTable;
