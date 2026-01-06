import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Innovation",
    desc: "Fostering innovative thinking across disciplines through collaborative projects and challenges.",
    img: "/Innovation.jpg",
  },
  {
    title: "Community",
    desc: "Building a vibrant community of diverse thinkers, creators, and problem-solvers.",
    img: "/Community.jpg",
  },
  {
    title: "Learning",
    desc: "Creating transformative learning experiences beyond traditional classroom boundaries.",
    img: "/Learning.jpg",
  },
  {
    title: "Networking",
    desc: "Connecting students with peers, faculty, and industry professionals.",
    img: "/Networking.jpg",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
    relative py-32
    bg-gradient-to-b
    from-gray-50 via-white to-gray-100
    dark:from-[#0B0B0F] dark:via-[#0F1117] dark:to-[#0B0B0F]
    text-gray-900 dark:text-gray-100
    overflow-hidden
  "
    >
      {/* Header */}
      <div className="relative max-w-6xl mx-auto px-6 mb-28">
        {/* subtle background accent */}
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* badge */}
        <span
          className="inline-block mb-6 px-4 py-1 rounded-full text-sm font-semibold tracking-wide
    bg-blue-100 text-blue-700
    dark:bg-blue-500/10 dark:text-blue-400"
        >
          About Us
        </span>

        {/* heading */}
        <h2
          className="text-5xl md:text-6xl font-bold leading-tight mb-6
    text-gray-900 dark:text-white"
        >
          Welcome to{" "}
          <span className="text-blue-600 dark:text-blue-400">
            NextEdge Society
          </span>
        </h2>

        {/* description */}
        <p
          className="text-lg md:text-xl max-w-3xl leading-relaxed
    text-gray-600 dark:text-gray-300"
        >
          We foster innovation, collaboration, and interdisciplinary learning
          through student-led clubs, events, and real-world initiatives.
        </p>
      </div>

      {/* Editorial Card Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`
              feature-card
              relative overflow-hidden rounded-[2.5rem]
              shadow-[0_30px_80px_rgba(0,0,0,0.12)]
              ${
                i % 3 === 0
                  ? "md:col-span-7 h-[520px]"
                  : "md:col-span-5 h-[420px]"
              }
            `}
          >
            {/* Image */}
            <img
              src={f.img}
              alt={f.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Content */}
            <div className="relative z-10 h-full p-10 flex flex-col justify-end text-white">
              <h3 className="text-3xl font-bold mb-3">{f.title}</h3>

              <p className="text-white/80 max-w-md mb-6">{f.desc}</p>

              <button className="flex items-center gap-2 font-semibold text-lime-300 hover:gap-3 transition-all w-fit">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
