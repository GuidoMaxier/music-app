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
    label: 'Dark',
    letter: (
      <svg xmlns="http://www.w3.org/2000/svg" className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
    btnClass: 'bg-neutral-900 text-white hover:bg-neutral-800',
  },
  {
    name: 'light',
    label: 'Light',
    letter: (
      <svg xmlns="http://www.w3.org/2000/svg" className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    btnClass: 'bg-white text-neutral-900 hover:bg-neutral-100',
  },
  {
    name: 'dracula',
    label: 'Dracula',
    letter: 'D',
    btnClass: 'bg-[#282a36] text-[#bd93f9] hover:bg-[#343746] font-extrabold',
  },
  {
    name: 'synthwave',
    label: 'Synthwave',
    letter: 'S',
    btnClass: 'bg-[#2d1b4e] text-[#f43f5e] hover:bg-[#3b2366] font-bold',
  },
  {
    name: 'cyberpunk',
    label: 'Cyberpunk',
    letter: 'C',
    btnClass: 'bg-[#ffee00] text-black hover:bg-[#ffe600] font-black',
  },
  {
    name: 'luxury',
    label: 'Luxury',
    letter: 'L',
    btnClass: 'bg-[#09090b] text-[#d4af37] border border-[#d4af37]/40 hover:bg-neutral-900 font-bold',
  },
  {
    name: 'coffee',
    label: 'Coffee',
    letter: 'K',
    btnClass: 'bg-[#20161f] text-[#db924b] hover:bg-[#2b1e2a] font-bold',
  },
  {
    name: 'aqua',
    label: 'Aqua',
    letter: 'A',
    btnClass: 'bg-[#005f73] text-[#94d2bd] hover:bg-[#0a9396] font-bold',
  },
  {
    name: 'retro',
    label: 'Retro',
    letter: 'R',
    btnClass: 'bg-[#ece3ca] text-[#7d5e3f] hover:bg-[#dfd5b8] font-bold',
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
    <div className="fab fixed bottom-5 right-5 z-50">
      {/* Botón trigger principal estilizado y compacto (btn-md en vez de btn-lg) */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-md btn-circle btn-primary shadow-xl hover:scale-105 transition-all backdrop-blur-md border border-white/20"
        aria-label="Abrir temas"
        title="Temas visuales"
      >
        <svg
          aria-label="Palette / Theme"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.14 8.163a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
          />
        </svg>
      </div>

      {/* Botones de acción verticales proporcionados y elegantes */}
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
              className={`btn btn-sm btn-circle shadow-lg transition-all border text-xs font-mono ${
                isSelected
                  ? 'border-primary shadow-primary/40 shadow-md scale-105 opacity-100 ring-2 ring-primary/60'
                  : 'border-white/10 opacity-80 hover:opacity-100 hover:scale-105'
              } ${theme.btnClass}`}
              aria-label={theme.label}
            >
              {theme.letter}
            </button>
          </div>
        )
      })}
    </div>
  )
}

