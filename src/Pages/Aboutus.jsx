import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact_image from '../assets/images/Aboutus.png'
import aboutus_main from '../assets/images/aboutus_main.png'

const Aboutus = () => {

  return (
    <>
     <div className='absolute top-0 z-50 w-full'>
        <Header />
      </div>
      <div className=" bg-gradient-to-br pt-15 from-[#0F0F1C] to-[#1F1147]">
        
      <div className="mx-auto container pt-22 px-5">
         <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'quincycf, sans-serif' }}>Meet the Mind <br/> Behind the Madness</h1>
         <p className="text-sm md:text-xl pt-2 text-white pb-10">
            Hey! I’m Srikar YS — a former engineer, full-time flavour rebel, and unapologetic fizz lover.I didn’t grow up dreaming about beverages. I wasn’t born with a silver can in my hand.
I came from chaos.From being let down by others and by the version of myself that forgot my own worth.There were moments I felt like I wasn’t even worth holding on to — easy to leave behind, easy to ignore.
I was pushed down, deep into a place with no light, no clarity — just noise and questions.But what I thought was a pit…Turned out to be a forge.
“A forge doesn’t save you. It remakes you.”.They create weapons. Warriors. Legends.
That’s where SIRIK was born.Not from a market trend or branding playbook — but from pure, unfiltered fire. This isn’t just a beverage brand.It’s proof that you can be broken, underestimated, even forgotten —And still rise. Sharper than ever.
I didn’t come from a boardroom.I came from the fire.
         </p>
        
      </div>
      <div className="mx-auto container pt-12 px-5">
         <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'quincycf, sans-serif' }}>The SIRIK Journey:</h1>
         <p className="text-sm md:text-xl pt-2 text-white">
            SIRIK wasn’t born in a lab or a legacy kitchen.It was sparked on a mission — to take everything wrong with sodas and flip the script.
Why should enjoying a fizzy drink feel like a guilty pleasure?Why should refreshing mean fake flavours, sugar crashes, and ingredients that read like a chemistry quiz?
SIRIK is the new-school soda: bold in taste, clean in conscience.A drink that respects your body, fuels your gut, and still slaps like your favourite childhood cola.
We dug into real roots — literally. Like Nannari, an ancient powerhouse known for its cooling, gut-loving vibe.Then we fused it with no preservatives, prebiotics, and full-bodied flavour that hits hard — without hitting back.
No compromises. No artificial BS.Just pure rebellion in a can.
This isn’t just about better beverages.This is about reclaiming fizz — for people who want to feel good, look good, and still crack open something legendary.
Welcome to SIRIK.The soda that doesn’t make you choose between vibe and value.
         </p>
      </div>
       <div className="mx-auto container pt-12 px-5">
         <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'quincycf, sans-serif' }}>Mission</h1>
         <p className="text-sm md:text-xl pt-2 text-white ">
            Our mission is to give people a soda they can truly enjoy — one that’s big on taste, light on guilt, and actually good for their body. We’re here to make drinking soda feel right again, with ingredients that respect your body, not wreck it.
         </p>
      </div>
      
      <div className="w-full pt-22 overflow-hidden">
        {/* <img src={Contact_image} alt="" className="w-full"/> */}
      </div>
      </div>
      <div className='w-full bg-gradient-to-br from-[#0F0F1C] to-[#1F1147]'>
        <Footer/>
      </div>
    </>
  );
};

export default Aboutus;
