import React, { useEffect, useRef, useState } from 'react'
import tin_1 from '/Tin_1.svg'
import tin_2 from '/Tin_2.svg'
import { useNavigate } from 'react-router-dom'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const lerp = (a, b, t) => a + (b - a) * t

const FloatingTin = ({ startRef, endRef, imgRef, offset = 0 }) => {
  const rafRef = useRef(null)
  const lastTopRef = useRef(null)

  useEffect(() => {
    const onScrollOrResize = () => {
      if (!startRef.current || !endRef.current || !imgRef.current) return

      const startRect = startRef.current.getBoundingClientRect()
      const endRect = endRef.current.getBoundingClientRect()

      const startAnchorY = startRect.top + startRect.height / 2 + offset
      const endAnchorY = endRect.top + endRect.height / 2 + offset
      const docScrollY = window.scrollY || window.pageYOffset
      const startDocY = docScrollY + startAnchorY
      const endDocY = docScrollY + endAnchorY
      const viewportCenterDocY = docScrollY + window.innerHeight / 2
      const total = endDocY - startDocY || 1
      let progress = (viewportCenterDocY - startDocY) / total
      progress = clamp(progress, 0, 1)
      const targetTop = lerp(startAnchorY, endAnchorY, progress)

      const step = () => {
        const prev = lastTopRef.current ?? targetTop
        const smoothed = lerp(prev, targetTop, 0.18)
        lastTopRef.current = smoothed
        const imgEl = imgRef.current
        const imgHalf = imgEl.offsetHeight / 2 || 0
        imgEl.style.top = `${smoothed - imgHalf}px`
      }

      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(function tick() {
          step()
          rafRef.current = null
        })
      } else {
        step()
      }
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    onScrollOrResize()

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [startRef, endRef, imgRef, offset])

  return null
}

const Section_3 = () => {
  const section3Ref = useRef(null)
  const section4RefB = useRef(null) // Gutzy Nannari X Lemon (now first)
  const section4RefA = useRef(null) // Gutzy Nannari (now second)
  const floatingImgRef = useRef(null)

  const navigate = useNavigate()

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
      el.style.animationDelay = `${d}s`
    })
  }, [isMobile])

  // --- UPDATED: first tin_2, then tin_1 ---
  useEffect(() => {
    if (!floatingImgRef.current) return

    let ticking = false
    const chooseSrc = () => {
      if (!section3Ref.current || !section4RefA.current || !section4RefB.current || !floatingImgRef.current) return

      const vpCenter = window.innerHeight / 2
      const rectB = section4RefB.current.getBoundingClientRect()
      const rectA = section4RefA.current.getBoundingClientRect()

      const centerB = rectB.top + rectB.height / 2
      const centerA = rectA.top + rectA.height / 2

      const distB = Math.abs(centerB - vpCenter)
      const distA = Math.abs(centerA - vpCenter)

      const newSrc = distB <= distA ? tin_2 : tin_1
      const imgEl = floatingImgRef.current

      if (imgEl.src && imgEl.src.endsWith(newSrc.split('/').pop())) return

      imgEl.style.transition = 'opacity 180ms ease, filter 180ms ease'
      imgEl.style.opacity = '0.0'
      imgEl.style.filter = 'blur(2px)'
      setTimeout(() => {
        if (!floatingImgRef.current) return
        floatingImgRef.current.src = newSrc
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

      {!isMobile && (
        <img
          ref={floatingImgRef}
          src={tin_1}
          alt="tin"
          style={{
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 0,
            width: '260px',
            height: 'auto',
            pointerEvents: 'none',
            zIndex: 40,
            transition: 'filter 0.2s ease, opacity 0.2s ease',
            opacity: 1,
          }}
        />
      )}
      
      <FloatingTin startRef={section3Ref} endRef={section4RefA} imgRef={floatingImgRef} offset={0} />


      {/* -------- Section 3 (use your provided content) -------- */}
      <div ref={section3Ref}>
        {/* ... your existing Section 3 markup unchanged ... */}
        <div className='bg-[#BAD42C] lg:h-[100dvh] flex flex-col mx-auto'>
          <div className=' pt-10 md:pt-24'>
            <h1 style={{ fontFamily: 'OntrobucjDemo, sans-serif' }} className='text-center text-3xl md:text-4xl text-white lg:text-6xl'>
              GREAT INSIDE = GREAT OUTSIDE
            </h1>
          </div>

          <div className='container mx-auto flex-1 px-3 flex flex-col lg:flex-row items-center'>
            <div className='flex items-center justify-center order-1 lg:order-2 w-full lg:w-auto mb-6 lg:mb-0'>
              {isMobile ? (
                <img src={tin_1} alt='' className='w-[200px] md:w-[270px] mt-5 floating-tin' />
              ) : (
                <div className='relative flex items-center  justify-center'>
                  <div style={{ width: 220, height: 220, pointerEvents: 'none', visibility: 'hidden' }} />
                </div>
              )}
            </div>

            <div className='flex-1 flex flex-col w-full gap-3 order-2 lg:order-1'>
              {[
             { text: 'No Sucralose and Aspartame', color: '#B5CE30' }, // lightest
{ text: 'No Artificial Chemicals', color: '#96AD19' },
{ text: 'No Preservatives', color: '#7E9408' }, // base color
{ text: 'No Added Sugar', color: '#596A00' },
{ text: '100 Plant Based', color: '#374100' }, // darkest


              ].map((item, index) => (
                <h3
                  key={index}
                  style={{ fontFamily: 'quincycf, sans-serif', backgroundColor: item.color }}
                  className='text-white px-5 text-2xl py-6 rounded-2xl'
                >
                  {item.text}
                </h3>
              ))}
            </div>

            <div className='flex-1 flex flex-col order-3 lg:order-3 mt-6 lg:mt-0'>
              <div className='pt-5'>
                <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='text-2xl text-white'>
                  Why It Hits Different
                </h1>
                <hr className='my-4 border-white' />
              </div>
              <div className='flex-1'>
                <ul className='text-[#ffffff] lg:text-[18px] mb-10 list-disc pl-6 space-y-3'>
                  <li>SIRIK gives you that refined fizz never heavy, never artificial  just pure conscious refreshment. What we consume reflects in who we are. SIRIK is built on the belief that nourishing your inside is the first step to radiating confidence and vitality outside. Every sip of SIRIK’s “GUTZY Nannari” is crafted to fuel your gut, your glow and your energy without any of the fake stuff.</li>
                  <li>Its Light. Refreshing. Elevated. SIRIK gives you that refined fizz never heavy, never artificial  just pure conscious refreshment It’s the kind of drink that belongs everywhere — your desk, your gym bag, your Saturday night table    </li>
                  <li>SIRIK makes feeling good look effortless — from the inside out</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    

      {/* -------- Section 4B (the second flavor) -------- */}
      <div ref={section4RefB}>
        <div className='bg-[#F9FFD7] lg:h-[100dvh] flex flex-col mx-auto'>
          {/* ... second flavor content (Gutzy Nannari X Lemon) ... */}
          <div className='container mx-auto flex-1 px-3 py-6 md:py-10 flex flex-col lg:flex-row items-center'>
            {/* left content */}
            <div className='flex-1 flex flex-col w-full gap-3 order-2 lg:order-1'>
              <h1 className='text-[40px] lg:text-[50px] lg:text-5xl text-[#C6DB55] text-left-entry' style={{ fontFamily: 'OntrobucjDemo, sans-serif' }}>Gutzy Nannari X Lemon </h1>
              <p className='text-[#6E6C6C] md:text-lg mb-5'>
                Ancient root(Nannari) just met its citrus match. Nannari soothes and detoxes from within, while lemon energizes with a bright, zesty twist. It’s your gut’s favorite soda — refreshing, functional, and zero guilt
              </p>
              <div  onClick={()=>{navigate('/shop');window.scrollTo(0,0)}} className='bg-black  cursor-pointer text-white flex items-center w-fit text-lg rounded-full p-2'>
                <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='px-4'>Shop</h1>
                <img src='/arrow.svg' className='w-12 h-12' />
              </div>
            </div>

            <div className='flex items-center justify-center order-1 lg:order-2 w-full lg:w-auto mb-6 lg:mb-0'>
              {isMobile ? (
                <img src={tin_2} alt='' className='w-[200px] md:w-[270px] mt-5 floating-tin' />
              ) : (
                <div className='relative flex items-center  justify-center'>
                  <div style={{ width: 220, height: 220, pointerEvents: 'none', visibility: 'hidden' }} />
                </div>
              )}
            </div>

            <div className='flex-1 mt-7 lg:mt-0 flex flex-col w-full border gap-3 order-2 lg:order-2'>
              <div className='py-5 px-5 flex flex-col gap-5'>
                <div>
                    <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='text-xl text-black'>
                      Prebiotic Fibre
                    </h1>
                    <hr className='my-1 border-black' />

                    <div className='flex items-center gap-4'>
                         <h1 className='text-5xl font-semibold w-full max-w-[90px]'>8g</h1>
                        <p className='text-sm text-[#4A4A4A] pt-4'>Formulated with prebiotic fibre known for supporting gut balance and everyday well-being — a refreshing choice for a lighter you</p>
                    </div>
                </div>
                <div>
                    <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='text-xl text-black'>
                      Less Calories
                    </h1>
                    <hr className='my-1 border-black' />

                    <div className='flex items-center gap-4'>
                       <h1 className='text-5xl font-semibold w-full max-w-[90px]'>{'<40'}</h1>
                        <p className='text-sm text-[#4A4A4A] pt-4'>Every sip gives you full flavour without the calorie guilt. Designed for mindful drinkers who want taste, not sugar spikes. Perfect for any time of day — from post-meal chill to mid-workday refresh.</p>
                    </div>
                </div>
                <div>
                    <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='text-xl text-black'>
                      Zero Added Sugar
                    </h1>
                    <hr className='my-1 border-black' />

                    <div className='flex items-center gap-4'>
                       <h1 className='text-5xl font-semibold w-full max-w-[90px]'>0g</h1>
                        <p className='text-sm text-[#4A4A4A] pt-4'>Sweetness that’s smart. We use natural plant-based sweeteners and fruit extracts that deliver a smooth taste curve without the crash, jitters, or artificial aftertaste.</p>
                    </div>
                </div>
                <div>
                    <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='text-xl text-black'>
                      Zero Preservatives
                    </h1>
                    <hr className='my-1 border-black' />

                    <div className='flex items-center gap-4'>
                        <h1 className='text-5xl font-semibold w-full max-w-[90px]'>0</h1>
                        <p className='text-sm text-[#4A4A4A] pt-4'>Nothing fake. No chemicals hiding behind fancy labels. Just clean, fresh ingredients bottled under strict quality control — made to feel as real as it tastes.</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


        {/* -------- Section 4A (the first flavor) -------- */}
      <div ref={section4RefA}>
        <div className='bg-[#ffffff] lg:h-[100dvh] flex flex-col mx-auto'>
          {/* ... first flavor content (Gutzy Nannari) ... */}
          <div className='container mx-auto flex-1 px-3 py-6 md:py-10 flex flex-col lg:flex-row items-center'>
            {/* left content */}
            <div className='flex-1 flex flex-col w-full gap-3 order-2 lg:order-1'>
              <h1 className='text-[40px] lg:text-[50px] lg:text-5xl text-[#F46C3C] text-left-entry' style={{ fontFamily: 'OntrobucjDemo, sans-serif' }}>Gutzy Nannari</h1>
              <p className='text-[#6E6C6C] md:text-lg mb-5'>
                Nannari, or Indian Sarsaparilla, is an ancient root known for its cooling and digestive powers. It helps detox, soothes acidity, and keeps your system balanced. With SIRIK, we’ve turned this timeless remedy into a crisp, fizzy drink that’s gut-friendly, refreshing and built for today’s lifestyle.
              </p>
              <div  onClick={()=>{navigate('/shop');window.scrollTo(0,0)}} className='bg-black cursor-pointer text-white flex items-center w-fit text-lg rounded-full p-2'>
                <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='px-4'>Shop</h1>
                <img src='/arrow.svg' className='w-12 h-12' />
              </div>
            </div>

            <div className='flex items-center justify-center order-1 lg:order-2 w-full lg:w-auto mb-6 lg:mb-0'>
              {isMobile ? (
                <img src={tin_1} alt='' className='w-[200px] md:w-[270px] mt-5 floating-tin' />
              ) : (
                <div className='relative flex items-center  justify-center'>
                  <div style={{ width: 220, height: 220, pointerEvents: 'none', visibility: 'hidden' }} />
                </div>
              )}
            </div>

            <div className='flex-1 mt-7 lg:mt-0 flex flex-col w-full border gap-3 order-2 lg:order-2'>
             <div className='py-5 px-5 flex flex-col gap-5'>
                <div>
                    <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='text-xl text-black'>
                      Prebiotic Fibre
                    </h1>
                    <hr className='my-1 border-black' />

                    <div className='flex items-center gap-4'>
                         <h1 className='text-5xl font-semibold w-full max-w-[90px]'>8g</h1>
                        <p className='text-sm text-[#4A4A4A] pt-4'>Formulated with prebiotic fibre known for supporting gut balance and everyday well-being — a refreshing choice for a lighter you</p>
                    </div>
                </div>
                <div>
                    <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='text-xl text-black'>
                      Less Calories
                    </h1>
                    <hr className='my-1 border-black' />

                    <div className='flex items-center gap-4'>
                       <h1 className='text-5xl font-semibold w-full max-w-[90px]'>{'<40'}</h1>
                        <p className='text-sm text-[#4A4A4A] pt-4'>Every sip gives you full flavour without the calorie guilt. Designed for mindful drinkers who want taste, not sugar spikes. Perfect for any time of day — from post-meal chill to mid-workday refresh.</p>
                    </div>
                </div>
                <div>
                    <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='text-xl text-black'>
                      Zero Added Sugar
                    </h1>
                    <hr className='my-1 border-black' />

                    <div className='flex items-center gap-4'>
                       <h1 className='text-5xl font-semibold w-full max-w-[90px]'>0g</h1>
                        <p className='text-sm text-[#4A4A4A] pt-4'>Sweetness that’s smart. We use natural plant-based sweeteners and fruit extracts that deliver a smooth taste curve without the crash, jitters, or artificial aftertaste.</p>
                    </div>
                </div>
                <div>
                    <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='text-xl text-black'>
                      Zero Preservatives
                    </h1>
                    <hr className='my-1 border-black' />

                    <div className='flex items-center gap-4'>
                        <h1 className='text-5xl font-semibold w-full max-w-[90px]'>0</h1>
                        <p className='text-sm text-[#4A4A4A] pt-4'>Nothing fake. No chemicals hiding behind fancy labels. Just clean, fresh ingredients bottled under strict quality control — made to feel as real as it tastes.</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Section_3
