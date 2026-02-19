import { useState, useEffect } from "react";
import { api } from "../api/axios.js";
import { isValidYoutubeUrl } from "../utils/youtube.js";
import { Clock } from "lucide-react";

const AdminEventEditModal = ({ event, onClose, onUpdated }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [location, setLocation] = useState(event.location);
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState(
    event.youtubeVideoUrl || "",
  );
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Determine if the event is in the past
  const isPast = new Date(event.date) < new Date();

  // Extract date and time from event.date
  useEffect(() => {
    if (event.date) {
      const eventDate = new Date(event.date);
      setDate(eventDate.toISOString().slice(0, 10));

      const hours = eventDate.getHours();
      const minutes = eventDate.getMinutes();

      // Store time in 24-hour format (which is what <input type="time"> uses)
      setTime(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`,
      );
    }
  }, [event.date]);

  // Convert time inputs to ISO datetime string
  const combineDateTime = (dateStr, timeStr) => {
    if (!dateStr) return event.date; // fallback to original

    // timeStr is already in 24-hour format from <input type="time"> (e.g. "14:30")
    const dateTimeStr = `${dateStr}T${timeStr}:00`;
    return dateTimeStr;
  };

  const updateEvent = async () => {
    try {
      setLoading(true);

      // Validate YouTube URL if provided
      if (youtubeVideoUrl && !isValidYoutubeUrl(youtubeVideoUrl)) {
        alert("Please enter a valid YouTube URL");
        setLoading(false);
        return;
      }

      // Combine date and time into ISO datetime string
      const dateTime = combineDateTime(date, time);

      await api.put(`/events/${event._id}`, {
        title,
        description,
        date: dateTime,
        location,
        youtubeVideoUrl,
      });

      // Only allow adding gallery images if event is past
      if (isPast && newImages.length) {
        const mediaData = new FormData();
        newImages.forEach((img) => mediaData.append("images", img));

        await api.patch(`/events/${event._id}/media`, mediaData);
      }

      onUpdated();
      onClose();
    } catch (error) {
      console.error("Update event error:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update event";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (publicId) => {
    await api.delete(
      `/events/${event._id}/media/${encodeURIComponent(publicId)}`,
    );

    onUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Edit Event
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">
          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-transparent
                text-gray-800 dark:text-gray-100
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-transparent
                text-gray-800 dark:text-gray-100
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-transparent
                text-gray-800 dark:text-gray-100
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Clock className="w-4 h-4" />
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-transparent
                text-gray-800 dark:text-gray-100
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-transparent
              text-gray-800 dark:text-gray-100
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* COVER IMAGE (always visible) */}
          {event.coverImage?.url && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Cover Image
              </h3>
              <img
                src={event.coverImage.url}
                alt="Cover"
                className="h-40 w-64 object-cover rounded-lg border dark:border-gray-700"
              />
            </div>
          )}

          {/* GALLERY IMAGES — only for past events */}
          {isPast && (
            <>
              {/* EXISTING GALLERY IMAGES */}
              {event.images?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Gallery Images
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {event.images.map((img) => (
                      <div
                        key={img.publicId}
                        className="relative group overflow-hidden rounded-lg border dark:border-gray-700"
                      >
                        <img
                          src={img.url}
                          alt=""
                          className="h-28 w-full object-cover"
                        />

                        <button
                          onClick={() => deleteMedia(img.publicId)}
                          className="absolute inset-0 bg-black/60 text-white
                          opacity-0 group-hover:opacity-100 transition
                          flex items-center justify-center text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ADD GALLERY IMAGES */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Add Gallery Images
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Add photos from this past event to show in the gallery
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setNewImages([...e.target.files])}
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
                />
              </div>
            </>
          )}

          {!isPast && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                📸 Gallery images can be added after the event has passed.
              </p>
            </div>
          )}

          {/* YOUTUBE URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              YouTube Video URL
            </label>
            <input
              type="url"
              value={youtubeVideoUrl}
              onChange={(e) => setYoutubeVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3 py-2 border rounded-lg bg-transparent
              text-gray-800 dark:text-gray-100
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border
            text-gray-700 dark:text-gray-300
            border-gray-300 dark:border-gray-600
            hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={updateEvent}
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white font-semibold
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEventEditModal;
