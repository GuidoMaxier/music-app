export const HERO_CATEGORIES = [
  { label: '🔥 Rock', term: 'rock' },
  { label: '🎧 Pop', term: 'pop' },
  { label: '✨ K-Pop', term: 'kpop' },
  { label: '⚡ Electrónica', term: 'electronic' },
  { label: '🎷 Jazz', term: 'jazz' },
  { label: '🎤 Reggaetón', term: 'reggaeton' },
]

export function formatDuration(millis) {
  if (!millis) return '3:00'
  const totalSeconds = Math.floor(millis / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
