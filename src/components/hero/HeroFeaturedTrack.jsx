export default function HeroFeaturedTrack({
  track,
  isPlaying,
  onTogglePlay,
  highResCover,
}) {
  if (!track) return null

  return (
    <div className="lg:col-span-7 space-y-5">
      {/* Título de la pista */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg line-clamp-2">
        {track.trackName}
      </h1>

      {/* Artista y Álbum */}
      <p className="text-base sm:text-lg font-medium text-white/90">
        Por <span className="text-primary font-bold">{track.artistName}</span> •{' '}
        <span className="italic text-white/70">{track.collectionName}</span>
      </p>

      {/* Metadatos técnicos */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-white/70">
        <span className="badge badge-sm badge-secondary">{track.primaryGenreName}</span>
        <span className="badge badge-sm badge-neutral text-white/90">
          {track.releaseDate ? new Date(track.releaseDate).getFullYear() : '2024'}
        </span>
        {track.trackPrice && (
          <span className="badge badge-sm badge-ghost border border-white/20">
            {track.trackPrice} USD
          </span>
        )}
        <span>• Muestra oficial de 30 segundos</span>
      </div>

      {/* Botón de reproducción */}
      <div className="pt-2">
        <button
          onClick={() => onTogglePlay(track)}
          className="btn btn-primary btn-md gap-3 rounded-full px-7 shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
        >
          {isPlaying ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
              Pausar Muestra
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Reproducir Muestra (30s)
            </>
          )}
        </button>
      </div>

      {/* Mini tarjeta informativa de carátula con efecto 3D */}
      <div className="hover-3d max-w-md mt-2">
        {/* Contenido de la tarjeta */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center gap-4 shadow-xl">
          <img
            src={highResCover}
            alt={track.collectionName}
            className="w-16 h-16 rounded-xl object-cover shadow-md border border-white/10 shrink-0"
          />
          <div className="overflow-hidden">
            <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold block">
              Álbum Oficial
            </span>
            <p className="text-sm font-semibold truncate text-white">{track.collectionName}</p>
            <p className="text-xs text-white/60 truncate">{track.artistName}</p>
          </div>
        </div>

        {/* 8 divs necesarios para el sensor interactivo del efecto 3D de DaisyUI */}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
