import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/ui/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Stack from './pages/Stack'
import Contact from './pages/Contact'
import Footer from './components/ui/Footer'
import ThemeSpeedDial from './components/ui/ThemeSpeedDial'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen flex flex-col justify-between relative bg-neutral-950">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/stack" element={<Stack />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <ThemeSpeedDial />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
