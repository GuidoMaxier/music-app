export default function HeroBackground({ highResCover }) {
  const bgImage = highResCover || `${import.meta.env.BASE_URL}Fondo-02.png`

  return (
    <>
      {/* 1. Capa difuminada para llenar toda la pantalla */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30 scale-110 pointer-events-none transition-all duration-700"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* 2. Imagen principal centrada con máscara radial perimetral */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[85vh] max-w-175 aspect-square bg-cover bg-center rounded-3xl opacity-40 transition-all duration-700"
          style={{
            backgroundImage: `url(${bgImage})`,
            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 75%)',
          }}
        />
      </div>

      {/* 3. Viñeta oscura suave para contraste de textos */}
      <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/30 to-neutral-950/60 pointer-events-none" />
    </>
  )
}
