// import { useState } from 'react'

/**
 * FAB (Floating Action Button) / Speed Dial component based on DaisyUI.
 * Can be positioned in corners (e.g. fixed bottom-6 right-6).
 *
 * Props:
 * - variant: 'vertical' | 'flower' (flower fans out in a quarter-circle)
 * - mainIcon: JSX icon or character for the trigger
 * - mainClass: DaisyUI button classes (e.g. 'btn-primary', 'btn-secondary')
 * - actions: Array of { id, icon, label, onClick, colorClass }
 */
import { useState, useEffect } from 'react'

const THEMES = [
  {
    name: 'dark',
    label: 'Dark Mode',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
    btnClass: 'btn-neutral text-white',
  },
  {
    name: 'synthwave',
    label: 'Synthwave',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    btnClass: 'btn-secondary text-secondary-content',
  },
  {
    name: 'cyberpunk',
    label: 'Cyberpunk',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    btnClass: 'btn-warning text-black',
  },
  {
    name: 'retro',
    label: 'Retro',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
    btnClass: 'btn-accent text-accent-content',
  },
]

export default function SpeedDialFAB() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('music-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
    localStorage.setItem('music-theme', currentTheme)
  }, [currentTheme])

  const handleSelectTheme = (themeName) => {
    setCurrentTheme(themeName)
    if (document.activeElement) {
      document.activeElement.blur()
    }
  }

  return (
    <div className="fab fixed bottom-6 right-6 z-50">
      {/* Botón trigger principal accesible */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-lg btn-circle btn-primary shadow-2xl hover:scale-105 transition-transform"
        aria-label="Abrir temas"
        title="Temas visuales"
      >
        <svg
          aria-label="Palette / Theme"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.14 8.163a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
          />
        </svg>
      </div>

      {/* Botones de acción verticales que se despliegan hacia arriba */}
      {THEMES.map((theme) => {
        const isSelected = currentTheme === theme.name

        return (
          <div
            key={theme.name}
            className="tooltip tooltip-left"
            data-tip={theme.label}
          >
            <button
              type="button"
              onClick={() => handleSelectTheme(theme.name)}
              className={`btn btn-lg btn-circle shadow-xl transition-all ${theme.btnClass} ${
                isSelected ? 'ring-4 ring-offset-2 ring-primary scale-110' : 'hover:scale-105'
              }`}
              aria-label={theme.label}
            >
              {theme.icon}
            </button>
          </div>
        )
      })}
    </div>
  )
}

