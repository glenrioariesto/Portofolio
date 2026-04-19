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
import { useNavbar } from '@/hooks/useNavbar'

const TWEEN_FACTOR_BASE = 0.52

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

type PropType = {
  projects: Project[]
  options?: EmblaOptionsType
}

const ProjectCard = ({ 
  project, 
  index, 
  isExpanded, 
  onToggle 
}: { 
  project: Project; 
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTechStackExpanded, setIsTechStackExpanded] = useState(false)

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
      <div className="flex w-full h-[500px] bg-white/90 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-2xl py-2 pr-2 relative border border-white/30">

        <div className="z-30 absolute bottom-0 left-0 w-full h-16 flex flex-row justify-around items-center bg-white rounded-b-[2.5rem] px-6 md:relative md:w-20 md:h-full md:flex-col md:justify-start md:py-8 md:gap-8 md:bottom-auto md:left-auto md:bg-transparent md:px-0 md:rounded-none">
          <div className="hidden md:flex w-10 h-10 bg-black text-white rounded-full items-center justify-center font-bold text-xl">
            {index + 1}
          </div>
          <div className="flex flex-row md:flex-col gap-8 text-gray-400 w-full md:w-auto justify-around md:justify-start items-center">
            <button onClick={nextImage} className="text-black hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100/50">
              <ChevronRight size={24} />
            </button>
            <button onClick={prevImage} className="text-gray-500 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100/50">
              <ChevronLeft size={24} />
            </button>
          </div>
        </div>

        <div 
          className="flex-1 relative rounded-[2rem] overflow-hidden bg-[#fdf6f0] h-full pb-16 md:pb-0 cursor-pointer pointer-events-auto"
          onClick={() => {
            if (window.innerWidth < 1024) onToggle();
          }}
        >
          <div className="absolute inset-0 bg-gray-200">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100" />
            {project.images.length > 0 && (
              <Image
                src={project.images[currentImageIndex]}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-opacity duration-500"
              />
            )}
          </div>

          {/* Top Right Actions */}
          <div className="absolute top-6 right-6 z-50 flex gap-4 text-black pointer-events-auto">
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

          <div className="absolute inset-0 pt-8 flex flex-col justify-end text-black pointer-events-none">
            <div className="grid grid-cols-[5rem_auto_1fr_auto_3rem] items-end">
              <div className="h-12 w-full relative -mb-2 border-b-12 border-r-12 rounded-b-4xl border-white/80 2xl:border-white z-50"></div>
              
              <div
                className={`-mx-[0.7rem] 2xl:-mx-[1rem] bg-white p-5 rounded-t-3xl shadow-sm w-auto min-w-[12rem] max-w-[15rem] hidden sm:block relative z-40 border-x-12 border-t-12 border-b-0 border-white/20 pointer-events-auto cursor-pointer transition-all duration-300 flex flex-col ${isTechStackExpanded ? 'h-auto' : 'h-24 overflow-hidden'}`}
                onClick={(e) => { e.stopPropagation(); setIsTechStackExpanded(!isTechStackExpanded); }}
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
                    <span key={idx} className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="h-12 w-full relative -mb-2 border-b-12 border-x-12 rounded-b-4xl border-white/80 2xl:border-white z-50"></div>

              <div
                className={`-mx-[0.7rem] 2xl:-mx-[1rem] bg-white p-4 rounded-t-3xl shadow-sm flex flex-col justify-center gap-2 pr-8 relative border-x-12 border-t-12 border-b-0 border-white/20 pointer-events-auto cursor-pointer transition-all duration-300 ease-in-out min-w-[20rem] max-w-[28rem] ${isExpanded ? 'h-auto max-h-[400px] overflow-y-auto z-[200] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]' : 'h-24 overflow-hidden z-40'}`}
                onClick={(e) => { e.stopPropagation(); onToggle(); }}
              >
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center border-r border-gray-200 pr-6 shrink-0">
                    <span className="text-xs font-bold text-gray-700 text-center leading-tight mt-0.5">{project.date}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold leading-tight font-rubik-doodle tracking-wide">{project.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold">{project.role}</span>
                    </div>
                    {isExpanded && (
                      <>
                        <p className="text-xs text-gray-500 mt-3 leading-relaxed font-grotesk font-light max-h-[100px] overflow-y-auto pr-2 custom-scrollbar">
                          {project.description}
                        </p>
                        {project.stats && project.stats.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-100">
                            {project.stats.map((stat, idx) => (
                              <div key={idx} className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-1 rounded-full border border-orange-100 shadow-sm">
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{stat.label}</span>
                                <span className="text-xs font-black bg-gradient-to-r from-amber-700 to-orange-600 text-transparent bg-clip-text">
                                  {stat.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 text-gray-500">
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                  </div>
                </div>
              </div>

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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const { hide, show } = useNavbar("emblaCarousel")
  
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  // Sync Navbar Visibility with Expanded State
  useEffect(() => {
    // Hide navbar for any screen smaller than typical desktop (1024px)
    if (window.innerWidth < 1024) {
      if (expandedIndex !== null) hide();
      else show();
    }
  }, [expandedIndex]); // Removed hide, show from dependencies to avoid infinite loops

  // Reset expanded state on slide change
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', () => setExpandedIndex(null));
  }, [emblaApi]);

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

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
          const scale = numberWithinRange(tweenValue, 0, 1).toString()
          const tweenNode = tweenNodes.current[slideIndex]
          if (tweenNode) tweenNode.style.transform = `scale(${scale})`
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
              <ProjectCard 
                project={project} 
                index={index} 
                isExpanded={expandedIndex === index}
                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
              />
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
