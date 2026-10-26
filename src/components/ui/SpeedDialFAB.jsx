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
  { name: 'dark', label: 'Dark', icon: '🌙', color: 'bg-neutral-800 text-white' },
  { name: 'synthwave', label: 'Synthwave', icon: '🌆', color: 'bg-fuchsia-900 text-pink-300' },
  { name: 'cyberpunk', label: 'Cyberpunk', icon: '⚡', color: 'bg-yellow-400 text-black' },
  { name: 'retro', label: 'Retro', icon: '📻', color: 'bg-amber-200 text-amber-900' },
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
    // Cierra el focus para que los botones vuelvan a guardarse
    if (document.activeElement) {
      document.activeElement.blur()
    }
  }

  return (
    <div className="fab fab-flower fixed bottom-6 right-6 z-50">
      {/* Botón principal accesible con tabIndex para compatibilidad total */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle btn-lg btn-primary shadow-2xl hover:scale-105 transition-transform"
        aria-label="Abrir selector de temas"
        title="Cambiar tema visual"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4 5 5 0 015-5 4 4 0 014 4 4 4 0 01-4 4zm0 0h10a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </div>

      {/* Botón que reemplaza al principal cuando el FAB se abre */}
      <button
        type="button"
        className="fab-main-action btn btn-circle btn-lg btn-secondary shadow-xl"
        title="Cerrar selector"
      >
        ✕
      </button>

      {/* Botones temáticos en abanico (flower) */}
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
              className={`btn btn-circle btn-lg shadow-xl font-bold transition-all text-base ${theme.color} ${
                isSelected ? 'ring-4 ring-primary scale-110' : 'hover:scale-110 opacity-90 hover:opacity-100'
              }`}
              aria-label={`Tema ${theme.label}`}
            >
              <span>{theme.icon}</span>
            </button>
          </div>
        )
      })}
    </div>
  )
}
