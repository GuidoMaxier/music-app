import ContactMap from './ContactMap'

export default function ContactInfo() {
  return (
    <div className="flex-1 flex flex-col justify-between space-y-6 text-center lg:text-left">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          ¿Hablamos de música?
        </h1>
        <p className="opacity-80 text-sm sm:text-base max-w-xl">
          Envíanos un mensaje directo a nuestra casilla de correo o visítanos en nuestros estudios. Estamos disponibles para escuchar tus sugerencias o responder tus dudas.
        </p>
      </div>

      {/* Tarjeta del Mapa embebido */}
      <ContactMap />
    </div>
  )
}
