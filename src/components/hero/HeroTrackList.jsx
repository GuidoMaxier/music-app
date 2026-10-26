import { formatDuration } from './constants'

export default function HeroTrackList({
  tracks,
  genero,
  activeTrack,
  currentPlayingId,
  onSelectTrack,
  onTogglePlay,
}) {
  return (
    <div className="lg:col-span-5">
      <div className="hover-3d w-full">
        <div className="card relative z-10 pointer-events-auto backdrop-blur-2xl bg-black/45 border border-white/15 rounded-3xl p-5 shadow-2xl space-y-3 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span>🔥</span> Top 5 Canciones
          </h2>
          <span className="text-xs text-white/60 font-mono capitalize">{genero}</span>
        </div>

        <div className="divide-y divide-white/5 space-y-1">
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
        </div>

          {/* Pie del card */}
          <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <span>Muestras de 30s</span>
            <a
              href="https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="badge badge-sm text-black bg-white hover:bg-primary hover:text-primary-content transition-all font-semibold cursor-pointer gap-1"
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
