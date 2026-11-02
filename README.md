<p align="center">
  <img src="./public/logo_upateco.png" alt="UPATECO Logo" />
</p>

# Trabajo Práctico: Presentación del Sitio Web - MusicApp

**Institución:** Universidad Provincial de Administración, Tecnología y Oficios (UPATECO)  
**Carrera:** Tecnicatura Universitaria en Desarrollo de Software  
**Materia:** PROGRAMACIÓN WEB II - 2026  
**Docente:** Lic. Carlos Pacheco  

---

Sitio web desarrollado con **React** y **Vite**; cumple con la totalidad de los objetivos prácticos y consignas solicitadas en la cursada.

---

## Capturas de la Aplicación

<div align="center">
  <img src="./public/captura/Pagina%20de%20inicio.png" width="48%" alt="Página de Inicio" />
  <img src="./public/captura/Pagina%20de%20inicio2.png" width="48%" alt="Página de Inicio - con otro tema (colores)" />
</div>

<div align="center" style="margin-top: 10px;">
  <img src="./public/captura/Pagina%20de%20Stack.png" width="48%" alt="Página de Stack" />
  <img src="./public/captura/Pagina%20de%20contacto.png" width="48%" alt="Página de Contacto" />
</div>

---

## Cumplimiento de las Consignas del Trabajo

* **1) A) Página Principal (API Pública):**
  * Consume **iTunes Search API**.
  * Extrae y muestra campos: nombre de la canción (`trackName`), nombre del artista (`artistName`), nombre del álbum (`collectionName`), duración calculada en minutos y segundos (`trackTimeMillis`), y muestra de audio funcional de 30 segundos (`previewUrl`).
  * Contiene obligatoriamente la imagen oficial de portada (`artworkUrl100` / `artworkUrl60`).

* **1) B) Segunda Página (Array de Objetos Local):**
  * Consume un array de objetos existente en forma local (`TECH_CREATORS`).
  * Renderiza cada tarjeta tecnológica con información detallada: nombre, categoría, año, creador, rol, biografía y etiquetas.
  * Incluye obligatoriamente imágenes en sus campos (`logo` de cada tecnología y `creatorAvatar` del autor).

* **1) C) Tercera Página (Formulario de Contacto & Mapa Embebido):**
  * Formulario de contacto funcional conectado al servicio **EmailJS**, permitiendo el envío de mensajes.
  * Dispone de un mapa de **Google Maps** embebido al lado del formulario.

* **2) y 3) Control de Versiones y Despliegue:**
  * Proyecto versionado en GitHub y publicado para acceso público en la web.

---

## Librerías de Estilos y Componentes Utilizadas

Para agilizar el desarrollo, tener un buen diseño y la experiencia se uso:

* **Estilos & UI:** **Tailwind CSS v4** + **DaisyUI v5** — Permite maquetar con clases utilitarias (`className`) junto a componentes modernos preconstruidos (cards, modales, botones, sliders y badges).
* **Navegación SPA:** **React Router v7** — Enrutamiento del lado del cliente (`/`, `/stack`, `/contact`, `/about`) sin recargas de página.
* **Servicio de Mensajería:** **@emailjs/browser** — Envío de correos electrónicos.
* **Fuente de Datos Externa:** **iTunes Search API** — Búsqueda de pistas y reproducción de audio.
* **Sistema de Temas:** Soporte para múltiples paletas de diseño de DaisyUI accesibles.

---

## Funcionalidades Principales

* **Buscador Musical con Reproductor en Vivo:**
  * Búsqueda por artista o canción con debouncing para no saturar la API.
  * Reproducción / pausa de muestras de audio de 30 segundos con control de volumen integrado.
  * Selección de canción destacada con visor de portada en alta definición.
* **Slider de Creadores y Stack:**
  * Carrusel con navegación táctil, botones anterior/siguiente.
  * Visualización de datos biográficos, aportes al desarrollo web y enlaces.
* **Formulario de Contacto con Mapa:**
  * Envío de mensajes directo a la casilla de correo vía EmailJS.
  * Mapa embebido interactivo para ubicación geográfica.

---

## Conceptos de la Cursada Aplicados

* **`useState` / `useEffect`:** Control de estados de carga, reproducción de pistas, manejo de errores y etc.
* **`useRef`:** Manejo de la instancia HTML5 Audio y desplazamiento en contenedores del slider.
* **Componentes Funcionales y Props:** Modularización de componentes reutilizables (`HeroTrackList`, `HeroSearchBar`, `HeroFeaturedTrack`, `StackCard`, `StackSlider`, etc.).
* **Manejo Asíncrono (`fetch`, `async/await`, `AbortController`):** Peticiones a API externa..
* **`map()` y Renderizado Condicional:** Generación de listas, manejo de estados vacíos y feedback visual según el estado de la aplicación.

---

## Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   # o con pnpm
   pnpm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   # o con pnpm
   pnpm dev
   ```

3. **Compilar para producción:**
   ```bash
   npm run build
   ```
