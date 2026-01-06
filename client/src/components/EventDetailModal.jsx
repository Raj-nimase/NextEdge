const EventDetailModal = ({ event, onClose }) => {
  if (!event) return null;

  // Function to extract YouTube video ID from URL (including Shorts)
  const getYoutubeVideoId = (url) => {
    // Handle regular YouTube URLs
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }

    // Handle YouTube Shorts URLs
    const shortsRegExp = /\/shorts\/([^#&?/]*)/;
    const shortsMatch = url.match(shortsRegExp);
    if (shortsMatch && shortsMatch[1] && shortsMatch[1].length === 11) {
      return shortsMatch[1];
    }

    return null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {event.title}
            </h2>
            <p className="text-sm text-gray-500">
              {new Date(event.date).toDateString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          {/* DESCRIPTION */}
          {event.description && (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {event.description}
            </p>
          )}

          {/* IMAGE GALLERY */}
          {event.images?.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">
                Event Photos
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {event.images.map((img) => (
                  <img
                    key={img.publicId}
                    src={img.url}
                    alt=""
                    className="rounded-lg object-cover h-40 w-full"
                  />
                ))}
              </div>
            </div>
          )}

          {/* YOUTUBE VIDEO */}
          {event.youtubeVideoUrl && (
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">
                Event Video
              </h3>
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                    event.youtubeVideoUrl
                  )}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1`}
                  title="Event Video"
                  className="w-full h-64 md:h-96 rounded-lg"
                  allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen="false"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
