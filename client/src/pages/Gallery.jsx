import { motion } from "framer-motion";
import { useState } from "react";
import Footer from "../components/Footer";

const images = [
  {
    src: "https://picsum.photos/id/1011/800/600",
    title: "Adventure",
    desc: "Explore the mountains and lakes",
  },
  {
    src: "https://picsum.photos/id/1012/800/600",
    title: "Relaxation",
    desc: "Find peace in nature",
  },
  {
    src: "https://picsum.photos/id/1015/800/600",
    title: "Wildlife",
    desc: "Experience the wilderness",
  },
  {
    src: "https://picsum.photos/id/1016/800/600",
    title: "Travel",
    desc: "Discover hidden places",
  },
  {
    src: "https://picsum.photos/id/1018/800/600",
    title: "Sunset",
    desc: "Golden hour vibes",
  },
  {
    src: "https://picsum.photos/id/1020/800/600",
    title: "Hiking",
    desc: "Walk the unbeaten paths",
  },
  {
    src: "https://picsum.photos/id/1021/800/600",
    title: "Wilderness",
    desc: "Where nature rules",
  },
  {
    src: "https://picsum.photos/id/1022/800/600",
    title: "Aurora",
    desc: "Witness northern lights",
  },
];

export default function Gallery() {
  const [hovered, setHovered] = useState(null);

  // Group images into rows of 4
  const rows = [];
  for (let i = 0; i < images.length; i += 4) {
    rows.push(images.slice(i, i + 4));
  }

  return (
    <>
      <div className="w-full max-w-7xl mx-auto p-6 space-y-4 mt-16">
        <h1 className="text-4xl font-bold mb-10 dark:text-white">
          Media Gallery<br></br>
          <span className="text-xl font-light">
            Explore photos and videos from our events, workshops, and member
            activities
          </span>
        </h1>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-4">
            {row.map((item, i) => {
              const index = rowIndex * 4 + i;
              return (
                <motion.div
                  key={index}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{
                    flex: hovered === index ? 2 : 1,
                    height: hovered === index ? 320 : 200,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer basis-1/4"
                >
                  {/* Image */}
                  <motion.img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: hovered === index ? 1.1 : 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm opacity-80">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}


