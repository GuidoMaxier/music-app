
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

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

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-24 pb-12 px-4 md:px-8 lg:px-16 flex flex-col justify-center max-w-7xl mx-auto w-full">
      {/* Encabezado de página */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Contáctanos
        </h1>
        <p className="text-sm md:text-base opacity-75">
          ¿Tienes sugerencias, preguntas o quieres colaborar con la plataforma? Escríbenos o visítanos.
        </p>
      </div>

      {/* Grid: Formulario al lado del Mapa */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna izquierda: Formulario de Contacto usando DaisyUI Fieldset */}
        <div className="lg:col-span-6 w-full">
          <form ref={formRef} onSubmit={handleSubmit} className="w-full">
            <fieldset className="fieldset bg-base-200/60 backdrop-blur-md border border-base-300 rounded-3xl p-6 md:p-8 shadow-xl space-y-3 w-full">
              <legend className="fieldset-legend text-lg font-bold px-3">
                Envíanos un mensaje
              </legend>

              {/* Mensaje de estado (éxito o error) */}
              {status.message && (
                <div
                  className={`alert text-xs md:text-sm py-2.5 px-3 rounded-xl ${
                    status.type === 'success' ? 'alert-success' : 'alert-error'
                  }`}
                >
                  <span>{status.message}</span>
                </div>
              )}

              {/* Campo Nombre */}
              <div className="space-y-1">
                <label className="label text-xs font-semibold uppercase tracking-wider opacity-75">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Tu nombre y apellido"
                  className="input input-bordered w-full rounded-xl focus:input-primary transition-all text-sm"
                />
              </div>

              {/* Campo Correo Electrónico */}
              <div className="space-y-1">
                <label className="label text-xs font-semibold uppercase tracking-wider opacity-75">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="ejemplo@correo.com"
                  className="input input-bordered w-full rounded-xl focus:input-primary transition-all text-sm"
                />
              </div>

              {/* Campo Asunto */}
              <div className="space-y-1">
                <label className="label text-xs font-semibold uppercase tracking-wider opacity-75">
                  Asunto
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Motivo de tu mensaje"
                  className="input input-bordered w-full rounded-xl focus:input-primary transition-all text-sm"
                />
              </div>

              {/* Campo Mensaje */}
              <div className="space-y-1">
                <label className="label text-xs font-semibold uppercase tracking-wider opacity-75">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Escribe tu mensaje aquí..."
                  className="textarea textarea-bordered w-full rounded-xl focus:textarea-primary transition-all text-sm resize-none"
                ></textarea>
              </div>

              {/* Botón de Enviar */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/30 mt-2 font-bold transition-transform hover:scale-[1.01]"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Enviar Mensaje
                  </>
                )}
              </button>
            </fieldset>
          </form>
        </div>

        {/* Columna derecha: Mapa Embebido */}
        <div className="lg:col-span-6 w-full space-y-4">
          <div className="card bg-base-200/60 backdrop-blur-md border border-base-300 rounded-3xl p-6 shadow-xl overflow-hidden">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Nuestra Ubicación
            </h2>
            <p className="text-xs opacity-75 mb-4">
              Estudios Music App • Buenos Aires, Argentina
            </p>

            {/* Contenedor del mapa interactivo embebido (Google Maps iframe) */}
            <div className="w-full h-84 sm:h-96 rounded-2xl overflow-hidden border border-base-300 shadow-inner">
              <iframe
                title="Mapa de Ubicación"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.44367098418!2d-58.531832049999995!3d-34.6156625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88488f63!2sObelisco!5e0!3m2!1ses!2sar!4v1710000000000!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
