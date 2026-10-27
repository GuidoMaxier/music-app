import { useState } from 'react'

const SUGGESTED_ARTISTS = [
  'Maroon 5',
  'Maria Becerra',
  'Bizarrap',
  'HUNTER/X',
  'Coldplay',
  'Milo J',
  'Duki',
  'Emilia',
  'Bad Bunny',
]

export default function HeroSearchBar({ currentQuery, onSearch, isLoading = false }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    if (trimmed && trimmed.toLowerCase() !== currentQuery.toLowerCase()) {
      onSearch(trimmed)
    }
  }

  const handleSelectSuggestion = (item) => {
    setInputValue(item)
    if (item.toLowerCase() !== currentQuery.toLowerCase()) {
      onSearch(item)
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Formulario con barra de búsqueda general (canción, artista o álbum) */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-md w-full">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Buscar canción, artista o tema (ej: "${currentQuery}")...`}
            className="w-full pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 bg-neutral-900/70 border border-white/10 rounded-full focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 backdrop-blur-md transition-all shadow-inner"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-sm btn-primary rounded-full px-4 text-xs font-semibold shadow-md shadow-primary/20 transition-transform active:scale-95 disabled:opacity-70 flex items-center gap-1.5"
        >
          {isLoading && <span className="loading loading-spinner loading-xs"></span>}
          <span>Buscar</span>
        </button>
      </form>

      {/* Sugerencias rápidas de artistas populares */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="font-semibold uppercase tracking-wider text-white/40 mr-1 text-[11px]">
          Sugeridos:
        </span>
        {SUGGESTED_ARTISTS.map((artist) => {
          const isSelected = currentQuery?.toLowerCase() === artist.toLowerCase()
          return (
            <button
              key={artist}
              type="button"
              onClick={() => handleSelectSuggestion(artist)}
              className={`px-3 py-1 rounded-full text-xs transition-all duration-200 border ${isSelected
                  ? 'bg-primary/20 border-primary/50 text-primary font-bold shadow-sm'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/15 hover:text-white'
                }`}
            >
              {artist}
            </button>
          )
        })}
      </div>
    </div>
  )
}
