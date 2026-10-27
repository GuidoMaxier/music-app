import { DEVELOPER_PROFILE, ACADEMIC_INFO } from '../../data/aboutData'


export default function AboutDeveloper() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] text-white pt-24 pb-8 px-4 md:px-8 lg:px-16 overflow-hidden bg-neutral-950 flex flex-col justify-center">
     

      <div className='flex w-full justify-center'><h1 className='text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] drop-shadow-2xl my-8'>AUTOR</h1></div>
      <div className="relative max-w-7xl mx-auto w-full z-10 flex-1 flex flex-col justify-end pb-8">
        {/* Fila Inferior estilo Cole: Título grande a la izquierda, bloque de texto + botones a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

          {/* Lado izquierdo: Titular */}
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-primary font-bold uppercase tracking-wider">
              <span>{DEVELOPER_PROFILE.location}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] drop-shadow-2xl">
              Hernán Casasola
            </h1>
          </div>

          {/* Lado derecho: Párrafo de visión + Botones */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4 text-left">
            <p className="text-sm sm:text-base leading-relaxed text-white/80 font-normal drop-shadow">
              En <span className="text-primary font-semibold">UPATECO</span>, para el trabajo final de la materia <span className="text-primary font-semibold">{ACADEMIC_INFO.course}</span>, a cargo del profesor <span className="text-primary font-semibold">{ACADEMIC_INFO.professor}</span>, se realizó esta página web con <span className="text-primary font-semibold">React, Vite y Tailwindcss</span>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={DEVELOPER_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm sm:btn-md rounded-full px-6 bg-white text-black hover:bg-primary hover:text-primary-content border-none shadow-xl transition-all font-semibold gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Ver en GitHub
              </a>

              <a
                href={DEVELOPER_PROFILE.portfolioGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm sm:btn-md btn-ghost rounded-full px-5 text-white/80 hover:text-white hover:bg-white/10 border border-white/20 transition-all font-semibold"
              >
                Perfil del Autor
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
