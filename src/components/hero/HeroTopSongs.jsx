import { useState, useEffect } from 'react'
import HeroBackground from './HeroBackground'
import HeroGenreSelector from './HeroGenreSelector'
import HeroFeaturedTrack from './HeroFeaturedTrack'
import HeroTrackList from './HeroTrackList'

export default function HeroTopSongs({ limit = 5 }) {
  const [genero, setGenero] = useState('rock')
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPlayingId, setCurrentPlayingId] = useState(null)
  const [activeTrack, setActiveTrack] = useState(null)
  const [volume, setVolume] = useState(0.8)

  useEffect(() => {
    let ignore = false
    const controller = new AbortController()

    async function loadGenreTracks() {
      setLoading(true)
      try {
        const res = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(genero)}&media=music&entity=song&limit=${limit}`,
          { signal: controller.signal }
        )
        if (!res.ok) throw new Error('Error al consultar iTunes')
        const json = await res.json()

        if (!ignore && json.results && json.results.length > 0) {
          setTracks(json.results)
          setActiveTrack(json.results[0])
          setLoading(false)
        }
      } catch (err) {
        if (err.name !== 'AbortError' && !ignore) {
          setLoading(false)
        }
      }
    }

    loadGenreTracks()

    return () => {
      ignore = true
      controller.abort()
    }
  }, [genero, limit])

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume)
    document.querySelectorAll('audio').forEach((audio) => {
      audio.volume = newVolume
    })
  }

  const handleTogglePlay = (track, isEnded = false) => {
    if (isEnded) {
      setCurrentPlayingId(null)
      return
    }

    const audioEl = document.getElementById(`hero-audio-${track.trackId}`)
    if (!audioEl) return

    audioEl.volume = volume

    document.querySelectorAll('audio').forEach(a => {
      if (a !== audioEl) a.pause()
    })

    if (currentPlayingId === track.trackId) {
      audioEl.pause()
      setCurrentPlayingId(null)
    } else {
      audioEl.play().catch(() => {})
      setCurrentPlayingId(track.trackId)
      setActiveTrack(track)
    }
  }

  const handleGenreChange = (newGenre) => {
    setGenero(newGenre)
    setCurrentPlayingId(null)
  }

  const primarySong = activeTrack || tracks[0]
  const highResCover = primarySong?.artworkUrl100?.replace('100x100bb', '1400x1400bb')

  return (
    <div className="relative min-h-[calc(100vh-4rem)] text-white pt-24 pb-8 px-4 md:px-8 lg:px-16 overflow-hidden bg-neutral-950 flex flex-col justify-center">
      <HeroBackground highResCover={highResCover} />

      <div className="relative max-w-7xl mx-auto w-full space-y-6">
        <HeroGenreSelector
          currentGenre={genero}
          onSelectGenre={handleGenreChange}
        />

        {loading ? (
          <div className="min-h-[45vh] flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : primarySong ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <HeroFeaturedTrack
              track={primarySong}
              isPlaying={currentPlayingId === primarySong.trackId}
              onTogglePlay={handleTogglePlay}
              highResCover={highResCover}
            />

            <HeroTrackList
              tracks={tracks}
              genero={genero}
              limit={limit}
              activeTrack={activeTrack}
              currentPlayingId={currentPlayingId}
              volume={volume}
              onVolumeChange={handleVolumeChange}
              onSelectTrack={setActiveTrack}
              onTogglePlay={handleTogglePlay}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
