import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType
} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButton'
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers, ChevronUp, ChevronDown, Briefcase } from 'lucide-react'
import { Project } from './Experience'
import Image from 'next/image'

const TWEEN_FACTOR_BASE = 0.52

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

type PropType = {
  projects: Project[]
  options?: EmblaOptionsType
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTechStackExpanded, setIsTechStackExpanded] = useState(false)
  const [isInfoExpanded, setIsInfoExpanded] = useState(false)

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <div className="embla__slide__number relative h-full">
      {/*this add props color custom bg*/}
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
            {/* Next Image Button */}
            <button
              onClick={nextImage}
              className="text-black hover:text-gray-600 transition-colors cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Previous Image Button */}
            <button
              onClick={prevImage}
              className="text-gray-400 hover:text-black transition-colors cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          {/* Bottom Avatar (Desktop only) */}
          <div className="hidden md:block mt-auto">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative rounded-[2rem] overflow-hidden bg-[#fdf6f0] h-full pb-16 md:pb-0">

          {/* Background Image */}
          <div className="absolute inset-0 bg-gray-200">
            {/* Fallback gradient if no image */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100" />

            {project.images.length > 0 && (
              <Image
                src={project.images[currentImageIndex]}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-opacity duration-500"
              />
            )}

            {/* Image Indicators - Removed as we have counter in navbar now */}
            {/* {project.images.length > 1 && (
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                 {project.images.map((_, idx) => (
                   <div 
                     key={idx} 
                     className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                   />
                 ))}
               </div>
             )} */}
          </div>

          {/* Top Right Actions */}
          <div className="absolute top-6 right-6 z-10 flex gap-4 text-black">
            {project.links && project.links.length > 0 && (
              <>
                {project.links.length === 1 ? (
                  <a
                    href={project.links[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors"
                  >
                    {project.links[0].label || "View Project"}
                    <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <div className="relative group">
                    <button
                      className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors"
                    >
                      View Project
                      <ChevronDown size={16} />
                    </button>
                    <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block z-50">
                      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 p-1">
                        {project.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            {link.label}
                            <ArrowUpRight size={14} className="text-gray-400" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 pt-8 flex flex-col justify-end text-black pointer-events-none">
            <div className="grid grid-cols-[5rem_auto_1fr_auto_3rem] items-end">

              {/* Spacer Left */}
              <div className="h-12 w-full relative -mb-2 border-b-12 border-r-12 rounded-b-4xl border-white/80 2xl:border-white z-50"></div>

              {/* Bottom Left Widget - Tech Stack */}
              <div
                className={`-mx-[0.7rem] 2xl:-mx-[1rem] bg-white p-5 rounded-t-3xl shadow-sm w-auto min-w-[12rem] max-w-[15rem] hidden sm:block relative z-40 border-x-12 border-t-12 border-b-0 2xl:border-x-2 2xl:border-t-2 border-white/20 2xl:border-gray-100  pointer-events-auto cursor-pointer transition-all duration-300 ease-in-out flex flex-col ${isTechStackExpanded ? 'h-auto' : 'h-24 overflow-hidden'}`}
                onClick={() => setIsTechStackExpanded(!isTechStackExpanded)}
              >
                <div className="flex items-center justify-between gap-2 mb-3 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Layers size={16} />
                    <span className="text-xs font-medium uppercase tracking-wider">Tech Stack</span>
                  </div>
                  {isTechStackExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </div>
                <div className={`flex flex-wrap gap-2 pr-1 ${isTechStackExpanded ? 'max-h-[140px] overflow-y-auto' : ''}`}>
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className={`px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700 ${!isTechStackExpanded && idx > 2 ? 'hidden' : ''}`}>
                      {tech}
                    </span>
                  ))}
                  {!isTechStackExpanded && project.techStack.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Spacer Middle */}
              <div className="h-12 w-full relative -mb-2 border-b-12 border-x-12 rounded-b-4xl border-white/80 2xl:border-white z-50">
                {/* This space is reserved for the inverted radius effect */}
              </div>

              {/* Bottom Right Widget - Project Info */}
              <div
                className={`-mx-[0.7rem] 2xl:-mx-[1rem] bg-white p-4 rounded-t-3xl shadow-sm flex flex-col justify-center gap-2 pr-8 relative z-40 border-x-12 border-t-12 border-b-0 2xl:border-x-2 2xl:border-t-2 border-white/20 2xl:border-gray-100 pointer-events-auto cursor-pointer transition-all duration-300 ease-in-out  min-w-[20rem] max-w-[28rem]  ${isInfoExpanded ? 'h-auto max-h-[250px] overflow-y-auto' : 'h-24 overflow-hidden'}`}
                onClick={() => setIsInfoExpanded(!isInfoExpanded)}
              >
                <div className="flex items-center gap-6">
                  {/* Date Section - handles both simple and range */}
                  <div className="flex flex-col items-center border-r border-gray-200 pr-6 shrink-0">
                    {project.date.includes(' - ') ? (
                      /* Range date: "Sep 2024 - Jan 2025" */
                      <>
                        <span className="text-xs font-bold text-gray-700 text-center leading-tight mt-0.5">
                          {project.date.split(' - ')[0]}
                        </span>
                        <span className="text-[10px] text-gray-400 my-0.5">to</span>
                        <span className="text-xs font-bold text-gray-700 text-center leading-tight">
                          {project.date.split(' - ')[1]}
                        </span>
                      </>
                    ) : (
                      /* Simple date: "Oct 2024" */
                      <>
                        <span className="text-xs font-medium text-gray-500">{project.date.split(' ')[0]}</span>
                        <span className="text-3xl font-bold">{project.date.split(' ')[1]}</span>
                      </>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-rubik-doodle font-bold leading-tight">{project.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold">{project.role}</span>
                    </div>
                    {isInfoExpanded && (
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{project.description}</p>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 text-gray-400">
                    {isInfoExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                  </div>
                </div>

                {isInfoExpanded && project.stats && project.stats.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-4">
                    {project.stats.map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                        <span className="text-lg font-bold text-primary">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Spacer Right */}
              <div className="h-12 w-full relative -mb-2 border-b-12 border-l-12 rounded-b-4xl border-white/80 2xl:border-white z-50"></div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { projects, options } = props
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
    <div className="embla relative px-20">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {projects.map((project, index) => (
            <div className="embla__slide" key={project.id}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between pointer-events-none px-24 2xl:px-82 ">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} className="pointer-events-auto w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg text-black" />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} className="pointer-events-auto w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg text-black" />
      </div>
    </div>
  )
}

export default EmblaCarousel
