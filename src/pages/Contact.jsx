import HeroBackground from '../components/hero/HeroBackground'
import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'

export default function Contact() {
  const contactCover = `${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/Fondo-03.png`

  return (
    <div className="hero relative min-h-[calc(100vh-6rem)] pt-15 lg:mt-10 pb-5 px-4 md:px-8 overflow-hidden">
      {/* Reutilización del fondo ambiental con Fondo-03.png */}
      <HeroBackground highResCover={contactCover} />

      <div className="hero-content flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl w-full items-stretch relative z-10">
        {/* Formulario */}
        <ContactForm />

        {/* Información y Mapa */}
        <ContactInfo />
      </div>
    </div>
  )
}
