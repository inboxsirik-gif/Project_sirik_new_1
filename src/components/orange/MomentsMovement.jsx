import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import image_data from '/Review_Image.png';
import Image1 from '/Image_1.png';
import Image2 from '/Image_2.png';
import Image3 from '/Image_3.png';
import Image4 from '/Image_4.png';

const testimonials = [
  { image: Image1 },
  { image: Image2 },
  { image: Image3 },
  { image: Image4 },
];

const MomentsMovement = () => {
  const sliderRef = useRef();
  const tweenRef = useRef();
  const totalWidthRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slider = sliderRef.current;
      const totalWidth = slider.scrollWidth / 2;
      totalWidthRef.current = totalWidth;

      // Start halfway through so it loops seamlessly
      gsap.set(slider, { x: -totalWidth });

      // Infinite scroll tween
      tweenRef.current = gsap.to(slider, {
        x: 0,
        duration: 40,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleMove = (direction) => {
    const slider = sliderRef.current;
    const tween = tweenRef.current;

    if (!slider || !tween) return;

    // Pause auto-scroll
    tween.pause();

    const currentX = gsap.getProperty(slider, 'x');
    const moveDistance = 300; // pixels per click
    const totalWidth = totalWidthRef.current;

    const newX =
      direction === 'left'
        ? parseFloat(currentX) + moveDistance
        : parseFloat(currentX) - moveDistance;

    // Smooth scroll animation
    gsap.to(slider, {
      x: newX,
      duration: 0.8,
      ease: 'power2.out',
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
      onComplete: () => {
        // Resume auto-scroll after short delay
        gsap.delayedCall(1.5, () => tween.play());
      },
    });
  };

  const renderCards = () => (
    <>
      {/* Static first image */}
      <div className="testimonial-card min-w-[300px] max-w-[350px] md:max-w-[350px] h-[400px] md:h-[500px] flex-shrink-0 flex flex-col rounded-3xl bg-white shadow-lg overflow-hidden">
        <img src={image_data} alt="Main" className="w-full h-full object-cover" />
      </div>

      {/* Dynamic testimonial cards */}
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="testimonial-card min-w-[300px] max-w-[350px] md:max-w-[350px] h-[400px] md:h-[500px] flex-shrink-0 flex flex-col rounded-3xl bg-white shadow-lg overflow-hidden"
        >
          <img
            src={testimonial.image}
            alt={`testimonial-${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </>
  );

  return (
    <div className="w-full py-10 px-4 md:px-10 overflow-hidden bg-[#F46C3C]">
      <div
        className="container flex items-center py-5 pb-10 mx-auto text-[#ffffff]"
        style={{ fontFamily: 'quincycf, sans-serif' }}
      >
        <h1 className="text-4xl 2xl:text-5xl flex-1">Moments From the Movement</h1>
        <div className=" hidden md:flex gap-2">
          <img
            src="/leftarrow.svg"
            alt="left"
            className="w-12 hover:scale-105 cursor-pointer transition-transform"
            onClick={() => handleMove('left')}
          />
          <img
            src="/rightarrow.svg"
            alt="right"
            className="w-12 hover:scale-105 cursor-pointer transition-transform"
            onClick={() => handleMove('right')}
          />
        </div>
      </div>

      <div className="relative container mx-auto overflow-hidden">
        <div ref={sliderRef} className="flex gap-5 w-max">
          {renderCards()}
          {renderCards()}
        </div>
      </div>
      <div className='flex md:hidden py-5 justify-end'>
        <div className="flex md:hidden gap-2">
          <img
            src="/leftarrow.svg"
            alt="left"
            className="w-12 hover:scale-105 cursor-pointer transition-transform"
            onClick={() => handleMove('left')}
          />
          <img
            src="/rightarrow.svg"
            alt="right"
            className="w-12 hover:scale-105 cursor-pointer transition-transform"
            onClick={() => handleMove('right')}
          />
        </div>
      </div>
    </div>
  );
};

export default MomentsMovement;
