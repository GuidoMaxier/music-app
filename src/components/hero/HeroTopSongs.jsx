import { useState, useEffect, useRef } from 'react'
import HeroBackground from './HeroBackground'
import HeroSearchBar from './HeroSearchBar'
import HeroFeaturedTrack from './HeroFeaturedTrack'
import HeroTrackList from './HeroTrackList'

// Caché en memoria para evitar llamadas redundantes y respuestas instantáneas
const tracksCache = new Map()

export default function HeroTopSongs({ limit = 5 }) {
  const [searchQuery, setSearchQuery] = useState('Maroon 5')
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const [currentPlayingId, setCurrentPlayingId] = useState(null)
  const [activeTrack, setActiveTrack] = useState(null)

  // limpia al elemento Audio
  const audioRef = useRef(null)

  // Inicializar el objeto de audio y limpiarlo al desmontar
  useEffect(() => {
    const audio = new Audio()
    audio.volume = 0.3
    audioRef.current = audio

    const handleEnded = () => {
      setCurrentPlayingId(null)
    }
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    let ignore = false
    const controller = new AbortController()
    const cacheKey = `${searchQuery.trim().toLowerCase()}_${limit}`

    async function loadTracks() {
      // 1. Lo tenemos en caché, lo mostramos sin spinner
      if (tracksCache.has(cacheKey)) {
        const cached = tracksCache.get(cacheKey)
        setTracks(cached)
        setActiveTrack(cached[0] || null)
        setError(null)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      try {
        // iTunes API busca en todos los atributos: canción (trackName), artista (artistName), álbum, etc.
        const fetchLimit = limit + 2
        const res = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&media=music&entity=song&limit=${fetchLimit}`,
          { signal: controller.signal }
        )
        if (!res.ok) throw new Error('Error al consultar iTunes')
        const json = await res.json()

        if (!ignore) {
          const validTracks = (json.results || [])
            .filter((t) => Boolean(t.previewUrl))
            .slice(0, limit)

          if (validTracks.length > 0) {
            tracksCache.set(cacheKey, validTracks)
            setTracks(validTracks)
            setActiveTrack(validTracks[0])
          } else {
            setTracks([])
            setActiveTrack(null)
            setError(`No se encontraron canciones disponibles para "${searchQuery}".`)
          }
          setLoading(false)
        }
      } catch (err) {
        if (err.name !== 'AbortError' && !ignore) {
          setTracks([])
          setActiveTrack(null)
          setError('No pudimos conectar con el servidor de música. Por favor, verifica tu conexión o intenta nuevamente.')
          setLoading(false)
        }
      }
    }

    loadTracks()

    return () => {
      ignore = true
      controller.abort()
    }
  }, [searchQuery, limit, retryCount])

  // Callback para que el componente hijo actualice el volumen directamente en el elemento de audio
  const handleVolumeChange = (newVolume) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  // Reproducir o pausar track seleccionado sin tocar el DOM con querySelector
  const handleTogglePlay = (track, isEnded = false) => {
    const audio = audioRef.current
    if (!audio) return

    if (isEnded) {
      setCurrentPlayingId(null)
      return
    }

    if (currentPlayingId === track.trackId) {
      audio.pause()
      setCurrentPlayingId(null)
    } else {
      audio.src = track.previewUrl
      audio.play().catch(() => {})
      setCurrentPlayingId(track.trackId)
      setActiveTrack(track)
    }
  }

  // Al buscar, pausar inmediatamente el audio actual para evitar fugas de sonido
  const handleSearch = (newQuery) => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setCurrentPlayingId(null)
    setSearchQuery(newQuery)
  }

  const handleRetry = () => {
    setRetryCount(c => c + 1)
  }

  const primarySong = activeTrack || tracks[0]
  const highResCover = primarySong?.artworkUrl100?.replace('100x100bb', '1400x1400bb')

  return (
    <div className="relative min-h-[calc(100vh-4rem)] text-white pt-24 pb-8 px-4 md:px-8 lg:px-16 overflow-hidden bg-neutral-950 flex flex-col justify-center">
      <HeroBackground highResCover={highResCover} />

      <div className="relative max-w-7xl mx-auto w-full space-y-6">
        <HeroSearchBar
          currentQuery={searchQuery}
          onSearch={handleSearch}
          isLoading={loading}
        />

        {/* Contenedor con altura mínima constante para evitar que la barra o el layout salte */}
        <div className="relative min-h-115 flex flex-col justify-center">
          {/* Overlay mientras busca, evitamos que se deforme el layout */}
          {loading && tracks.length > 0 && (
            <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center gap-3 rounded-3xl transition-opacity animate-fadeIn">
              <span className="loading loading-spinner loading-md text-primary"></span>
              <span className="text-xs text-white/70 font-medium tracking-wide">
                Buscando resultados para "{searchQuery}"...
              </span>
            </div>
          )}

          {loading && tracks.length === 0 ? (
            <div className="min-h-105 flex flex-col items-center justify-center gap-4">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="text-sm text-white/50 animate-pulse">Cargando canciones...</p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-opacity duration-300 ${loading ? 'opacity-40' : 'opacity-100'}`}>
              <HeroFeaturedTrack
                track={primarySong}
                isPlaying={currentPlayingId === primarySong?.trackId}
                onTogglePlay={handleTogglePlay}
                highResCover={highResCover}
                error={error}
                onRetry={handleRetry}
              />

              <HeroTrackList
                tracks={tracks}
                searchTerm={searchQuery}
                limit={limit}
                activeTrack={activeTrack}
                currentPlayingId={currentPlayingId}
                onVolumeChange={handleVolumeChange}
                onSelectTrack={setActiveTrack}
                onTogglePlay={handleTogglePlay}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
