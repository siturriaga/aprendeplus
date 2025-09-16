import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Programs from './components/Programs'
import Testimonials from './components/Testimonials'
import EnglishTest from './components/EnglishTest'
import Footer from './components/Footer'
import Modal from './components/Modal'
import Contact from './components/Contact'
import A11yPanel from './components/A11yPanel'
import { AccessibilityProvider } from './context/AccessibilityContext'

export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <AccessibilityProvider>
      <div className="bg-white text-gray-900">
        <Header onContactClick={() => setOpen(true)} />
        <main id="main">
          <Hero />
          <Features />
          <About />
          <Programs />
          <Testimonials />
          <EnglishTest />
        </main>
        <Footer />
        <A11yPanel />
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Contact Us">
          <Contact />
        </Modal>
      </div>
    </AccessibilityProvider>
  )
}
