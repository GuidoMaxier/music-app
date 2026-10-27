export default function HeroFeaturedTrack({
  track,
  isPlaying,
  onTogglePlay,
  highResCover,
  error,
  onRetry,
}) {
  const isFallback = !track || Boolean(error)
  const displayCover = highResCover || `${import.meta.env.BASE_URL}Fondo-01.png`

  return (
    <div className="lg:col-span-7 space-y-5">
      {/* Alerta de conexión si hay error */}
      {error && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-error/15 border border-error/30 text-error text-xs font-semibold backdrop-blur-md">
          <span>⚠️</span>
          <span>Modo sin conexión • Mostrando plantilla previa</span>
        </div>
      )}

      {/* Título de la pista */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg line-clamp-2">
        {isFallback ? 'No se pudo cargar la canción destacada' : track.trackName}
      </h1>

      {/* Artista y Álbum */}
      <p className="text-base sm:text-lg font-medium text-white/90">
        {isFallback ? (
          <>
            Por <span className="text-primary font-bold">Servidor no disponible</span> •{' '}
            <span className="italic text-white/70">Revisa tu conexión a internet</span>
          </>
        ) : (
          <>
            Por <span className="text-primary font-bold">{track.artistName}</span> •{' '}
            <span className="italic text-white/70">{track.collectionName}</span>
          </>
        )}
      </p>

      {/* Metadatos técnicos */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-white/70">
        <span className="badge badge-sm badge-secondary">
          {isFallback ? 'Desconectado' : track.primaryGenreName}
        </span>
        <span className="badge badge-sm badge-neutral text-white/90">
          {isFallback ? '----' : track.releaseDate ? new Date(track.releaseDate).getFullYear() : '2024'}
        </span>
        {!isFallback && track.trackPrice && (
          <span className="badge badge-sm badge-ghost border border-white/20">
            {track.trackPrice} USD
          </span>
        )}
        <span>• Muestra oficial de 30 segundos</span>
      </div>

      {/* Botón de acción: Reintentar o Reproducir */}
      <div className="pt-2">
        {isFallback ? (
          <button
            onClick={onRetry}
            className="btn btn-primary btn-md gap-3 rounded-full px-7 shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reintentar Conexión
          </button>
        ) : (
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
        )}
      </div>

      {/* Mini tarjeta informativa de carátula con efecto 3D */}
      <div className="hover-3d max-w-md mt-2">
        {/* Contenido de la tarjeta */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center gap-4 shadow-xl">
          <img
            src={displayCover}
            alt={isFallback ? 'Carátula por defecto' : track.collectionName}
            className="w-16 h-16 rounded-xl object-cover shadow-md border border-white/10 shrink-0"
          />
          <div className="overflow-hidden">
            <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold block">
              {isFallback ? 'Vista Previa' : 'Álbum Oficial'}
            </span>
            <p className="text-sm font-semibold truncate text-white">
              {isFallback ? 'Catálogo no disponible' : track.collectionName}
            </p>
            <p className="text-xs text-white/60 truncate">
              {isFallback ? 'Haz clic en Reintentar Conexión' : track.artistName}
            </p>
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
