import React, { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import Section_11_2 from './Section_11_2'




const Section_11_11 = () => {
  const ref = useRef(null)
  const nextSectionRef = useRef(null)
  const controls = useAnimation()
  const isInView = useInView(ref, { margin: '-20% 0px' })

  useEffect(() => {
    let timeoutId

    if (isInView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 80,
          damping: 12,
          duration: 1.2,
        },
      })
      timeoutId = setTimeout(() => {
        nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 2000)
    } else {
      controls.start({ y: 200, opacity: 0 })
    }
    return () => clearTimeout(timeoutId)
  }, [isInView, controls])

  return (
    <div>
      <div ref={ref} className='bg-[#FFEFEA] h-[100dvh] w-full flex items-center justify-center'>
        <motion.h1
          style={{ fontFamily: 'quincycf, sans-serif' }}
          className='text-4xl mb-3 text-[#F46C3C] text-[140px] md:text-[350px]'
          initial={{ y: 400, opacity: 0 }}
          animate={controls}
        >
          11:10
        </motion.h1>
      </div>
      <div ref={nextSectionRef}>
        <Section_11_2 />
      </div>
    </div>
  )
}

export default Section_11_11
