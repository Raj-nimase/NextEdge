import React, { useRef } from "react";
import { Lightbulb, Users, BookOpen, Share2 } from "lucide-react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  {
    title: "Innovation",
    description:
      "Fostering innovative thinking across disciplines through collaborative and interdisciplinary learning experiences.",
    icon: <Lightbulb className="w-8 h-8 text-white" />,
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    title: "Community",
    description:
      "Building a vibrant community of like-minded students, creators, and future leaders.",
    icon: <Users className="w-8 h-8 text-white" />,
    gradient: "from-orange-400 to-pink-500",
  },
  {
    title: "Learning",
    description:
      "Creating opportunities for learning experiences beyond traditional classroom boundaries.",
    icon: <BookOpen className="w-8 h-8 text-white" />,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Networking",
    description:
      "Connecting students with peers, faculty, and industry professionals.",
    icon: <Share2 className="w-8 h-8 text-white" />,
    gradient: "from-teal-400 to-green-500",
  },
];

const FeaturesSection = () => {
  const pageRef = useRef([]);
  const textRef = useRef();
  const parentRef = useRef();
  pageRef.current = [];

  const addToRefs = (el) => {
    if (el && !pageRef.current.includes(el)) {
      pageRef.current.push(el);
    }
  };
  useGSAP(() => {
    pageRef.current.forEach((el) => {
      gsap.from(el, {
        y: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          scroller: document.body,
          trigger: el,
          start: "top 80%",
          end: "top 30%",
          markers: true,
          scrub: 1,
        },
      });
    });

    gsap.to(textRef.current, {
      x: "-120%",
      scrollTrigger: {
        scroller: document.body,
        trigger: parentRef.current,
        markers: true,
        start: "top 0%",
        end: "top -100%",
        scrub: 2,
        pin: true,
      },
    });
  }, []);

  return (
    <>
      <div
        className="w-[100%] h-screen bg-blue-400 flex items-center justify-center overflow-x-hidden-hidden"
        ref={parentRef}
      >
        <div className=" w-full">
          <h2
            className="text-gray-900 dark:text-white text-[15vw] font-bold whitespace-nowrap transform translate-x-[50%] "
            ref={textRef}
          >
            Welcome to NextEdge Society
          </h2>
        </div>
      </div>

      <section className="min-h-screen flex flex-col justify-center bg-white dark:bg-black transition-colors duration-500 py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-full  flex flex-col items-center text-center ">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-16">
            We're a dynamic student organization fostering innovation,
            collaboration, and interdisciplinary learning through diverse
            student-led clubs and events.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center px-6 py-8 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr ${feature.gradient} mb-6 shadow-md`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
