
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import HeroBackground from '../components/hero/HeroBackground'

export default function Contact() {
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    // Obtener variables de entorno si están configuradas, o usar valores por defecto / placeholder
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_default'
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_default'
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_default'

    try {
      if (
        serviceId === 'service_default' ||
        publicKey === 'public_key_default'
      ) {
        // Simulación controlada si aún no cargó sus credenciales de EmailJS
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setStatus({
          type: 'success',
          message: '¡Mensaje enviado con éxito! (Modo demostración. Configura tus keys de EmailJS para envío real a tu correo).',
        })
        formRef.current?.reset()
      } else {
        await emailjs.sendForm(serviceId, templateId, formRef.current, {
          publicKey: publicKey,
        })
        setStatus({
          type: 'success',
          message: '¡Tu mensaje ha sido enviado correctamente! Nos pondremos en contacto pronto.',
        })
        formRef.current?.reset()
      }
    } catch (error) {
      console.error('Error enviando con EmailJS:', error)
      setStatus({
        type: 'error',
        message: 'Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo más tarde.',
      })
    } finally {
      setLoading(false)
    }
  }

  const contactCover = `${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/Fondo-03.png`

  return (
    <div className="hero relative min-h-[calc(100vh-6rem)] pt-15 lg:mt-10 pb-5 px-4 md:px-8 overflow-hidden">
      {/* Reutilización del fondo ambiental del Hero con Fondo-03.png */}
      <HeroBackground highResCover={contactCover} />

      <div className="hero-content flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl w-full items-stretch relative z-10">
        
        {/* Lado A: Tarjeta con Formulario (DaisyUI Card + Card-body + Fieldset) */}
        <div className="card bg-base-200/70 backdrop-blur-md border border-base-300 w-full lg:max-w-md shrink-0 shadow-2xl rounded-3xl">
          <div className="card-body p-6 sm:p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="w-full">
              <fieldset className="fieldset w-full space-y-3">
                <legend className="fieldset-legend text-xl font-extrabold tracking-tight">
                  Contáctanos
                </legend>

                {/* Alerta de resultado */}
                {status.message && (
                  <div
                    className={`alert text-xs py-2 px-3 rounded-xl ${
                      status.type === 'success' ? 'alert-success' : 'alert-error'
                    }`}
                  >
                    <span>{status.message}</span>
                  </div>
                )}

                {/* Nombre */}
                <fieldset className="fieldset py-0">
                  <legend className="fieldset-legend text-xs font-semibold uppercase opacity-75 mb-1">
                    Nombre
                  </legend>
                  <input
                    type="text"
                    name="user_name"
                    required
                    placeholder="Tu nombre completo"
                    className="input input-sm input-ghost w-full rounded-lg focus:input-primary bg-base-300/40"
                  />
                </fieldset>

                {/* Email */}
                <fieldset className="fieldset py-0">
                  <legend className="fieldset-legend text-xs font-semibold uppercase opacity-75 mb-1">
                    Correo electrónico
                  </legend>
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="correo@ejemplo.com"
                    className="input input-sm input-ghost w-full rounded-lg focus:input-primary bg-base-300/40"
                  />
                </fieldset>

                {/* Asunto */}
                <fieldset className="fieldset py-0">
                  <legend className="fieldset-legend text-xs font-semibold uppercase opacity-75 mb-1">
                    Asunto
                  </legend>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Motivo de tu mensaje"
                    className="input input-sm input-ghost w-full rounded-lg focus:input-primary bg-base-300/40"
                  />
                </fieldset>

                {/* Mensaje */}
                <fieldset className="fieldset py-0">
                  <legend className="fieldset-legend text-xs font-semibold uppercase opacity-75 mb-1">
                    Mensaje
                  </legend>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    placeholder="Escribe tu consulta o sugerencia..."
                    className="textarea textarea-sm textarea-ghost w-full rounded-lg focus:textarea-primary bg-base-300/40 resize-none"
                  ></textarea>
                </fieldset>

                {/* Botón de Envío */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-sm btn-primary w-full rounded-lg mt-2 font-bold shadow-md shadow-primary/25 hover:scale-[1.01] transition-transform"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </fieldset>
            </form>
          </div>
        </div>

        {/* Lado B: Encabezado descriptivo + Mapa Embebido */}
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
          <div className="card bg-base-200/70 backdrop-blur-md border border-base-300 rounded-3xl p-4 sm:p-5 shadow-2xl flex-1 flex flex-col justify-between min-h-72">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 text-xs opacity-80 gap-1">
              <span className="flex items-center gap-1.5 font-semibold text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Barrio Castañares, Grupo 234 Block G
              </span>
              <span className="font-mono">Salta Capital, Argentina</span>
            </div>

            {/* Iframe del mapa embebido centrado en Barrio Castañares, Salta */}
            <div className="w-full h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden border border-base-300 shadow-inner">
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
        </div>

      </div>
    </div>
  )
}
