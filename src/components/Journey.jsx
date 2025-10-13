import React from 'react';
import JourneyImage from '../assets/images/Review_Image.png'; // Update the path as per your project

const Journey = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center container mx-auto gap-10 px-6 py-16 bg-white">
      {/* Left Image */}
      <div className="relative flex-1">
        <img
          src={JourneyImage}
          alt="Two Brothers"
          className="rounded-4xl"
        />
      </div>

      {/* Right Text */}
      <div className="flex-1">
        <h2 className="text-3xl pb-5 lg:text-4xl font-extrabold text-[#14143C] mb-4">
          The SIRIK Journey: 
        </h2>
        <p className="text-[#1F1F1F] text-base md:text-lg leading-relaxed">
         SIRIK wasn’t born in a lab or a legacy kitchen.It was sparked on a mission — to take everything wrong with sodas and flip the script. Why should enjoying a fizzy drink feel like a guilty pleasure?Why should refreshing mean fake flavours, sugar crashes, and ingredients that read like a chemistry quiz? SIRIK is the new-school soda: bold in taste, clean in conscience.A drink that respects your body, fuels your gut, and still slaps like your favourite childhood cola. We dug into real roots — literally. Like Nannari, an ancient powerhouse known for its cooling, gut-loving vibe.Then we fused it with no preservatives, prebiotics, and full-bodied flavour that hits hard — without hitting back.
        </p>
      </div>
    </div>
  );
};

export default Journey;
