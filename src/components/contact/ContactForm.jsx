import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_default'
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_default'
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_default'

    try {
      if (serviceId === 'service_default' || publicKey === 'public_key_default') {
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
  )
}
