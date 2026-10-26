import { HERO_CATEGORIES } from './constants'

export default function HeroGenreSelector({ currentGenre, onSelectGenre }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold tracking-wider uppercase text-white/50 mr-2">
        Géneros:
      </span>
      {HERO_CATEGORIES.map(cat => (
        <button
          key={cat.term}
          onClick={() => {
            if (currentGenre !== cat.term) {
              onSelectGenre(cat.term)
            }
          }}
          className={`btn btn-xs sm:btn-sm rounded-full transition-all duration-300 ${
            currentGenre === cat.term
              ? 'btn-primary shadow-md shadow-primary/30 font-bold scale-105'
              : 'btn-ghost bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border-none'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
