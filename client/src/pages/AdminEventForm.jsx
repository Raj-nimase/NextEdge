import { useState } from "react";
import { api } from "../api/axios.js";
import { isValidYoutubeUrl } from "../utils/youtube.js";
import {
  Calendar,
  MapPin,
  Image as ImageIcon,
  Youtube,
  FileText,
  Loader2,
  CheckCircle2,
  X,
  Clock,
} from "lucide-react";

const AdminEventForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [amPm, setAmPm] = useState("PM");
  const [location, setLocation] = useState("");
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState("");

  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Convert time inputs to ISO datetime string
  const combineDateTime = (dateStr, timeStr, amPmStr) => {
    if (!dateStr) return "";

    const [hours, minutes] = timeStr.split(":");
    let h = parseInt(hours, 10);

    // Normalize to 12-hour base (0-11) before applying AM/PM
    // This handles cases where the time input already provides a 24h value
    h = h % 12;
    if (amPmStr === "PM") h += 12;

    const dateTimeStr = `${dateStr}T${String(h).padStart(2, "0")}:${minutes}:00`;
    return dateTimeStr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validate YouTube URL if provided
    if (youtubeVideoUrl && !isValidYoutubeUrl(youtubeVideoUrl)) {
      setError("Please enter a valid YouTube URL");
      setLoading(false);
      return;
    }

    // Combine date and time into ISO datetime string
    const dateTime = combineDateTime(date, time, amPm);
    if (!dateTime) {
      setError("Please select an event date");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", dateTime);
    formData.append("location", location);
    formData.append("youtubeVideoUrl", youtubeVideoUrl);

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      await api.post("/events", formData);
      setSuccess(true);
      setTitle("");
      setDescription("");
      setDate("");
      setTime("12:00");
      setAmPm("PM");
      setLocation("");
      setYoutubeVideoUrl("");
      setCoverImage(null);

      setTimeout(() => {
        setSuccess(false);
        if (onSuccess) {
          onSuccess();
        }
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create event. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Create New Event
        </h2>
        <p className="text-indigo-100 text-sm mt-1">
          Fill in the details below to create a new event
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Success Message */}
        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            <p className="text-green-800 dark:text-green-200 font-medium">
              Event created successfully!
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
            <X className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <p className="text-red-800 dark:text-red-200 font-medium">
              {error}
            </p>
          </div>
        )}

        {/* Title */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <FileText className="w-4 h-4" />
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title"
            className="w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <FileText className="w-4 h-4" />
            Description
          </label>
          <textarea
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter event description..."
            className="w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Calendar className="w-4 h-4" />
              Event Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Clock className="w-4 h-4" />
              Event Time <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1 px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
              <select
                value={amPm}
                onChange={(e) => setAmPm(e.target.value)}
                className="px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Selected: {date && time && `${date} ${time} ${amPm}`}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter event location"
            className="w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
          />
        </div>

        {/* Cover Image Upload */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <ImageIcon className="w-4 h-4" />
            Cover Image
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files[0] || null)}
              className="block w-full text-sm text-gray-600 dark:text-gray-400 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 dark:file:bg-indigo-900/30 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/50"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Select a single cover image for the event card
            </p>
          </div>

          {/* Cover Image Preview */}
          {coverImage && (
            <div className="relative group mt-4 inline-block">
              <img
                src={URL.createObjectURL(coverImage)}
                alt="cover preview"
                className="h-40 w-64 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
              />
              <button
                type="button"
                onClick={() => setCoverImage(null)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center rounded-b-lg">
                Cover Image
              </div>
            </div>
          )}
        </div>

        {/* YouTube Video URL */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Youtube className="w-4 h-4" />
            YouTube Video URL{" "}
            <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input
            type="url"
            value={youtubeVideoUrl}
            onChange={(e) => setYoutubeVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
          />
          {youtubeVideoUrl && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Make sure the URL is a valid YouTube link
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Event...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Create Event
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEventForm;
