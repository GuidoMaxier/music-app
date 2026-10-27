export default function StackCard({ tech }) {
  return (
    <div className="w-full shrink-0 h-full px-6 py-6 sm:px-12 sm:py-10 lg:pl-16 lg:pr-20 flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8">
      {/* Lado izquierdo: Logo de la tecnología */}
      <div className="w-full md:w-5/12 flex flex-col items-center justify-center shrink-0">
        <div className="relative size-36 sm:size-44 lg:size-48 rounded-3xl bg-neutral-950/80 border border-white/10 p-6 lg:p-7 flex items-center justify-center shadow-inner group transition-all duration-500 hover:scale-105 hover:border-primary/40">
          <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-xl group-hover:bg-primary/20 transition-all pointer-events-none" />
          <img
            src={tech.logo}
            alt={tech.name}
            className="relative z-10 max-w-full max-h-full object-contain drop-shadow-2xl"
          />
        </div>
        <span className="mt-2.5 text-xs font-mono text-white/50">
          Lanzamiento: <strong className="text-white">{tech.year}</strong>
        </span>
      </div>

      {/* Lado derecho: Información del creador y tecnología */}
      <div className="w-full md:w-7/12 max-w-xl space-y-3.5 text-left flex flex-col justify-center">
        {/* Badges superiores */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge badge-primary font-bold text-xs">
            {tech.name}
          </span>
          <span className="badge badge-outline border-white/20 text-white/70 text-xs font-mono">
            {tech.category}
          </span>
        </div>

        {/* Tarjeta del creador */}
        <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 shadow-sm">
          <img
            src={tech.creatorAvatar}
            alt={tech.creator}
            className="size-11 sm:size-12 rounded-full object-cover border border-white/20 shadow-md shrink-0"
          />
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase text-primary font-semibold tracking-wider">
              Creador{tech.name === 'GitHub' ? 'es' : ''}
            </p>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug truncate">
              {tech.creator}
            </h3>
            <p className="text-xs text-white/50 truncate">
              {tech.creatorRole}
            </p>
          </div>
        </div>

        {/* Breve descripción/historia */}
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-3">
          {tech.bio}
        </p>

        {/* Botón enlace al sitio oficial */}
        <div className="pt-1">
          <a
            href={tech.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm rounded-full bg-white text-black hover:bg-primary hover:text-primary-content border-none font-semibold gap-2 shadow-lg transition-transform active:scale-95"
          >
            Sitio Oficial de {tech.name}
            <svg xmlns="http://www.w3.org/2000/svg" className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
