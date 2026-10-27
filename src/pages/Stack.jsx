import HeroBackground from '../components/hero/HeroBackground'
import StackSlider from '../components/stack/StackSlider'

export default function Stack() {
  const bgCover = `${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/Fondo-03.png`

  return (
    <div className="relative min-h-[calc(100vh-4rem)] text-white pt-24  px-4 md:px-8 lg:px-16 overflow-hidden bg-neutral-950 flex flex-col justify-center items-center">
      {/* Fondo cinematográfico */}
      <HeroBackground highResCover={bgCover} />

      <div className="relative z-10 max-w-5xl w-full mx-auto space-y-6 flex flex-col items-center">

        {/* Cabecera */}
        <header className="text-center space-y-2 max-w-2xl">


          <div className='flex w-full justify-center'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.05] drop-shadow-2xl lg:mt-4'>
              STACK TECNOLÓGICO
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-white/70">
            Descubre las tecnologías y los creadores que hacen posible nuestra <span className='font-bold text-primary drop-shadow-lg'>Music App</span>.
          </p>
        </header>

        {/* Componente Slider modular */}
        <StackSlider />

      </div>
    </div>
  )
}
