export default function ContactMap() {
  return (
    <div className="card bg-base-200/70 backdrop-blur-md border border-base-300 rounded-3xl p-4 sm:p-5 shadow-2xl flex-1 flex flex-col justify-between min-h-72">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 text-xs opacity-80 gap-1">
        <span className="flex items-center gap-1.5 font-semibold text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Barrio Castañares, Grupo 234 Block G
        </span>
        <span className="font-mono lg:mr-5">Salta Capital, Argentina</span>
      </div>

      {/* Iframe del mapa embebido centrado en Barrio Castañares, Salta */}
      <div className="w-full h-56 sm:h-64 lg:h-full rounded-2xl overflow-hidden border border-base-300 shadow-inner">
        <iframe
          title="Ubicación Barrio Castañares Salta"
          src="https://maps.google.com/maps?q=Barrio+Casta%C3%B1ares,+Salta,+Argentina&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="contrast-125 opacity-90 hover:opacity-100 transition-all duration-500"
        ></iframe>
      </div>
    </div>
  )
}
