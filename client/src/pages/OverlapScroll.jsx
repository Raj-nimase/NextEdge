import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OverlapScroll = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const sections = sectionsRef.current;

    sections.forEach((section, index) => {
      if (index === sections.length - 1) return; // skip last one

      let next = sections[index + 1];
      let afterNext = sections[index + 2]; // for the "third" overlap

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
      });

      // Animate the next section sliding in
      tl.fromTo(
        next,
        { yPercent: 100, zIndex: 1 },
        { yPercent: 0, ease: "none" }
      );

      // If there's a third section, also nudge it during this scroll
      if (afterNext) {
        tl.fromTo(
          afterNext,
          { yPercent: 100, zIndex: 0 },
          { yPercent: 50, ease: "none" }, // halfway in, like it's already moving
          0 // start at same time
        );
      }
    });
  }, []);

  return (
    <div>
      {[1, 2, 3, 4].map((num, i) => (
        <section
          key={i}
          ref={(el) => (sectionsRef.current[i] = el)}
          className="h-screen flex items-center justify-center text-6xl font-bold"
          style={{
            background: i % 2 === 0 ? "#f2f2f2" : "#ccc",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
          }}
        >
          Page {num}
        </section>
      ))}
    </div>
  );
};

export default OverlapScroll;
