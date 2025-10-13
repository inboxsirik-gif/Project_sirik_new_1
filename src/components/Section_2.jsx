import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const cardData = [
  { role: "Insta Girlies with IBS", message: "Sip pretty, stay bloat-free." },
  { role: "Gut-Health Geeks", message: "Probiotics over soda politics." },
  { role: "Wellness Rebels", message: "Burn rules, not your gut." },
  { role: "Post-Junk Warriors", message: "Clean up after cheat day." },
  { role: "Fizz Addicts", message: "Fizz with benefits. No regrets." },
  { role: "Clean Vibe Chasers", message: "Namaste to clean ingredients." },
  { role: "Functional Sippers", message: "Form meets function in a fizz." },
  { role: "Bubble Not Trouble", message: "Carbonated, not complicated." },
  { role: "Low-Cal Gang", message: "Less calories, more flex." },
  { role: "Zero-Guilt Drinkers", message: "Indulge without the side-eye." },
];

const Section_2 = () => {
  const sliderRef = useRef();

  const colors = ["#C6DA55", "#13006E", "#FF5E2D"]; // color palette

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slider = sliderRef.current;
      const totalWidth = slider.scrollWidth / 2;

      gsap.to(slider, {
        x: -totalWidth,
        duration: 50,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth),
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const renderCards = () => (
    <>
      {cardData.map((card, index) => (
        <div
  key={index}
  className="min-w-[250px] max-w-[300px] h-[300px] flex-shrink-0 rounded-3xl shadow-md flex flex-col justify-between p-6 text-left"
  style={{ backgroundColor: colors[index % colors.length] }}
>
  <h2
    className={`text-5xl font-semibold ${
      colors[index % colors.length] === "#C6DA55" ? "text-black" : "text-white"
    }`}
  >
    {card.role}
  </h2>
 <p
  className={`text-xl pt-3 italic ${
    colors[index % colors.length] === "#C6DA55" ? "text-black" : "text-white"
  }`}
>
  "{card.message}"
</p>

</div>

      ))}
    </>
  );

  return (
    <div className="bg-[#FDF2DD] py-10 px-4 md:px-10 overflow-hidden">
      <div className="container mx-auto mb-10">
        <h1
          className="text-4xl md:text-5xl text-[#FE5E2D] font-bold"
          style={{ fontFamily: 'quincycf, sans-serif' }}
        >
          Drink Different. <br className='hidden md:block'/> Feel Different
        </h1>
      </div>

      <div className="relative container mx-auto overflow-hidden">
        <div ref={sliderRef} className="flex gap-6 w-max">
          {renderCards()}
          {renderCards() /* duplicate for looping effect */}
        </div>
      </div>
    </div>
  );
};

export default Section_2;
