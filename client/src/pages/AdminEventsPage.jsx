import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminEventForm from "./AdminEventForm";
import { Calendar, ArrowLeft } from "lucide-react";

const AdminEventsPage = () => {
  const [key, setKey] = useState(0);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setKey((k) => k + 1);
    navigate("/admin/events");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 md:mt-14 p-6 md:p-8">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/admin/events"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            Create Event
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Add a new event for your organization
          </p>
        </div>
      </div>

      <AdminEventForm key={key} onSuccess={handleSuccess} />
    </div>
  );
};

export default AdminEventsPage;
