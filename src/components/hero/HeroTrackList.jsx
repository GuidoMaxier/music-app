import { formatDuration } from './constants'

export default function HeroTrackList({
  tracks,
  genero,
  limit = 5,
  activeTrack,
  currentPlayingId,
  volume = 0.3,
  onVolumeChange,
  onSelectTrack,
  onTogglePlay,
}) {
  return (
    <div className="lg:col-span-5">
      <div className="hover-3d w-full">
        <div className="card relative z-10 pointer-events-auto backdrop-blur-2xl bg-black/45 border border-white/15 rounded-3xl p-5 shadow-2xl space-y-3 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span>🔥</span> Top {limit} Canciones
          </h2>
          <span className="text-xs text-white/60 font-mono capitalize">{genero}</span>
        </div>

        <div className="divide-y divide-white/5 space-y-1 min-h-72.5 flex flex-col justify-start">
          {tracks.map((track, idx) => {
            const isPlaying = currentPlayingId === track.trackId
            const isSelected = activeTrack?.trackId === track.trackId

            return (
              <div
                key={track.trackId}
                onClick={() => onSelectTrack(track)}
                className={`group flex items-center justify-between py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary/25 border border-primary/40 text-primary-content font-semibold'
                    : 'hover:bg-white/10'
                }`}
              >
                {/* Audio oculto */}
                <audio
                  id={`hero-audio-${track.trackId}`}
                  src={track.previewUrl}
                  onEnded={() => onTogglePlay(track, true)}
                />

                <div className="flex items-center gap-3 overflow-hidden pr-2">
                  <span className="text-xs font-mono w-5 text-white/50 group-hover:text-primary shrink-0">
                    0{idx + 1}
                  </span>
                  <div className="truncate">
                    <p className="text-sm font-medium truncate text-white">{track.trackName}</p>
                    <p className="text-xs text-white/60 truncate">{track.artistName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-white/60">
                    {formatDuration(track.trackTimeMillis)}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onTogglePlay(track)
                    }}
                    className={`btn btn-circle btn-xs transition-transform ${
                      isPlaying
                        ? 'btn-primary scale-110'
                        : 'btn-ghost hover:btn-primary text-white'
                    }`}
                    aria-label={`Reproducir ${track.trackName}`}
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )
          })}

          {/* Slots vacíos si vienen menos canciones que el límite */}
          {Array.from({ length: Math.max(0, limit - tracks.length) }).map((_, i) => {
            const slotNumber = tracks.length + i + 1
            return (
              <div
                key={`empty-slot-${i}`}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl border border-dashed border-white/10 text-white/30 select-none"
              >
                <div className="flex items-center gap-3 overflow-hidden pr-2">
                  <span className="text-xs font-mono w-5 text-white/30 shrink-0">
                    0{slotNumber}
                  </span>
                  <div className="truncate">
                    <p className="text-sm font-medium text-white/30 truncate">Pista no disponible</p>
                    <p className="text-xs text-white/20 truncate">Sin información de artista</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-white/30">--:--</span>
                  <div className="btn btn-circle btn-xs btn-ghost text-white/20 pointer-events-none opacity-40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

          {/* Pie del card: Muestras de 30s | Control de volumen minimalista | Botón iTunes API */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs text-white/60">
            {/* 1. Muestras de 30s */}
            <span className="shrink-0 text-[11px] font-medium tracking-wide text-white/50">
              Muestras de 30s
            </span>

            {/* 2. Control de volumen minimalista DaisyUI Range */}
            <div className="flex items-center gap-1.5 flex-1 max-w-44 px-1 group" title={`Volumen: ${Math.round(volume * 100)}%`}>
              <button
                type="button"
                onClick={() => onVolumeChange(volume > 0 ? 0 : 0.3)}
                className="btn btn-ghost btn-circle btn-xs text-white/60 hover:text-primary transition-colors shrink-0 p-0 h-6 w-6 min-h-0"
                aria-label={volume === 0 ? "Activar sonido" : "Silenciar"}
              >
                {volume === 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-error/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="range range-xs range-primary flex-1 opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
                aria-label="Control de volumen"
              />
            </div>

            {/* 3. Botón iTunes API */}
            <a
              href="https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="badge badge-sm text-black bg-white hover:bg-primary hover:text-primary-content transition-all font-semibold cursor-pointer shrink-0"
              title="Ver documentación oficial de iTunes Search API"
            >
              iTunes API
            </a>
          </div>
        </div>

        {/* 8 divs necesarios para el sensor interactivo del efecto 3D de DaisyUI */}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        {/* <div></div>
        <div></div>
        <div></div>
        <div></div> */}
      </div>
    </div>
  )
}
