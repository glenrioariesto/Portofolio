import React, { useCallback, useEffect, useRef } from 'react'
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType
} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButton'
import { Home, Compass, User, Settings, ArrowUpRight } from 'lucide-react'


const TWEEN_FACTOR_BASE = 0.52

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__slide__number') as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine()
      const scrollProgress = emblaApi.scrollProgress()
      const slidesInView = emblaApi.slidesInView()
      const isScrollEvent = eventName === 'scroll'

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress)
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress)
                }
              }
            })
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
          const scale = numberWithinRange(tweenValue, 0, 1).toString()
          const tweenNode = tweenNodes.current[slideIndex]
          tweenNode.style.transform = `scale(${scale})`
        })
      })
    },
    []
  )

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenScale(emblaApi)

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale)
  }, [emblaApi, tweenScale])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number relative h-full">
                <div className="flex w-full h-[500px] bg-white/90 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-2xl py-2 pr-2 relative border-2 border-gray-400 2xl:border-gray-100">



                  {/* Navigation Bar (Sidebar on Desktop, Bottom Bar on Mobile) */}
                  <div className="
                      z-30
                      /* Mobile: Absolute bottom, horizontal row */
                      absolute bottom-0 left-0 w-full h-16 flex flex-row justify-around items-center bg-white rounded-b-[2.5rem] px-6 2xl:border-none
                      /* Desktop: Relative, vertical column */
                      md:relative md:w-20 md:h-full md:flex-col md:justify-start md:py-8 md:gap-8 md:bottom-auto md:left-auto md:bg-transparent md:px-0 md:rounded-none
                  ">
                    {/* Number Badge (Desktop only) */}
                    <div className="hidden md:flex w-10 h-10 bg-black text-white rounded-full items-center justify-center font-bold text-xl">
                      {index + 1}
                    </div>

                    {/* Icons */}
                    <div className="flex flex-row md:flex-col gap-8 text-gray-400 w-full md:w-auto justify-around md:justify-start items-center">
                      <Home size={24} className="text-black" />
                      <Compass size={24} />
                      <User size={24} />
                      <Settings size={24} />
                    </div>

                    {/* Bottom Avatar (Desktop only) */}
                    <div className="hidden md:block mt-auto">
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 relative rounded-[2rem] overflow-hidden bg-[#fdf6f0] h-full pb-16 md:pb-0 border-2 border-gray-400 2xl:border-gray-100">

                    {/* Background Image Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100">
                      {/* Abstract shapes or image would go here */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-300 rounded-full blur-3xl opacity-20" />
                      <div className="absolute left-20 top-20 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-20" />
                    </div>



                    {/* Top Right Actions */}
                    <div className="absolute top-6 right-6 z-10 flex gap-4 text-black">
                      <button className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors">
                        Redirect to Portfolio
                        <ArrowUpRight size={16} />
                      </button>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 pt-8 flex flex-col justify-end text-black">
                      <div className="grid grid-cols-[5rem_auto_1fr_auto_3rem] items-end">

                        {/* Spacer Left */}
                        <div className="h-12 w-full relative -mb-2 2xl:-mb-1 border-b-8 border-r-8 rounded-b-3xl border-gray-400 2xl:border-white z-50"></div>

                        {/* Bottom Left Widget */}
                        <div className="-mx-2 2xl:-mx-[0.6rem] bg-white/80 backdrop-blur-md p-5 rounded-t-3xl shadow-sm w-48 hidden sm:block relative z-40 border-8 2xl:border-2 border-gray-400 2xl:border-gray-100 border-b-0">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-medium text-gray-500">20% off</span>
                            <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">
                              ✓
                            </div>
                          </div>
                          <div className="mb-1">
                            <span className="text-sm text-gray-500">Free Popcorn</span>
                          </div>
                          <div>
                            <span className="text-3xl font-bold">24</span>
                            <span className="text-sm text-gray-500 ml-1">min</span>
                          </div>
                        </div>

                        {/* Spacer Middle */}
                        <div className="h-12 w-full relative -mb-2 2xl:-mb-1 border-b-8 border-x-8 rounded-b-3xl border-gray-400 2xl:border-white z-50">
                          {/* This space is reserved for the inverted radius effect */}
                        </div>

                        {/* Bottom Right Widget */}
                        <div className="-mx-2 2xl:-mx-[0.6rem] bg-white/80 backdrop-blur-md p-4 rounded-t-3xl shadow-sm flex items-center gap-6 pr-8 relative z-40 border-8 2xl:border-2 border-gray-400 2xl:border-gray-100 border-b-0">
                          <div className="flex flex-col items-center border-r border-gray-200 pr-6">
                            <span className="text-xs font-medium text-gray-500">Oct 2024</span>
                            <span className="text-3xl font-bold">02</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold leading-tight">Dungeon<br />Dragon<span className="text-purple-600">S</span></h3>
                          </div>
                        </div>

                        {/* Spacer Right */}
                        <div className="h-12 w-full relative -mb-2 2xl:-mb-1 border-b-8 border-l-8 rounded-b-3xl border-gray-400 2xl:border-white z-50"></div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div> */}
    </div>
  )
}

export default EmblaCarousel
