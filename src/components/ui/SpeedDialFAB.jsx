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
export default function SpeedDialFAB({
  variant = 'flower',
  mainIcon,
  mainClass = 'btn-primary',
  actions = [],
}) {
  const isFlower = variant === 'flower'

  return (
    <div className={`fab ${isFlower ? 'fab-flower' : ''} fixed bottom-6 right-6 z-50`}>
      {/* Elemento focuseable accesible para todos los navegadores */}
      <div
        tabIndex={0}
        role="button"
        className={`btn btn-circle btn-lg shadow-xl ${mainClass} transition-transform hover:scale-105`}
        aria-label="Menú flotante de acciones"
      >
        {mainIcon || (
          <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        )}
      </div>

      {/* Botones de acción Speed Dial */}
      {actions.map((act) => (
        <div
          key={act.id || act.label}
          className={act.label ? 'tooltip tooltip-left' : ''}
          data-tip={act.label}
        >
          <button
            type="button"
            onClick={act.onClick}
            className={`btn btn-circle btn-lg shadow-lg ${act.colorClass || 'btn-neutral text-white'} transition-transform hover:scale-110`}
            aria-label={act.label}
          >
            {act.icon}
          </button>
        </div>
      ))}
    </div>
  )
}
