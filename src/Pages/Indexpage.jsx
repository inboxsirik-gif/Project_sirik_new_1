import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'

import tin_1 from '/Tin_1.svg'
import Section_3 from '../components/Section_3'

import MomentsMovement from '../components/MomentsMovement'
import Section_11_11 from '../components/Section_11_11'

import Footer from '../components/Footer'

const Indexpage = () => {
  const containerRef = useRef(null)
  const imageRef = useRef(null)            
  const stripRef = useRef(null)
  const iconsRef = useRef(null)
  const aboutTinTargetRef = useRef(null)  

  const cloneRef = useRef(null)
  const moveTweenRef = useRef(null)
  const scrollTriggerRef = useRef(null)

  const [selectedItem, setSelectedItem] = useState(0)
  const [tinLanded, setTinLanded] = useState(false) 

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // guard for client side
    const isClient = typeof window !== 'undefined'
    const isMobile = isClient ? window.matchMedia('(max-width: 767.98px)').matches : false

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.from('.text-left-entry', {
        x: '-100vw',
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2
      })
      tl.from('.text-right-entry', {
        x: '100vw',
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      })

      if (stripRef.current) {
        gsap.fromTo(
          stripRef.current,
          { x: 0 },
          {
            x: () => `-${stripRef.current.scrollWidth / 2}px`,
            duration: 120,
            ease: 'linear',
            repeat: -1
          }
        )
      }

      if (imageRef.current) {
        gsap.set(imageRef.current, { opacity: 0 })
        tl.add(() => {
          gsap.fromTo(
            imageRef.current,
            {
              xPercent: -50,
              yPercent: -50,
              x: '-60vw',
              y: '-60vh',
              opacity: 0,
              rotate: -12
            },
            {
              xPercent: -50,
              yPercent: -50,
              x: 0,
              y: 0,
              opacity: 1,
              rotate: 0,
              duration: 1.5,
              ease: 'power3.out',
              onComplete: () => {
                gsap.to(imageRef.current, {
                  y: '+=18',
                  rotation: '+=2',
                  duration: 2.4,
                  ease: 'sine.inOut',
                  repeat: -1,
                  yoyo: true,
                  overwrite: false,
                })
              }
            }
          )
        }, "+=0.2")
      }

      if (iconsRef.current) {
        const icons = iconsRef.current.querySelectorAll('.feature-icon')
        const iconsTween = gsap.fromTo(
          icons,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.2,
            paused: true,
            immediateRender: false
          }
        )

        ScrollTrigger.create({
          trigger: iconsRef.current,
          start: 'top 80%',
          onEnter: () => iconsTween.play()
        })

        const rect = iconsRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          iconsTween.play()
        }
      }

      // ---------- CORE: create/destroy clone tween only on non-mobile ----------
      function cleanupMove() {
        try {
          if (moveTweenRef.current) {
            moveTweenRef.current.scrollTrigger && moveTweenRef.current.scrollTrigger.kill()
            moveTweenRef.current.kill()
          }
        } catch (e) {}
        moveTweenRef.current = null

        try {
          if (cloneRef.current && cloneRef.current.parentNode) {
            cloneRef.current.parentNode.removeChild(cloneRef.current)
          }
        } catch (e) {}
        cloneRef.current = null

        try {
          if (imageRef.current) imageRef.current.style.visibility = ''
        } catch (e) {}
      }

      function createCloneAndTween() {
        // do nothing on mobile — keep original tin floating in place
        if (isMobile) return

        // if already landed, don't recreate
        if (tinLanded) return

        cleanupMove()

        if (!imageRef.current || !aboutTinTargetRef.current) return

        const imgEl = imageRef.current
        const imgRect = imgEl.getBoundingClientRect()
        const targetRect = aboutTinTargetRef.current.getBoundingClientRect()

        const imgCenterX = imgRect.left + imgRect.width / 2 + window.scrollX
        const imgCenterY = imgRect.top + imgRect.height / 2 + window.scrollY
        const targetCenterX = targetRect.left + targetRect.width / 2 + window.scrollX
        const targetCenterY = targetRect.top + targetRect.height / 2 + window.scrollY

        // clone appended to body so positioning is straightforward
        const clone = imgEl.cloneNode(true)
        cloneRef.current = clone
        clone.style.position = 'absolute'
        clone.style.left = `${imgCenterX - imgRect.width / 2}px`
        clone.style.top = `${imgCenterY - imgRect.height / 2}px`
        clone.style.width = `${imgRect.width}px`
        clone.style.height = `${imgRect.height}px`
        clone.style.transform = 'none'
        clone.style.zIndex = '9999'
        clone.style.pointerEvents = 'none'
        clone.style.opacity = getComputedStyle(imgEl).opacity || '1'
        document.body.appendChild(clone)

        // hide original while clone animates so it looks like it's moving
        imgEl.style.visibility = 'hidden'

        const deltaX = targetCenterX - imgCenterX
        const deltaY = targetCenterY - imgCenterY

        // create tween scrubbed by scrolling
        moveTweenRef.current = gsap.to(clone, {
          x: deltaX,
          y: deltaY,
          scale: 0.92,
          rotation: 6,
          ease: 'none',
          overwrite: true,
          scrollTrigger: {
            trigger: aboutTinTargetRef.current,
            start: () => `top ${Math.round(window.innerHeight * 0.78)}`,
            end: () => `top ${Math.round(window.innerHeight * 0.38)}`,
            scrub: 0.6,
            onLeaveBack: () => {
              cleanupMove()
              setTinLanded(false)
            },
            onEnter: () => {
              setTinLanded(false)
            },
            onComplete: () => {
              cleanupMove()
              setTinLanded(true)
            }
          }
        })
      }

      // Desktop-only: Build a top-level ScrollTrigger that listens for enter/leave to re-create tween each time
      if (!isMobile && aboutTinTargetRef.current) {
        if (scrollTriggerRef.current) {
          try { scrollTriggerRef.current.kill() } catch (e) {}
          scrollTriggerRef.current = null
        }

        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: aboutTinTargetRef.current,
          start: () => `top ${Math.round(window.innerHeight * 0.9)}`,
          end: () => `top ${Math.round(window.innerHeight * 0.3)}`,
          onEnter: () => {
            createCloneAndTween()
          },
          onEnterBack: () => {
            cleanupMove()
            setTinLanded(false)
            createCloneAndTween()
          },
          onLeaveBack: () => {
            cleanupMove()
            setTinLanded(false)
          }
        })
      } else {
        // If mobile, ensure original image is visible and no scroll triggers interact with it
        try {
          if (imageRef.current) {
            imageRef.current.style.visibility = ''
          }
        } catch (e) {}
      }

      // ensure it creates at load (first time)
      setTimeout(() => {
        const rect = aboutTinTargetRef.current?.getBoundingClientRect()
        if (rect && !isMobile) {
          const startPx = Math.round(window.innerHeight * 0.9)
          const top = rect.top
          if (top <= startPx) {
            createCloneAndTween()
          }
        }
        ScrollTrigger.refresh()
      }, 80)

      // respond to layout changes
      const onResize = () => {
        // recalc isMobile on resize (user may rotate / change width)
        const newIsMobile = typeof window !== 'undefined' ? window.matchMedia('(max-width: 767.98px)').matches : false

        // if mobile state changed from desktop -> mobile: clean up any clone/tween
        if (newIsMobile) {
          cleanupMove()
          try { scrollTriggerRef.current && scrollTriggerRef.current.kill() } catch (e) {}
          scrollTriggerRef.current = null
          setTinLanded(false)
          // ensure original visible
          if (imageRef.current) imageRef.current.style.visibility = ''
        } else {
          // if changed from mobile -> desktop, allow triggers to be created again on next scroll
          ScrollTrigger.refresh()
        }
      }
      window.addEventListener('resize', onResize)
      window.addEventListener('load', onResize)

      // cleanup function when context reverts
      return () => {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('load', onResize)
        cleanupMove()
        try { scrollTriggerRef.current && scrollTriggerRef.current.kill() } catch (e) {}
        scrollTriggerRef.current = null
      }
    }, containerRef)

    // revert context on unmount
    return () => ctx.revert()
  }, [tinLanded])

  return (
    <div className='relative overflow-hidden cursor-default'>
      <div className='absolute top-0 z-50 w-full'>
        <Header />
      </div>

      {/* Section 1 */}
      <div ref={containerRef}>
        <div className='bg-[#FE5E33] h-[100dvh] md:h-[95dvh] relative'>
          {/* Mobile Heading */}
          <div className='absolute md:hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[75px] leading-[1.1] text-center z-30'>
            <h1 className='text-white text-left-entry' style={{ fontFamily: 'OntrobucjDemo, sans-serif' }}>Not</h1>
            <h1 className='text-[125px] text-white text-right-entry' style={{ fontFamily: 'OntrobucjDemo, sans-serif' }}>Your</h1>
            <h1 className='text-white text-left-entry' style={{ fontFamily: 'OntrobucjDemo, sans-serif' }}>No.2</h1>
          </div>

          {/* Color Buttons */}
          <div className="flex absolute bottom-5 left-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden gap-3">
            <button onClick={() => setSelectedItem(0)} className={`w-12 h-12 bg-[#FF4C0D] hover:scale-105 cursor-pointer border-2 rounded-full ${selectedItem === 0 ? "border-white" : "border-[#ffb69b]"}`}></button>
            <button onClick={() => setSelectedItem(1)} className={`w-12 h-12 bg-[#BAD42C] hover:scale-105 cursor-pointer border-2 rounded-full ${selectedItem === 1 ? "border-white" : "border-[#97ad18]"}`}></button>
          </div>

          {/* Desktop Heading */}
          <div className='absolute hidden md:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center'>
            <h1 className='text-[100px] sm:text-[150px] md:text-[180px] lg:text-[220px] xl:text-[280px] text-white text-right-entry' style={{ fontFamily: 'OntrobucjDemo, sans-serif' }}>Your</h1>
          </div>

          {/* original tin (we hide this while clone animates on desktop) */}
          <img
            ref={imageRef}
            src={tin_1}
            alt='falling soda'
            className="w-[200px] lg:w-[240px] absolute top-1/2 left-1/2 z-30 opacity-100"
            style={{ transform: 'translate(-50%, -50%)' }}
          />

          <div className='absolute hidden md:flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col gap-0 items-center z-50 text-center'>
            <h1 className='text-[70px] sm:text-[60px] md:text-[100px] lg:text-[130px] xl:text-[140px] text-white text-left-entry' style={{ fontFamily: 'OntrobucjDemo, sans-serif' }}>Not</h1>
            <div className='h-[45px] sm:h-[100px] md:h-[180px] lg:h-[220px] xl:h-[240px]' />
            <h1 className='text-[70px] sm:text-[60px] md:text-[100px] lg:text-[130px] xl:text-[140px] text-white text-left-entry' style={{ fontFamily: 'OntrobucjDemo, sans-serif' }}>No.2</h1>
            <div className='flex gap-3'>
              <button onClick={() => setSelectedItem(0)} className={`w-12 h-12 bg-[#FF4C0D] hover:scale-105 cursor-pointer border-2 rounded-full  ${selectedItem === 0 ? "border-white" : "border-[#ffb69b]"}`}></button>
              <button onClick={() => setSelectedItem(1)} className={`w-12 h-12 bg-[#BAD42C] hover:scale-105 cursor-pointer border-2 rounded-full  ${selectedItem === 1 ? "border-white" : "border-[#97ad18]"}`}></button>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className='container lg:h-[100dvh] flex flex-col mx-auto  pb-10'>
          <div className='pt-16 pb-10'>
            <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='text-center text-4xl lg:text-5xl mb-2'>From Cravings Built Without Compromise</h1>
            <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='text-center text-[#838383] text-2xl'>NO JUNK . NO GUILT</h1>
          </div>
          <div className='flex flex-col-reverse flex-1 md:flex-row'>
            <div className='flex-1 flex flex-col justify-center px-3'>
              <p className='text-[#6E6C6C] md:text-lg mb-10'>
                Most fizzy drinks are fun until you read the label. Sugar bombs. Chemical sweeteners. Fake flavours. Preservatives you can't pronounce. We were done with it. That's where SIRIK comes in. We're not here to cancel soda we're here to redefine it. SIRIK is a new-age carbonated drink built for people who want the fizz, the flavour, the vibe without the guilt. We use real, natural ingredients like Nannari root, known for its cooling and gut-friendly properties and pair it with Low sugar , no preservatives, prebiotics. Whether you're finishing a workout, grabbing lunch, or just craving something cold — SIRIK gives you that same satisfying soda kick, just cleaner.
              </p>
              <div className='bg-black text-white flex items-center w-fit text-lg rounded-full p-2'>
                <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='px-4'>About us</h1>
                <img src='/arrow.svg' className='w-12 h-12'/>
              </div>
            </div>
            <div ref={aboutTinTargetRef} className="flex-1 hidden lg:flex items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(255,100,50,0.3)_0%,_rgba(255,255,255,1)_70%)]">

            </div>
          </div>
        </div>

        <Section_3/>

        <MomentsMovement/>
        <div className='container py-14 flex flex-col mx-auto'>
          <div className='flex flex-col-reverse flex-1 px-4 lg:flex-row'>
            <div className='flex-1 flex flex-col justify-center '>
              <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='text-4xl mb-3 text-[#F46C3C]' >Meet the Mind Behind Madness</h1>
              <p className='text-[#6E6C6C] md:text-lg mb-5'>
                 Hey! I’m Srikar YS — a former engineer, full-time flavour rebel .I didn’t grow up dreaming about beverages. I wasn’t born with a silver can in my hand. I came from chaos. There were moments I felt like I wasn’t even worth holding on to, easy to leave behind, easy to ignore. I was pushed down deep into a place with no light, no clarity just noise and questions. But what I thought was a pit…Turned out to be a forge. “A forge doesn’t save you. It remakes you.” They create Weapons. Warriors. Legends. That’s where SIRIK was born. Not from a market trend or branding playbook  but from pure, unfiltered fire. This isn’t just a beverage brand. It’s proof that you can be broken, underestimated, even forgotten and still Rise. Sharper than ever. I didn’t come from a boardroom. I came from the FIRE.   
              </p>
              <div className='bg-black text-white flex items-center w-fit text-lg rounded-full p-2'>
                <h1 style={{ fontFamily: 'quincycf, sans-serif' }} className='px-4'>About us</h1>
                <img src='/arrow.svg' className='w-12 h-12'/>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center mb-10 ">
              <img src='/sirik_aboutsus.avif' alt='' className='w-full max-w-[500px]'/>
            </div>
          </div>
        </div>
        <Section_11_11/>
      </div>

      <div className='bg-[#1E1143]'>
        <Footer/>
      </div>

    </div>
  )
}

export default Indexpage
