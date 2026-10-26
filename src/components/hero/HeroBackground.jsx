export default function HeroBackground({ highResCover }) {
  if (!highResCover) return null

  return (
    <>
      {/* 1. Capa difuminada para llenar toda la pantalla */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30 scale-110 pointer-events-none transition-all duration-700"
        style={{ backgroundImage: `url(${highResCover})` }}
      />

      {/* 2. Imagen principal cuadrada centrada con máscara radial perimetral */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[85vh] max-w-175 aspect-square bg-cover bg-center rounded-3xl opacity-40 transition-all duration-700"
          style={{
            backgroundImage: `url(${highResCover})`,
            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 75%)',
          }}
        />
      </div>

      {/* 3. Luces ambientales suaves (orbs) para dar profundidad y volumen moderno */}
      <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      {/* 4. Trama sutil de cuadrícula / puntos futuristas para textura visual */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* 5. Doble viñeta (radial cinematográfica + lineal) para legibilidad perfecta */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.7)_80%)] pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-t from-base-300/90 via-base-100/40 to-base-300/80 pointer-events-none" />
    </>
  )
}
