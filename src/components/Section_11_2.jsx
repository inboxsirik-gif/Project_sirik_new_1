import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useNavigate } from "react-router-dom";

import tin_1 from '/Tin_1.svg'
import tin_2 from '/Tin_2.svg' 

import leftimage from '/sirik_left.avif'
import rightimage from '/sirik_right.avif'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const lerp = (a, b, t) => a + (b - a) * t

// FloatingTin unchanged (keep your implementation)
const FloatingTin = ({ startRef, endRef, imgRef, offset = 0,isMobile }) => {
  const rafRef = useRef(null)
  const lastTopRef = useRef(null)
  const targetTopRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const stepLoop = () => {
      rafRef.current = requestAnimationFrame(() => {
        const imgEl = imgRef.current
        const startEl = startRef.current
        const endEl = endRef.current
        if (!imgEl || !startEl || !endEl) {
          rafRef.current = null
          return
        }

        const startRect = startEl.getBoundingClientRect()
        const endRect = endEl.getBoundingClientRect()

        const data = isMobile ? 2.5 : 2

        const startAnchorY = startRect.top + startRect.height / data
        const endAnchorY = endRect.top + endRect.height / 1.8 + offset

        const docScrollY = window.scrollY || window.pageYOffset
        const vpCenterDocY = docScrollY + window.innerHeight / 2
        const startDocY = docScrollY + (startRect.top + startRect.height / 2 + offset)
        const endDocY = docScrollY + (endRect.top + endRect.height / 2 + offset)
        const total = endDocY - startDocY || 1
        let progress = (vpCenterDocY - startDocY) / total
        progress = clamp(progress, 0, 1)
        const currentTargetTop = lerp(startAnchorY, endAnchorY, progress)

        targetTopRef.current = currentTargetTop

        if (lastTopRef.current == null) lastTopRef.current = currentTargetTop

        const prev = lastTopRef.current
        const smoothed = lerp(prev, currentTargetTop, 0.18)
        lastTopRef.current = smoothed

        const clamped = clamp(smoothed, Math.min(startAnchorY, endAnchorY), Math.max(startAnchorY, endAnchorY))

        const imgHalf = imgEl.offsetHeight / 2 || 0
        imgEl.style.top = `${clamped - imgHalf}px`

        const distance = Math.abs(clamped - currentTargetTop)
        const TOLERANCE_PX = 0.5
        if (distance > TOLERANCE_PX) {
          stepLoop()
        } else {
          lastTopRef.current = currentTargetTop
          imgEl.style.top = `${currentTargetTop - imgHalf}px`
          rafRef.current = null
        }
      })
    }

    const onScrollOrResize = () => {
      if (rafRef.current == null) {
        stepLoop()
      }
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)

    onScrollOrResize()

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [startRef, endRef, imgRef, offset])

  return null
}
// -------------------------------------------------------

const Section_11_2 = () => {
  const section3Ref = useRef(null)
  const section4RefA = useRef(null)
  const section4RefB = useRef(null)
  const floatingImgRef = useRef(null)

  const navigate = useNavigate();

  // Refs for the two animated heading wrappers
  const leftWrapRef = useRef(null)
  const rightWrapRef = useRef(null)

  // framer-motion controls
  const leftControls = useAnimation()
  const rightControls = useAnimation()

  // useInView from framer-motion (tune threshold)
  const leftInView = useInView(leftWrapRef, { amount: 0.4 }) // ~40% visible
  const rightInView = useInView(rightWrapRef, { amount: 0.4 })

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.floating-tin')
    els.forEach((el) => {
      const d = (Math.random() * 1.5).toFixed(2)
      if (!el.style.animationDelay) el.style.animationDelay = `${d}s`
    })
  }, [isMobile])

  // animate left when leftInView changes; reset when leaves so it can replay
  useEffect(() => {
    if (leftInView) {
      leftControls.start({ x: 0, opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } })
    } else {
      leftControls.start({ x: -100, opacity: 0, transition: { duration: 0.45 } })
    }
  }, [leftInView, leftControls])

  // animate right with a small stagger/delay
  useEffect(() => {
    if (rightInView) {
      rightControls.start({ x: 0, opacity: 1, transition: { duration: 0.9, ease: 'easeOut', delay: 0.12 } })
    } else {
      rightControls.start({ x: 100, opacity: 0, transition: { duration: 0.45 } })
    }
  }, [rightInView, rightControls])

  // playNow() — callable to force-play both (useful for anchor/hash navigation)
  const playNow = () => {
    leftControls.start({ x: 0, opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } })
    rightControls.start({ x: 0, opacity: 1, transition: { duration: 0.9, ease: 'easeOut', delay: 0.12 } })
  }

  // Listen for hashchange and initial hash — if it matches our section id, trigger playNow
  useEffect(() => {
    const id = '#section-11-2'
    const onHashChange = () => {
      if (window.location.hash === id) {
        // slight micro-delay to allow browser scroll to finish
        setTimeout(() => playNow(), 60)
      }
    }

    // on mount, if hash already points here, play
    if (typeof window !== 'undefined' && window.location.hash === id) {
      setTimeout(() => playNow(), 60)
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, []) // run once

  // --- swap floating image src based on which section is closest to viewport center ---
  useEffect(() => {
    if (!floatingImgRef.current) return

    let ticking = false
    const chooseSrc = () => {
      if (!section3Ref.current || !section4RefA.current || !section4RefB.current || !floatingImgRef.current) return

      const vpCenter = window.innerHeight / 2

      const rectA = section4RefA.current.getBoundingClientRect()
      const rectB = section4RefB.current.getBoundingClientRect()

      const centerA = rectA.top + rectA.height / 2
      const centerB = rectB.top + rectB.height / 2

      const distA = Math.abs(centerA - vpCenter)
      const distB = Math.abs(centerB - vpCenter)

      const newSrc = distA <= distB ? tin_1 : tin_2
      const imgEl = floatingImgRef.current

      const currentTag = imgEl.dataset.currentSrc || ''
      const newTag = newSrc.split('/').pop()

      if (currentTag === newTag) return

      imgEl.style.transition = 'opacity 180ms ease, filter 180ms ease'
      imgEl.style.opacity = '0'
      imgEl.style.filter = 'blur(2px)'

      setTimeout(() => {
        if (!floatingImgRef.current) return
        floatingImgRef.current.src = newSrc
        floatingImgRef.current.dataset.currentSrc = newTag
        floatingImgRef.current.offsetHeight
        floatingImgRef.current.style.opacity = '1'
        floatingImgRef.current.style.filter = 'blur(0)'
      }, 180)
    }

    const onScrollOrResize = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          chooseSrc()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    chooseSrc()

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [section3Ref, section4RefA, section4RefB])

  const [open, setOpen] = useState({ nutrition: false, ingredients: false });

  // optional: auto-measure height for smooth transitions
  const nutritionRef = useRef(null);
  const ingredientsRef = useRef(null);
  const [heights, setHeights] = useState({ nutrition: 0, ingredients: 0 });

  useEffect(() => {
    setHeights({
      nutrition: nutritionRef.current?.scrollHeight ?? 0,
      ingredients: ingredientsRef.current?.scrollHeight ?? 0,
    });
    const onResize = () =>
      setHeights({
        nutrition: nutritionRef.current?.scrollHeight ?? 0,
        ingredients: ingredientsRef.current?.scrollHeight ?? 0,
      });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggle = (key) => setOpen((s) => ({ ...s, [key]: !s[key] }));

  return (
    <>
      <style>{`
        @keyframes float-bob {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-1.2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .floating-tin {
          animation-name: float-bob;
          animation-duration: 3.8s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
        }
      `}</style>
      
       <img
          ref={floatingImgRef}
          src={tin_1}
          alt="tin"
          data-current-src={tin_1.split('/').pop()}
          style={{
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 0,
            width: isMobile ? '180px' :'260px',
            height: 'auto',
            pointerEvents: 'none',
            zIndex: 40,
            transition: 'filter 0.2s ease, opacity 0.2s ease',
            opacity: 1
          }}
        />
      
      <FloatingTin startRef={section3Ref} endRef={section4RefB} imgRef={floatingImgRef} offset={0}  isMobile={isMobile}/>

      {/* -------- Section 3 (use your provided content) -------- */}
      <div id="section-11-2" ref={section3Ref}>
        <div className='bg-[#F46C3C] md:h-[100dvh]  flex flex-col mx-auto'>
          <div className=''>
            <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='text-center text-white text-[160px] md:text-[270px]'>
              11:11
            </h1>
          </div>

          <div className='container mx-auto flex-1   px-3 flex flex-col md:flex-row'>
            {/* LEFT animated wrapper */}
            <div className='flex-1 hidden md:flex flex-col  h-full w-full gap-3' ref={leftWrapRef}>
              <motion.div
                className='flex-1 flex flex-col h-full  w-full gap-3'
                initial={{ x: -100, opacity: 0 }}
                animate={leftControls}
              >
                <h1 
                  style={{ fontFamily: 'quincycf, sans-serif' }} 
                  className='text-4xl ml-auto text-white'
                >
                  Alignment . Purpose
                </h1>
              </motion.div>
            </div>

            <div className='flex items-center justify-center w-full lg:w-auto mb-6 lg:mb-0'>
                <div className='relative flex items-center  justify-center'>
                  <div style={{ width: 220, height: 220, pointerEvents: 'none', visibility: 'hidden' }} />
                </div>
            </div>

            {/* RIGHT animated wrapper */}
            <div className='flex-1   hidden md:flex flex-col mt-auto  justify-end w-full  h-full lg:mt-0' ref={rightWrapRef}>
              <motion.div
                className='flex-1 flex flex-col mt-6 lg:mt-0'
                initial={{ x: 100, opacity: 0 }}
                animate={rightControls}
              >
                <h1 
                  style={{ fontFamily: 'quincycf, sans-serif' }} 
                  className='text-4xl w-full mt-auto  text-white'
                >
                  Energy . Belief
                </h1>
              </motion.div>
            </div>
          </div>

           <div className='flex-1 text-[#ffffff] text-lg md:pt-24 md:text-2xl flex flex-col justify-center pb-12 max-w-3xl lg:max-w-5xl mx-auto px-4'>
              <p className=''>A Symbol of Belief For the dreamers, doers, and believers — SIRIK embodies the spirit of 11:11 that rare moment when your intentions align with your destiny </p><br/>
              <p className=''>SIRIK carries that same frequency in every sip — a reminder that greatness begins the moment you choose to believe.</p>
           </div>
        </div>
      </div>

      <div ref={section4RefB} className='bg-[#FFEFEA]'>
        <div className=' h-[60dvh] lg:h-[70dvh] flex flex-col mx-auto'>
          <div className='container mx-auto flex-1 px-3 py-6 md:py-10 flex flex-row items-center'>
            
            <div className='flex-1 flex-col w-full gap-3  flex items-end justify-end h-full '>
               <img src={leftimage} alt='' className='w-full max-w-[100px] md:max-w-[250px]'/>
            </div>
            <div className='flex items-center justify-center mb-6 lg:mb-0'>
                <div className='relative flex items-center  justify-center'>
                  <div style={{ width: isMobile ?140:220, height: 220, pointerEvents: 'none', visibility: 'hidden' }} />
                </div>
            </div>
            <div className='flex-1  flex flex-col justify-end  h-full'>
                 <img src={rightimage} alt=''  className='w-full  max-w-[100px] md:max-w-[250px]'/>
            </div>
          </div>
        </div>
      </div>
    <div className="bg-[#FFEFEA] pb-5">
      <div className="flex py-5 items-center justify-center">
        <h1
          style={{ fontFamily: "OntrobucjDemo, sans-serif" }}
          className="text-[#F46C3C] text-3xl lg:text-5xl"
        >
          Not Your No 2.
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        <div className="px-3">
          <div className="border w-full max-w-5xl mx-auto p-3 rounded-2xl bg-white border-[#C0C3C5]">
            <div className="flex items-center justify-between">
              <h2
                style={{ fontFamily: "quincycf, sans-serif" }}
                className="text-xl px-5"
              >
                Nutrition Value per 250ml
              </h2>

              <button
                aria-expanded={open.nutrition}
                onClick={() => toggle("nutrition")}
                className="ml-4 inline-flex items-center justify-center hover:scale-105 cursor-pointer w-9 h-9 rounded-full border border-gray-200 text-xl select-none"
                aria-controls="nutrition-panel"
              >
                {open.nutrition ? "−" : "+"}
              </button>
            </div>

            <div
              id="nutrition-panel"
              ref={nutritionRef}
              style={{
                maxHeight: open.nutrition ? heights.nutrition : 0,
                transition: "max-height 300ms ease",
                overflow: "hidden",
              }}
              className="px-5 "
            >
              <p className="text-lg py-4 text-[#696363]">
                Total Carbohydrate - 14.5g, Dietary Fiber - 7g, Protein -
                1.25g, Added Sugar - Nil, Total Sugar - 4g, Energy (kcal) -
                82.5 kcal, Sodium - 36.75mg, Vitamin C - 182.50mg.
              </p>
            </div>
          </div>
        </div>
        <div className="px-3">
          <div className="border w-full max-w-5xl mx-auto p-3 rounded-2xl bg-white border-[#C0C3C5]">
            <div className="flex items-center justify-between">
              <h2
                style={{ fontFamily: "quincycf, sans-serif" }}
                className="text-xl px-5"
              >
                Ingredients List
              </h2>

              <button
                aria-expanded={open.ingredients}
                onClick={() => toggle("ingredients")}
                className="ml-4 inline-flex items-center hover:scale-105 cursor-pointer justify-center w-9 h-9 rounded-full border border-gray-200 text-xl select-none"
                aria-controls="ingredients-panel"
              >
                {open.ingredients ? "−" : "+"}
              </button>
            </div>

            <div
              id="ingredients-panel"
              ref={ingredientsRef}
              style={{
                maxHeight: open.ingredients ? heights.ingredients : 0,
                transition: "max-height 300ms ease",
                overflow: "hidden",
              }}
              className="px-5"
            >
              <p className="text-lg py-4 text-[#696363]">
                Total Carbohydrate - 14.5g, Dietary Fiber - 7g, Protein -
                1.25g, Added Sugar - Nil, Total Sugar - 4g, Energy (kcal) -
                82.5 kcal, Sodium - 36.75mg, Vitamin C - 182.50mg.
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-xl font-semibold mx-auto p-3 flex flex-col items-center justify-center gap-2">
           <div className='flex w-full gap-3 items-center'>
             <button className='py-3 w-full max-w-[200px] cursor-pointer hover:bg-black hover:text-white border border-[#C0C3C5] rounded-xl bg-white'>Pack of 4</button>
             <button className='py-3 w-full max-w-[200px] cursor-pointer hover:bg-black hover:text-white border border-[#C0C3C5] rounded-xl bg-white'>Pack of 6</button>
             <button className='py-3 w-full max-w-[200px] cursor-pointer hover:bg-black hover:text-white border border-[#C0C3C5] rounded-xl bg-white'>Pack of 12</button>
           </div>
           <div className='w-full py-2 '>
 <button
      className="py-4 w-full cursor-pointer rounded-lg bg-[#BAD42C] text-white hover:scale-105 transition-all duration-300 ease-in-out"
  onClick={() => {
  navigate('/shop');
  window.scrollTo(0, 0);
}}

    >
      Go to Shop
    </button>             </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default Section_11_2
