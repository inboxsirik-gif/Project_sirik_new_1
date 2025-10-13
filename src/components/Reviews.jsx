import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import image_data from '../assets/images/Review_Image.png';

const testimonials = [
  {
    name: "Amrita Shinde",
    role: "Banker",
    image: "https://i.pravatar.cc/150?img=47",
    message: `My gut said thank you. My tongue said hell yes!`,
  },
  {
    name: "Rahul Verma",
    role: "Fitness Coach",
    image: "https://i.pravatar.cc/150?img=12",
    message: `Drank one. Danced for three hours. Coincidence?`,
  },
  {
    name: "Vikram Desai",
    role: "Entrepreneur",
    image: "https://i.pravatar.cc/150?img=33",
    message: `This isn’t a drink. It’s a moodboard in a bottle.`,
  },
];

const Reviews = () => {
  const sliderRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slider = sliderRef.current;
      const totalWidth = slider.scrollWidth / 2; // since content is duplicated

      gsap.to(slider, {
        x: -totalWidth,
        duration: 40,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) // seamless loop
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Combine cards + duplicate for infinite loop
  const renderCards = () => (
    <>
      <div className="testimonial-card min-w-[300px] max-w-[350px] md:max-w-[450px] h-[400px] md:h-[600px] flex-shrink-0 flex flex-col rounded-3xl bg-white shadow-lg overflow-hidden">
        <img src={image_data} alt="" className="w-full h-full object-cover" />
      </div>
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="testimonial-card min-w-[300px] max-w-[350px] md:max-w-[450px] h-[400px] md:h-[600px] flex-shrink-0 flex flex-col rounded-3xl bg-white shadow-lg"
        >
          <div className="flex-1 p-6 md:p-10 text-xl md:text-4xl leading-relaxed">
            <h1 className='text-2xl pb-3 font-bold'>#HelloSirik</h1>
            <p>"{testimonial.message}"</p>
          </div>
          <div className="px-6 md:px-8 py-6 flex items-center gap-4">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
            />
            <div>
              <h1
                style={{ fontFamily: 'OntrobucjDemo, sans-serif' }}
                className="text-lg md:text-xl"
              >
                {testimonial.name}
              </h1>
              <h2
                style={{ fontFamily: 'HelveticaNowText-Medium, sans-serif' }}
                className="text-sm md:text-base opacity-70"
              >
                {testimonial.role}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="bg-[#FE5E33] w-full py-10 px-4 md:px-10 overflow-hidden">
      <div className='container py-5 pb-10 mx-auto text-white' style={{ fontFamily: 'quincycf, sans-serif' }}>
        <h1 className='text-4xl 2xl:text-5xl '>Testimonial </h1>
      </div>

      <div className="relative container mx-auto overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-6 w-max"
        >
          {renderCards()}
          {renderCards() /* Duplicate to ensure seamless looping */}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
