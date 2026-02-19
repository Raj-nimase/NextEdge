import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api/axios";
import { galleryCacheStore } from "../cache/eventsGalleryCache";
import { getErrorMessage, logError } from "../utils/errorHandler";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertCircle, Camera, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function GallerySkeleton() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20">
      <div className="relative mb-14">
        <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
        <div className="h-5 w-full max-w-2xl bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="mt-5 h-[2px] w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:flex md:flex-wrap md:gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-700 animate-pulse aspect-[4/3] md:h-[260px] md:min-w-[200px] md:flex-1"
          />
        ))}
      </div>
    </section>
  );
}

function GalleryErrorBlock({ message, onRetry, isRetrying }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col items-center justify-center py-16">
        <div className="max-w-lg w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            We could not load the gallery
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
          <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {isRetrying && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Gallery() {
  const cardsRef = useRef([]);
  const [activeImage, setActiveImage] = useState(null);
  const [images, setImages] = useState(() => galleryCacheStore.get() ?? []);
  const [loading, setLoading] = useState(() => galleryCacheStore.get() === null);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  const fetchGallery = useCallback(async (isRetry = false) => {
    if (isRetry) setRetrying(true);
    else setLoading(true);
    setError(null);
    
    try {
      const response = await api.get("/events/gallery", { timeout: 10000 });
      
      // Validate response structure
      if (!response || !response.data) {
        throw new Error("Invalid response format from server");
      }

      // Handle successful response with images
      if (response.data.success && Array.isArray(response.data.images)) {
        const data = response.data.images;
        
        // Validate images array
        if (!Array.isArray(data)) {
          console.warn("Gallery images data is not an array:", data);
          setImages([]);
          return;
        }

        setImages(data);
        // Only cache non-empty results
        if (data.length > 0) {
          galleryCacheStore.set(data);
        }
      } 
      // Handle API error response (success: false)
      else if (response.data.success === false) {
        throw new Error(response.data.message || "Failed to fetch gallery images");
      }
      // Handle unexpected response format
      else {
        console.warn("Unexpected gallery response format:", response.data);
        setImages([]);
      }
    } catch (err) {
      logError("Gallery Fetch", err);
      const errorMessage = getErrorMessage(err, "Unable to load gallery images.");
      setError(errorMessage);
      
      // Don't clear cache on error - keep showing last successful data if available
      // Only clear cache if this was a retry and we want fresh data
      if (isRetry && images.length === 0) {
        galleryCacheStore.set(null);
      }
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  }, [images.length]);

  useEffect(() => {
    if (galleryCacheStore.get() !== null) return;
    fetchGallery();
  }, [fetchGallery]);

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

  const handleImageError = (e) => {
    e.target.src =
      "https://via.placeholder.com/800x600/e5e7eb/6b7280?text=Image+Not+Available";
  };

  if (loading) {
    return (
      <>
        <GallerySkeleton />
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <section className="w-full max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-14"
          >
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
          </motion.div>
        </section>
        <GalleryErrorBlock
          message={error}
          onRetry={() => fetchGallery(true)}
          isRetrying={retrying}
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-14"
        >
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
        </motion.div>

        {images.length === 0 && (
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

        {images.length > 0 && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 gap-6 md:hidden"
          >
            {images.map((item, index) => (
              <motion.div
                key={`${item.publicId}-${index}`}
                ref={(el) => (cardsRef.current[index] = el)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
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
              </motion.div>
            ))}
          </motion.div>
        )}

        {images.length > 0 && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
            className="hidden md:flex gap-4 flex-wrap"
          >
            {images.map((item, index) => (
              <motion.div
                key={`${item.publicId}-${index}`}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  show: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveImage(item)}
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveImage(null)}
            className="
      fixed inset-0 z-50
      bg-black/90 backdrop-blur-sm
      flex items-center justify-center
      px-6
    "
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="
        w-full max-w-6xl
        bg-black/40
        rounded-2xl
        p-6 md:p-8
        flex flex-col md:flex-row
        gap-8
        items-center
      "
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
