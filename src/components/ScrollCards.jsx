import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { text: "Low Sugar", bg: "#C6DA55", color: "#111" },
  { text: "8G Prebiotic Fibers", bg: "#C6DA55", color: "#111" },
  { text: "Low Calories", bg: "#C6DA55", color: "#111" },
  { text: "Zero Preservatives", bg: "#C6DA55", color: "#111" },
  { text: "100% Plant Based", bg: "#C6DA55", color: "#111" },
];

export default function ScrollCards() {
  const containerRef = useRef([]);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.core.globals("ScrollTrigger", ScrollTrigger);
    const mm = ScrollTrigger.matchMedia({
      "(max-width: 640px)": function () {
        containerRef.current.forEach((el, i) => {
          gsap.fromTo(
            el,
            {
              x: i % 2 === 0 ? -200 : 200,
              rotation: i % 2 === 0 ? -6 : 6,
              opacity: 0,
            },
            {
              x: 0,
              rotation: 0,
              opacity: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "bottom 30%+=200",
                scrub: 0.6,
              },
            }
          );
        });
      },

      "(min-width: 641px)": function () {
        containerRef.current.forEach((el, i) => {
          gsap.fromTo(
            el,
            {
              x: i % 2 === 0 ? -300 : 300,
              rotation: i % 2 === 0 ? -8 : 8,
              opacity: 0,
            },
            {
              x: 0,
              rotation: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse"
              },
            }
          );
        });
      },
    });

    // Cleanup on unmount
    return () => {
      mm.revert(); // remove matchMedia listeners and triggers
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      {features.map((item, index) => (
        <div
          key={index}
          ref={(el) => (containerRef.current[index] = el)}
          style={{
            backgroundColor: item.bg,
            color: item.bg === "#13006E" ? "#fff" : item.color,
          }}
          className="text-3xl md:text-5xl lg:text-7xl 2xl:text-8xl font-extrabold px-8 py-6 w-fit transform origin-left"
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}
