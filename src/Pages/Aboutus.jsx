import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import AlertModal from '../components/AlertModal'
import {useState} from "react"

const Aboutus = () => {
  const [showcartalert,setcartalert] = useState(false)
  const onClose = ()=>{
    setcartalert(false)
  }
  const show = ()=>{
    setcartalert(true)
  }

    const items = [
    "Don’t settle to be a second choice , Put Yourself First . Be the No.1",
    "Don’t settle to be a second choice , Put Yourself First . Be the No.1",
    "Don’t settle to be a second choice , Put Yourself First . Be the No.1",
    "Don’t settle to be a second choice , Put Yourself First . Be the No.1",
  ];

  // build one visual line (the thing we will duplicate)
  const line = (
    <div className="inline-flex items-center whitespace-nowrap">
      {items.map((t, i) => (
        <span key={i} className="mx-8 text-4xl">
          {t}
        </span>
      ))}
    </div>
  );


  return (
    <>
     {
      showcartalert && <AlertModal onClose={onClose}/>
    }
     <div className='absolute top-0 z-50 w-full'>
        <Header show={show}/>
      </div>
      <div className=" bg-gradient-to-br pt-15 from-[#0F0F1C] to-[#1F1147]">

        <div className="mx-auto container pt-22 px-5">
         <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'quincycf, sans-serif' }}>The Sirik Journey</h1>
         <p className="text-sm md:text-xl pt-2 text-white pb-10">
            SIRIK wasn’t born in a lab or a legacy kitchen.It was sparked on a mission — to take everything wrong with sodas and flip the script. Why should enjoying a fizzy drink feel like a guilty pleasure?Why should refreshing mean fake flavours, sugar crashes, and ingredients that read like a chemistry quiz? SIRIK is the new-school soda: bold in taste, clean in conscience.A drink that respects your body, fuels your gut. We dug into real roots — literally, Like Nannari, an ancient powerhouse known for its cooling, gut-loving vibe.Then we fused it with prebiotics and full-bodied flavour that hits hard without hitting back. No compromises. No artificial BS.Just pure rebellion in a can. This isn’t just about better beverages.This is about reclaiming fizz for people who want to feel good, look good and still crack open something legendary. Welcome to SIRIK.The soda that doesn’t make you choose between vibe and value.
         </p>
        
      </div>
        
      <div className="mx-auto container pt-12 px-5">
         <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'quincycf, sans-serif' }}>Mission</h1>
         <p className="text-sm md:text-xl pt-2 text-white pb-10">
            Our mission is to give people a soda they can truly enjoy one that’s big on taste, light on guilt and actually good for their body. We’re here to make drinking soda feel right again with ingredients that respect your body, not wreck it.
         </p>
        
      </div>
      <div className="mx-auto container pt-12 px-5">
         <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'quincycf, sans-serif' }}>Founder</h1>
         <p className="text-sm md:text-xl pt-2 text-white">
            Hey! I’m Srikar YS — a former engineer, full-time flavour rebel .I didn’t grow up dreaming about beverages. I wasn’t born with a silver can in my hand. I came from chaos. I was pushed down deep into a place with no light, no clarity  just noise and questions. But what I thought was a pit…Turned out to be a forge. “A forge doesn’t save you. It remakes you.” They create weapons. Warriors. Legends. That’s where SIRIK was born. Not from a market trend or branding playbook — but from pure, unfiltered fire. This isn’t just a beverage brand. It’s proof that you can be broken, underestimated, even forgotten and still rise Sharper than ever. I didn’t come from a boardroom. I came from the FIRE.
         </p>
      </div>
       <div className="mx-auto container pt-12 px-5">
         <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'quincycf, sans-serif' }}>Mission</h1>
         <p className="text-sm md:text-xl pt-2 text-white ">
            Our mission is to give people a soda they can truly enjoy — one that’s big on taste, light on guilt, and actually good for their body. We’re here to make drinking soda feel right again, with ingredients that respect your body, not wreck it.
         </p>
      </div>

      <div className="mx-auto container pt-12 px-5">
         <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'quincycf, sans-serif' }}>Purpose Beyond Profit</h1>
         <p className="text-sm md:text-xl pt-2 text-white ">
            At SIRIK, we don’t just make beverages—we make a difference. Inspired by the vision of our founder, a portion of every sip goes toward causes that matter: empowering children through education, funding life-saving operations, protecting our seashores and preserving our forests. We believe that a great brand should refresh not just the people who drink it, but the communities and planet around it. Every can of SIRIK carries this ripple of positive change—because true success is measured by the impact we leave behind. And that’s exactly why we are not your No. 2… and we never will be.
         </p>
      </div>
   
      <div className="w-full pt-22 overflow-hidden">
        {/* <img src={Contact_image} alt="" className="w-full"/> */}
      </div>
      </div>

            {/* Moving line */}
      <div className="bg-white py-8 overflow-hidden">
          <div className="w-full flex justify-center">
            <motion.div
              className="flex"                   // ensure no inline whitespace behavior
              style={{ willChange: "transform" }}
              // Move exactly one copy width to the left (0 -> -50%) so the second copy replaces the first
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
            >
              {/* render copies directly with NO whitespace between them */}
              {line}{line}
            </motion.div>
          </div>
        </div>

      <div className='w-full bg-gradient-to-br from-[#0F0F1C] to-[#1F1147]'>
        <Footer/>
      </div>
    </>
  );
};

export default Aboutus;
