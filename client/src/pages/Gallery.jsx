import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertCircle, Camera, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const cardsRef = useRef([]);
  const [activeImage, setActiveImage] = useState(null);

  // API State Management
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images from backend
  useEffect(() => {
    const fetchGalleryImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:3000/api/events/gallery",
          { timeout: 10000 }
        );

        if (response.data.success && Array.isArray(response.data.images)) {
          setImages(response.data.images);
        } else {
          setImages([]);
        }
      } catch (err) {
        console.error("Gallery API Error:", err);
        setError(
          err.response?.data?.message ||
            "Unable to load gallery images. Please try again later."
        );
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  /* Scroll animations for mobile cards */
  useEffect(() => {
    if (images.length === 0) return;

    cardsRef.current.forEach((card) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, [images]);

  // Handle image load error
  const handleImageError = (e) => {
    e.target.src =
      "https://via.placeholder.com/800x600/e5e7eb/6b7280?text=Image+Not+Available";
  };

  return (
    <>
      {/* ===== SECTION ===== */}
      <section className="w-full max-w-7xl mx-auto px-4 py-20">
        {/* ===== HEADER ===== */}
        <div className="relative mb-14">
          <span className="absolute -top-6 left-0 text-6xl font-bold text-blue-500/10 select-none">
            Gallery
          </span>

          <h1 className="relative text-3xl md:text-5xl font-bold dark:text-white">
            Media Gallery
          </h1>

          <p className="mt-3 max-w-2xl text-base md:text-lg text-gray-600 dark:text-gray-400">
            A visual archive of moments from events, workshops, and
            community-driven experiences that define our journey.
          </p>

          <div className="mt-5 h-[2px] w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>

        {/* ===== LOADING STATE ===== */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading gallery images...
            </p>
          </div>
        )}

        {/* ===== ERROR STATE ===== */}
        {error && !loading && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-start space-x-4">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-1">
                Failed to Load Gallery
              </h3>
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* ===== EMPTY STATE (NO IMAGES) ===== */}
        {!loading && !error && images.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Camera className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No Event Images Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Our gallery is currently empty. Check back soon as we capture
              moments from upcoming events!
            </p>
          </div>
        )}

        {/* ===== MOBILE VIEW ===== */}
        {!loading && !error && images.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {images.map((item, index) => (
              <div
                key={`${item.publicId}-${index}`}
                ref={(el) => (cardsRef.current[index] = el)}
                className="relative rounded-xl overflow-hidden shadow-lg"
              >
                <div className="aspect-[4/3]">
                  <img
                    src={item.url}
                    alt={item.eventTitle}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{item.eventTitle}</h3>
                  <p className="text-sm opacity-80">
                    {new Date(item.eventDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== DESKTOP VIEW ===== */}
        {!loading && !error && images.length > 0 && (
          <div className="hidden md:flex gap-4 flex-wrap">
            {images.map((item, index) => (
              <div
                key={`${item.publicId}-${index}`}
                onClick={() => {
                  setActiveImage(item);
                }}
                className="
                  group cursor-pointer
                  relative flex-1 h-[260px] min-w-[200px]
                  rounded-xl overflow-hidden shadow-lg
                  transition-all duration-300
                  hover:flex-[2]
                "
              >
                <img
                  src={item.url}
                  alt={item.eventTitle}
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition">
                  <h3 className="text-lg font-semibold">{item.eventTitle}</h3>
                  <p className="text-sm opacity-90">
                    {new Date(item.eventDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs opacity-75 mt-1">
                    {item.eventLocation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== FULLSCREEN IMAGE OVERLAY ===== */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="
      fixed inset-0 z-50
      bg-black/90 backdrop-blur-sm
      flex items-center justify-center
      px-6
    "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
        w-full max-w-6xl
        bg-black/40
        rounded-2xl
        p-6 md:p-8
        flex flex-col md:flex-row
        gap-8
        items-center
        animate-fadeIn
      "
          >
            {/* LEFT: Event Details */}
            <div className="w-full md:w-[30%] text-white space-y-4">
              <h3 className="text-2xl font-bold leading-tight">
                {activeImage.eventTitle}
              </h3>

              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>
                    {new Date(activeImage.eventDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{activeImage.eventLocation}</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 pt-4 border-t border-white/10">
                Click outside to close
              </p>
            </div>

            {/* RIGHT: Image */}
            <div className="w-full md:w-[70%] flex justify-center">
              <img
                src={activeImage.url}
                alt={activeImage.eventTitle}
                onError={handleImageError}
                className="
            max-w-full
            max-h-[85vh]
            rounded-xl
            shadow-2xl
            object-contain
          "
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
