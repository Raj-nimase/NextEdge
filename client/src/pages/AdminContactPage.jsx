import { useEffect, useState } from "react";
import { api } from "../api/axios.js";
import { Trash2, Mail, Phone, Calendar, User, BookOpen, MessageSquare } from "lucide-react";

const AdminContactPage = () => {
  const [activeTab, setActiveTab] = useState("membership");
  const [memberships, setMemberships] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMemberships = async () => {
    try {
      const res = await api.get("/contacts/membership");
      setMemberships(res.data.memberships || []);
    } catch (error) {
      console.error("Error fetching memberships:", error);
      setMemberships([]);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const res = await api.get("/contacts/volunteer");
      setVolunteers(res.data.volunteers || []);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
      setVolunteers([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchMemberships(), fetchVolunteers()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteMembership = async (id) => {
    if (!confirm("Delete this membership application?")) return;
    try {
      await api.delete(`/contacts/membership/${id}`);
      fetchMemberships();
    } catch (error) {
      console.error("Error deleting membership:", error);
      alert("Failed to delete membership application");
    }
  };

  const deleteVolunteer = async (id) => {
    if (!confirm("Delete this volunteer application?")) return;
    try {
      await api.delete(`/contacts/volunteer/${id}`);
      fetchVolunteers();
    } catch (error) {
      console.error("Error deleting volunteer:", error);
      alert("Failed to delete volunteer application");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Contact Form Submissions
        </h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("membership")}
            className={`py-3 px-6 text-lg font-medium transition-colors duration-150 ${
              activeTab === "membership"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            Membership Applications ({memberships.length})
          </button>
          <button
            onClick={() => setActiveTab("volunteer")}
            className={`py-3 px-6 text-lg font-medium transition-colors duration-150 ${
              activeTab === "volunteer"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            Volunteer Applications ({volunteers.length})
          </button>
        </div>

        {/* Membership Applications */}
        {activeTab === "membership" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
            {memberships.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No membership applications yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Year</th>
                      <th className="p-4">Interests</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Submitted</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberships.map((membership) => (
                      <tr
                        key={membership._id}
                        className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="p-4 font-medium text-gray-900 dark:text-white">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-blue-500" />
                            {membership.name}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-blue-500" />
                            <a
                              href={`mailto:${membership.email}`}
                              className="hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {membership.email}
                            </a>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {membership.phone ? (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-blue-500" />
                              {membership.phone}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                            {membership.year}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {membership.interests && membership.interests.length > 0 ? (
                              membership.interests.map((interest, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                                >
                                  {interest}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400">None</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300 max-w-xs">
                          {membership.message ? (
                            <div className="flex items-start">
                              <MessageSquare className="w-4 h-4 mr-2 text-blue-500 mt-1 flex-shrink-0" />
                              <p className="text-sm line-clamp-2">{membership.message}</p>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300 text-sm">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                            {new Date(membership.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => deleteMembership(membership._id)}
                            className="ml-auto flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Volunteer Applications */}
        {activeTab === "volunteer" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
            {volunteers.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No volunteer applications yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Year</th>
                      <th className="p-4">Interest Area</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Submitted</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteers.map((volunteer) => (
                      <tr
                        key={volunteer._id}
                        className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="p-4 font-medium text-gray-900 dark:text-white">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-blue-500" />
                            {volunteer.name}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-blue-500" />
                            <a
                              href={`mailto:${volunteer.email}`}
                              className="hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {volunteer.email}
                            </a>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {volunteer.phone ? (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-blue-500" />
                              {volunteer.phone}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                            {volunteer.year}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                            {volunteer.interestArea}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300 max-w-xs">
                          {volunteer.message ? (
                            <div className="flex items-start">
                              <MessageSquare className="w-4 h-4 mr-2 text-blue-500 mt-1 flex-shrink-0" />
                              <p className="text-sm line-clamp-2">{volunteer.message}</p>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300 text-sm">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                            {new Date(volunteer.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => deleteVolunteer(volunteer._id)}
                            className="ml-auto flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContactPage;
