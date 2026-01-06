import { useState } from "react";
import axios from "axios";

const AdminEventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState("");

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate YouTube URL if provided
    if (youtubeVideoUrl && !isValidYoutubeUrl(youtubeVideoUrl)) {
      alert("Please enter a valid YouTube URL");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("youtubeVideoUrl", youtubeVideoUrl);

    images.forEach((img) => formData.append("images", img));

    try {
      await axios.post("http://localhost:3000/api/events", formData);
      alert("Event created successfully!");
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setYoutubeVideoUrl("");
      setImages([]);
    } catch (err) {
      alert("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  const isValidYoutubeUrl = (url) => {
    // Handle regular YouTube URLs
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return true;
    }

    // Handle YouTube Shorts URLs
    const shortsRegExp = /\/shorts\/([^#&?/]*)/;
    const shortsMatch = url.match(shortsRegExp);
    if (shortsMatch && shortsMatch[1] && shortsMatch[1].length === 11) {
      return true;
    }

    return false;
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6 transition-colors">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Create Event
            </h2>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Event Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-transparent
              text-gray-800 dark:text-gray-100
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-transparent
              text-gray-800 dark:text-gray-100
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Date & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-transparent
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
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-transparent
                text-gray-800 dark:text-gray-100
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Image Upload + Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages([...e.target.files])}
              className="block w-full text-sm text-gray-500"
            />

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="h-24 w-full object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* YouTube Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              YouTube Video URL
            </label>
            <input
              type="url"
              value={youtubeVideoUrl}
              onChange={(e) => setYoutubeVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-2 border rounded-lg bg-transparent
              text-gray-800 dark:text-gray-100
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition
            ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }
          `}
          >
            {loading ? "Uploading..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEventForm;
