import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WavyScrollText = () => {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    const xMove = window.innerWidth < 768 ? 100 : 300;

    gsap.to(line1Ref.current, {
      x: xMove,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(line2Ref.current, {
      x: -xMove,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="md:min-h-[30vh] text-center bg-white flex flex-col justify-center py-10 px-5 overflow-hidden"
    >
      <div
        ref={line1Ref}
        className="text-[clamp(1.5rem,6vw,4rem)] font-bold mb-12 whitespace-nowrap"
      >
        WHY DID WE START ?
      </div>
      <div
        ref={line2Ref}
        className="text-[clamp(1.5rem,6vw,4rem)] font-bold whitespace-nowrap"
      >
        WHAT IS OUR STORY ?
      </div>
    </div>
  );
};

export default WavyScrollText;
