import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Hero from './pages/Hero/Hero'
import About from './pages/About/About'
import Skill from './pages/Skill/Skill'
import Experience from './pages/Experience/Experience'
import Project from './pages/Project/Project'
import Contact from './pages/Contact/Contact'
import Footer from './components/Footer/Footer'
import ContactPage from './pages/ContactPage/ContactPage'
import ContactDrawer from './components/ContactDrawer/ContactDrawer'
import { CursorProvider } from './context/CursorContext'
import { LanguageProvider } from './context/LanguageContext'
import './App.css'

const MainLayout = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero onOpenContact={() => setIsContactOpen(true)} />
        <About />
        <Experience />
        <Project />
        <Skill />
        <Contact />
      </main>
      <Footer />
      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <CursorProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<MainLayout />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CursorProvider>
    </LanguageProvider>
  )
}

export default App
