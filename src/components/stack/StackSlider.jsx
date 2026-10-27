import { useState, useRef } from 'react'
import { TECH_CREATORS } from '../../data/techCreators'
import StackCard from './StackCard'

export default function StackSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef(null)

  const scrollToSlide = (index) => {
    setCurrentIndex(index)
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth
      sliderRef.current.scrollTo({
        left: index * containerWidth,
        behavior: 'smooth',
      })
    }
  }

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + TECH_CREATORS.length) % TECH_CREATORS.length
    scrollToSlide(nextIdx)
  }

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % TECH_CREATORS.length
    scrollToSlide(nextIdx)
  }

  return (
    <div className="w-full space-y-6 flex flex-col items-center">
      {/* Slider con contenedor redondeado y altura fija en lg */}
      <div className="relative w-full rounded-3xl bg-neutral-900/70 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden min-h-115 lg:h-112.5 flex items-center">
        
        {/* Pista de deslizamiento horizontal suave */}
        <div
          ref={sliderRef}
          className="w-full h-full flex overflow-x-hidden scroll-smooth scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {TECH_CREATORS.map((tech) => (
            <StackCard key={tech.id} tech={tech} />
          ))}
        </div>

        {/* Flechas de navegación */}
        <div className="absolute left-2.5 sm:left-4 right-2.5 sm:right-4 top-1/2 flex -translate-y-1/2 transform justify-between pointer-events-none z-20">
          <button
            type="button"
            onClick={handlePrev}
            className="btn btn-circle btn-sm sm:btn-md bg-neutral-900/80 hover:bg-primary hover:text-primary-content text-white border-white/20 shadow-xl pointer-events-auto transition-transform active:scale-90"
            aria-label="Anterior"
          >
            ❮
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="btn btn-circle btn-sm sm:btn-md bg-neutral-900/80 hover:bg-primary hover:text-primary-content text-white border-white/20 shadow-xl pointer-events-auto transition-transform active:scale-90"
            aria-label="Siguiente"
          >
            ❯
          </button>
        </div>

      </div>

      {/* Botones selectores inferiores */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-3xl">
        {TECH_CREATORS.map((tech, idx) => (
          <button
            key={tech.id}
            type="button"
            onClick={() => scrollToSlide(idx)}
            className={`btn btn-xs sm:btn-sm rounded-full font-semibold transition-all ${
              currentIndex === idx
                ? 'btn-primary text-primary-content shadow-lg shadow-primary/30 scale-105'
                : 'btn-ghost text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            {tech.name}
          </button>
        ))}
      </div>
    </div>
  )
}
