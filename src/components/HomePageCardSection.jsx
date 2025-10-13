import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import sugarcube from '../assets/images/Icons/sugar-cube.png'
import Icon_1 from '../assets/images/Icons/Icon_1.svg'
import Icon_2 from '../assets/images/Icons/Icon_2.svg'
import Icon_3 from '../assets/images/Icons/Low.png'
import Icon_4 from '../assets/images/Icons/Planed.png'
import Icon_5 from '../assets/images/Icons/natural.png'
gsap.registerPlugin(ScrollTrigger)

const cardData = [
  {
    title: 'Low Sugar- 4G',
    description: 'While most sodas overload you with 25–30g of sugar, SIRIK keeps it clean with just 4g—just enough to satisfy your sweet tooth without the crash. Refreshing energy, zero guilt.',
    image: sugarcube,
  },
  {
    title: '8G Prebiotic Fibers',
    description: 'Your gut does more than just digest food—it’s your second brain. With 7g of prebiotic fibers, Misfits nourishes your gut bacteria, supporting digestion, immunity, and overall well-being. Health has never tasted this good!',
    image: Icon_2,
  },
  {
    title: 'Low Calories- 83Kcal',
    description: 'Craving a soda but watching your calories? Misfits delivers a bold, refreshing taste at just 50 kcal per can—so you can sip freely, stay light, and feel great.',
    image: Icon_3,
  },
  {
    title: '100% Plant based',
    description: 'Everything in Misfits comes straight from plants—no animal products, no synthetic additives, just pure plant-powered ingredients. From prebiotic fibers to fruit extracts, every sip is designed to fuel your body the way nature intended. Clean, green, and packed with goodness!',
    image: Icon_4,
  },
  {
    title: '100% Natural',
    description: 'No hidden chemicals, no synthetic junk—just real, natural ingredients you can trust. Misfits is crafted with plant-based fibers, fruit extracts, and clean-label ingredients, ensuring every sip is as pure as it is delicious. Because the best flavors come straight from nature!',
    image: Icon_5,
  },
]

const HomePageCardSection = () => {
  const cardRefs = useRef([])

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className='md:px-8 flex flex-col gap-10'>
      {cardData.map((card, index) => (
        <div
          key={index}
          ref={(el) => (cardRefs.current[index] = el)}
          className='bg-gradient-to-br from-[#7E27FF] to-[#C8A4FE] rounded-3xl h-auto md:h-[350px] p-6 lg:p-10 flex flex-col gap-6 md:gap-0'
        >
          <div className='w-full flex-1'>
            <h1
              className='text-3xl md:text-4xl lg:text-5xl font-semibold text-white'
              style={{ fontFamily: 'OntrobucjDemo, sans-serif' }}
            >
              {card.title}
            </h1>
          </div>
          <div className='flex flex-col md:flex-row pt-5 items-center md:items-start w-full'>
            <div className='flex-1 mb-6 md:mb-0'>
              <p className='text-lg 2xl:text-2xl w-full lg:w-[75%] font-semibold text-white text-left'>
                {card.description}
              </p>
            </div>
            <div className=' flex h-full items-end w-full md:w-auto justify-end'>
              <img src={card.image} alt='card-img' className='w-[100px] md:w-[130px]' />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HomePageCardSection
