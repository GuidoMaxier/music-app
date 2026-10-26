import HeroBackground from '../components/hero/HeroBackground'
import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'

export default function Contact() {
  const contactCover = `${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/Fondo-03.png`

  return (
    <div className="relative min-h-[calc(100vh-4rem)] text-white pt-24 pb-12 px-4 md:px-8 lg:px-16 overflow-hidden bg-neutral-950 flex flex-col justify-center items-center">
      {/* Reutilización del fondo ambiental con Fondo-03.png */}
      <HeroBackground highResCover={contactCover} />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
        {/* Formulario */}
        <ContactForm />

        {/* Información y Mapa */}
        <ContactInfo />
      </div>
    </div>
  )
}
